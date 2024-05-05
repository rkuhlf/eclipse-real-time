import { Component, RefObject, createRef } from 'preact';
import Chart from 'chart.js/auto';
import { ContextListener } from './contextListener';

interface GraphWindowProps {
    dataPath: string;
    labels: string;
    data: string[];
    startTime: number;
}

const elapsedTimeUpdateInterval = 0.05;

export default class GraphWindow extends Component<GraphWindowProps> {
    chartRef: RefObject<HTMLCanvasElement>;
    data: null | Record<string, number[]>;
    elapsedTime: number;
    chartObject: Chart | null;
    intervalId: null | number;

    constructor(props: GraphWindowProps) {
        super(props);
        this.chartRef = createRef();
        this.data = null;
        this.elapsedTime = 0;
        this.chartObject = null;
        this.intervalId = null;
    }

    setTime(newTime: number) {
        this.elapsedTime = this.props.startTime + newTime;
        const options = this.chartObject?.options as any;
        
        if (!options) return;
        
        options.test = this.elapsedTime;
        this.renderChart();
    }

    async componentDidMount() {
        console.log("Updating");
        const { dataPath } = this.props;
        /* @vite-ignore */
        this.data = (await import(dataPath)).default;
        if (this.data == null) return;

        this.renderChart();
    }

    componentDidUpdate() {
        this.chartObject?.destroy();
        this.chartObject = null;
        this.renderChart();
    }

    renderChart() {
        const chartRef = this.chartRef.current;
        if (!chartRef) return;

        const ctx = chartRef.getContext('2d');
        if (!ctx) return;

        if (!this.data) return;

        const verticalLinePlugin = {
            afterDatasetsDraw: (chart: Chart) => {
                const xValue = (chart.options as any).test;
                const scale = chart.scales.x;
                const context = chart.ctx;
                const chartArea = chart.chartArea;

                // Check if the x-value is within the range of the x-axis
                if (xValue < scale.min || xValue > scale.max) return;

                const linePosition = scale.getPixelForValue(xValue);

                // Draw line within the chart area
                context.save();
                context.beginPath();
                context.strokeStyle = 'red'; // Color of the line
                context.lineWidth = 2; // Width of the line
                context.moveTo(linePosition, chartArea.top);
                context.lineTo(linePosition, chartArea.bottom);
                context.stroke();
                context.restore();
            },
            id: "vertical-line",
        };

        const datasets = [];

        for (const dataset of this.props.data) {
            datasets.push({
                label: dataset,
                data: this.data[dataset],
                tension: 0.1,
                pointStyle: false
            });
        }      
        

        if (!this.chartObject) {
            this.chartObject = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data[this.props.labels],
                    datasets
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        }
                    },
                    maintainAspectRatio: false,
                    /* @ts-ignore */
                    test: this.elapsedTime
                },
                plugins: [verticalLinePlugin]
            });
        } else {
            this.chartObject.update()
        }
    }

    render() {
        return <>
            <canvas className="graph" ref={this.chartRef} />
            <ContextListener isPlayingUpdated={(newState) => {

                if (newState.isPlaying) {
                    if (!this.intervalId) {
                        this.intervalId = setInterval(() => {
                            this.setTime(newState.elapsedTime + (Date.now() - newState.startWatchtime) / 1000 * newState.playbackSpeed);
                        }, elapsedTimeUpdateInterval * 1000);
                    }
                } else {
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                        this.intervalId = null;
                    }
                };

            }} currentWatchtimeUpdated={newState => this.setTime(newState.elapsedTime)} />
        </>;
    }
}

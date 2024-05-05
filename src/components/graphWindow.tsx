import { Component, RefObject, createRef } from 'preact';
import Chart from 'chart.js/auto';

interface GraphWindowProps {
    dataPath: string;
    labels: string;
    data: string[];
}

export default class GraphWindow extends Component<GraphWindowProps> {
    chartRef: RefObject<HTMLCanvasElement>;
    data: null | Record<string, number[]>;

    constructor(props: GraphWindowProps) {
        super(props);
        this.chartRef = createRef();
        this.data = null;
    }

    async componentDidMount() {
        const { dataPath } = this.props;
        /* @vite-ignore */
        this.data = (await import(dataPath)).default;
        if (this.data == null) return;
        
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        const chartRef = this.chartRef.current;
        if (!chartRef) return;

        const ctx = chartRef.getContext('2d');
        if (!ctx) return;

        if (!this.data) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data[this.props.labels],
                datasets: [{
                    label: 'Line Chart',
                    data: this.data[this.props.data[0]],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                }]
            },
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

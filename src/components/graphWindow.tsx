import { Component, RefObject, createRef } from 'preact';
import Chart from 'chart.js/auto';

interface GraphWindowProps {
    xData: number[];
    yData: number[];
}

export default class GraphWindow extends Component<GraphWindowProps> {
    chartRef: RefObject<HTMLCanvasElement>;

    constructor(props: GraphWindowProps) {
        super(props);
        this.chartRef = createRef();
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        const { xData, yData } = this.props;
        const chartRef = this.chartRef.current;
        if (!chartRef) return;

        const ctx = chartRef.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: xData,
                datasets: [{
                    label: 'Line Chart',
                    data: yData,
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

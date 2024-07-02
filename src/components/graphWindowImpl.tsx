import { Component, RefObject, createRef } from 'preact';
import Chart from 'chart.js/auto';
import { ContextListener } from './contextListener';
import { PlaybackState, PlaybackContextType } from '../playbackContext';
import { CurrentHotfireContextType } from '../hotfireContext';


export type GraphWindowProps = {
  dataPath: string;
  labels: string;
  data: string[];
  startTime: number;
}

type GraphWindowImplProps = GraphWindowProps & { playbackContext: PlaybackContextType } & { currentHotfireContext: CurrentHotfireContextType };

const elapsedTimeUpdateInterval = 0.05;

export default class GraphWindowImpl extends Component<GraphWindowImplProps> {
  chartRef: RefObject<HTMLCanvasElement>;
  isDraggingRef: RefObject<boolean>;
  wasPlayingRef: RefObject<boolean>;
  data: null | Record<string, number[]>;
  elapsedTime: number;
  chartObject: Chart | null;
  intervalId: null | number;
  playbackContext: PlaybackContextType;
  currentHotfireContext: CurrentHotfireContextType;

  constructor(props: GraphWindowImplProps) {
    super(props);
    this.chartRef = createRef();
    this.wasPlayingRef = createRef();
    this.wasPlayingRef.current = false;
    this.isDraggingRef = createRef();
    this.isDraggingRef.current = false;
    this.data = null;
    this.elapsedTime = 0;
    this.chartObject = null;
    this.intervalId = null;

    this.currentHotfireContext = props.currentHotfireContext;
    this.playbackContext = props.playbackContext;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  setTime(newTime: number) {
    this.elapsedTime = this.props.startTime + newTime;
    const options = this.chartObject?.options as any;

    if (!options) return;

    console.log(this.elapsedTime);
    options.test = this.elapsedTime;
    this.renderChart();
  }

  async getData(dataPath: string): Promise<Record<string, number[]>> {
    const data = await fetch(dataPath).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    return data;
  }

  setPlaybackPosition(event: MouseEvent) {
    if (this.isDraggingRef.current && this.chartRef.current && this.chartObject && event.target) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const xPos = event.clientX - rect.left;

      // Translate the pixel position to a chart label
      const newValue = this.chartObject.scales.x.getValueForPixel(xPos) as number;

      this.playbackContext.setIsPlaying(false);
      this.setTime(newValue);
      this.playbackContext.setCurrentWatchtime(newValue);
    }
  }

  handleMouseDown(event: MouseEvent) {
    event.preventDefault();

    this.isDraggingRef.current = true;
    if (this.isDraggingRef.current && this.chartRef.current) {
      this.wasPlayingRef.current = this.playbackContext.playbackState.isPlaying
      this.playbackContext.setIsPlaying(false);
      this.setPlaybackPosition(event);
    }
  };

  handleMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this.isDraggingRef.current && this.chartRef.current) {
      this.setPlaybackPosition(event);
    }
  };

  handleMouseUp() {
      if (this.isDraggingRef.current && this.chartRef.current) {
        this.playbackContext.setIsPlaying(this.wasPlayingRef.current || false);
        this.isDraggingRef.current = false;
      }
  };

  async componentDidMount() {
    const { dataPath } = this.props;
    this.data = await this.getData(dataPath);
    if (this.data == null) return;

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  
    this.renderChart();
  }

  async componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
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

        console.log(xValue, linePosition);

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
          animation: false,
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.25)' // Adjust for dark mode
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.75)' // Adjust for dark mode
              },
              type: 'linear',
              position: 'bottom'
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.25)' // Adjust for dark mode
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.75)' // Adjust for dark mode
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust for dark mode
              bodyColor: 'white', // Adjust for dark mode
              borderColor: 'rgba(255, 255, 255, 0.5)' // Adjust for dark mode
            },
            legend: {
              labels: {
                color: 'rgba(255, 255, 255, 0.75)' // Adjust legend text color for dark mode
              },
            }
          },
          maintainAspectRatio: false
        },
        plugins: [verticalLinePlugin],
      });
    } else {
      this.chartObject.update()
    }
  }

  updateInterval(newState: PlaybackState) {
    if (newState.isPlaying) {
      // If we are playing, we need to start a new interval.
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      this.intervalId = setInterval(() => {
        this.setTime(newState.elapsedTime + (Date.now() - newState.startWatchtime) / 1000 * newState.playbackSpeed);
      }, elapsedTimeUpdateInterval * 1000);
    } else {
      // If we're not playing, we need to clear it.
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };
  }

  render() {
    return <>
      <canvas className="graph" ref={this.chartRef} onMouseDown={this.handleMouseDown} />
      <ContextListener isPlayingUpdated={(newState) => {
        this.updateInterval(newState);
      }} playbackSpeedUpdated={(newState) => {
        this.updateInterval(newState);
      }} currentWatchtimeUpdated={newState => {
        this.setTime(newState.elapsedTime);
        this.updateInterval(newState);
      }} />
    </>;
  }
}

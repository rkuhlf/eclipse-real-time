import { Component, RefObject, createRef } from "preact";

import "./videoWindow.css"
import { ContextListener } from "./contextListener";

interface VideoWindowProps {
    src: string;
    startTime: number;
}
  
// Used a component because GPT did it this way and it was more performant than when it converted it into a function.
export default class VideoWindow extends Component<VideoWindowProps> {
  videoRef: RefObject<HTMLVideoElement>;
  containerRef: RefObject<HTMLDivElement>;
  scale: number;
  isDragging: boolean;
  startX: number;
  startY: number;
  translateX: number;
  translateY: number;

  constructor(props: VideoWindowProps) {
    super(props);
    this.videoRef = createRef();
    this.containerRef = createRef();
    this.scale = 1;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.translateX = 0;
    this.translateY = 0;
  }

  setTime(newTime: number) {
    const video = this.videoRef.current;
    if (!video) return;
    
    video.currentTime = this.props.startTime + newTime;
  }

  componentDidMount() {
    const container = this.containerRef.current;
    if (!container) return;

    this.setTime(0);

    container.addEventListener('wheel', this.handleWheel);
    container.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    const container = this.containerRef.current;
    if (!container) return;

    container.removeEventListener('wheel', this.handleWheel);
    container.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const container = this.containerRef.current;
    if (!container) return;

    const deltaY = event.deltaY;
    if (deltaY > 0) {
      this.scale *= 1.1; // Zoom out
    } else {
      this.scale *= 0.9; // Zoom in
    }

    this.updateTransform();
  };

  handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
  };

  handleMouseUp = () => {
    this.isDragging = false;
  };

  handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    this.translateX = event.clientX - this.startX;
    this.translateY = event.clientY - this.startY;
    this.updateTransform();
  };

  updateTransform = () => {
    const video = this.videoRef.current;
    const container = this.containerRef.current;
    if (!video || !container) return;

    video.style.transform = `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`;
  };

  render() {
    return (
      <div className="video-container" ref={this.containerRef}>
        <video className="video" src={this.props.src} ref={this.videoRef} />
        <ContextListener isPlayingUpdated={(newState) => {
            if (newState.isPlaying) {
                this.videoRef.current?.play();
            } else {
                this.videoRef.current?.pause();
            }
        }} currentWatchtimeUpdated={(newState) => {
            this.setTime(newState.elapsedTime);
        }} playbackSpeedUpdated={(newState) => {
            const video = this.videoRef.current;
            if (!video) return;
                
            video.playbackRate = newState.playbackSpeed;
        }}
        />
      </div>
    );
  }
}  
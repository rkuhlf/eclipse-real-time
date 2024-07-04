import { Component, RefObject, createRef } from "preact";

import "./videoWindow.css"
import { ContextListener } from "./contextListener";
import { VideoLoader } from "./videoLoader";

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
  state: {
    isLoading: boolean;
  }

  constructor(props: VideoWindowProps) {
    super(props);
    this.videoRef = createRef();
    this.containerRef = createRef();
    this.state = {
      isLoading: true
    }
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
    
    this.videoRef.current?.addEventListener("loadstart", () => {
      this.setState({
        isLoading: true
      })
    });
    this.videoRef.current?.addEventListener("canplay", () => {
      this.setState({
        isLoading: false
      })
    });
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
    // Zoom centered at the mouse wheel.
    event.preventDefault();
    const container = this.containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const centerToMouseX = event.clientX - centerX;
    const centerToMouseY = event.clientY - centerY;

    this.translateX -= centerToMouseX / this.scale;
    this.translateY -= centerToMouseY / this.scale;


    const deltaY = event.deltaY;
    if (deltaY > 0) {
      this.scale *= 1.05; // Zoom out
    } else {
      this.scale *= 0.95; // Zoom in
    }

    this.scale = Math.min(this.scale, 40);
    this.scale = Math.max(this.scale, 0.1);

    this.translateX += centerToMouseX / this.scale;
    this.translateY += centerToMouseY / this.scale;

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

    const xDragged = (event.clientX - this.startX) - this.translateX;
    const yDragged = (event.clientY - this.startY) - this.translateY;
    this.translateX += xDragged / this.scale;
    this.translateY += yDragged / this.scale;
    
    this.updateTransform();

    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
  };


  updateTransform = () => {
    const minDisplayablePixels = 20;

    const containerWidth = this.containerRef.current?.getBoundingClientRect().width;
    const videoWidth = this.videoRef.current?.getBoundingClientRect().width;
    if (containerWidth && videoWidth) {
      const maximalDisplacementX = (containerWidth / this.scale) / 2 + (videoWidth / this.scale / 2) - minDisplayablePixels / this.scale;
      this.translateX = Math.max(-maximalDisplacementX, this.translateX);
      this.translateX = Math.min(maximalDisplacementX, this.translateX);
    }

    const containerHeight = this.containerRef.current?.getBoundingClientRect().height;
    const videoHeight = this.videoRef.current?.getBoundingClientRect().height;
    if (containerHeight && videoHeight) {
      const maximalDisplacementY = (containerHeight / this.scale) / 2 + (videoHeight / this.scale / 2) - minDisplayablePixels / this.scale;
      this.translateY = Math.max(-maximalDisplacementY, this.translateY);
      this.translateY = Math.min(maximalDisplacementY, this.translateY);
    }
    
    const video = this.videoRef.current;
    const container = this.containerRef.current;
    if (!video || !container) return;

    video.style.transform = `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`;
  };

  render() {
    console.log(this.state.isLoading);
    return (
      <div className="video-wrapper" ref={this.containerRef}>
        {
          this.state.isLoading ? <VideoLoader />
          : <></>
        }
        <video className={"video" + (this.state.isLoading ? " loading" : "")} src={this.props.src} ref={this.videoRef} />
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
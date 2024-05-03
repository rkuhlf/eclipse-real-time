interface VideoWindowProps {
    src: string;
  }
  
  const VideoWindow = ({ src }: VideoWindowProps) => (
    <div className="video-wrapper">
      <video controls className="video" src={src} />
    </div>
  );
  
  export default VideoWindow;
  
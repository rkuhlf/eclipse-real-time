import "./playbackControls.css";

import { useContext, useEffect } from 'preact/hooks';
import { playbackContext } from "../playbackContext";


const arrowOffset = 1;
const frameOffset = 0.03;

const PlaybackControls = () => {
    const { playbackState, setIsPlaying, offsetCurrentWatchtime } = useContext(playbackContext);

    const handlePlayAll = () => {
        setIsPlaying(true);
    };

    const handlePauseAll = () => {
        setIsPlaying(false);
    };

    // Handle the left and right arrow.
    useEffect(() => {
        // Function to handle key press
        const downHandler = (event: KeyboardEvent) => {
            console.log("Donw handler", event)
          if (event.key === "ArrowLeft") {
            offsetCurrentWatchtime(-arrowOffset);
          } else if (event.key === "ArrowRight") {
            offsetCurrentWatchtime(arrowOffset);
          }
        };
    
        document.addEventListener('keydown', downHandler);
    
        return () => {
          document.removeEventListener('keydown', downHandler);
        };
      }, []);
    

    return (
        <div>
            {!playbackState.isPlaying ? (
                <button onClick={handlePlayAll}>Play All</button>
            ) : (
                <button onClick={handlePauseAll}>Pause All</button>
            )}
            <button onClick={() => offsetCurrentWatchtime(-frameOffset)}>Prev Frame</button>
            <button onClick={() => offsetCurrentWatchtime(frameOffset)}>Next Frame</button>
        </div>
    );
};

export default PlaybackControls;

import { useContext, useEffect, useRef } from 'preact/hooks';
import './playbackBar.css';
import { PlaybackState, playbackContext } from '../playbackContext';

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}

const elapsedTimeUpdateInterval = 0.03;
const PlaybackBar = ({ min, max, step = 1 }: SliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const intervalId = useRef<number | null>(null);
    const wasPlaying = useRef<boolean>(false);

    const { playbackState, setCurrentWatchtime, setIsPlaying } = useContext(playbackContext);

    const setPlaybackPosition = (event: MouseEvent) => {
        if (isDraggingRef.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const fraction = offsetX / rect.width;

            const newValue = min + (max - min) * (fraction);
            const roundedValue = Math.round(newValue / step) * step;
            setIsPlaying(false);
            setSliderPosition(roundedValue);
            setCurrentWatchtime(roundedValue);
        }
    }

    useEffect(() => {
        setSliderPosition(playbackState.elapsedTime);
    });


    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            event.preventDefault();
            if (isDraggingRef.current && containerRef.current) {
                setPlaybackPosition(event);
            }
        };

        const handleMouseUp = () => {
            if (isDraggingRef.current && containerRef.current) {
                setIsPlaying(wasPlaying.current);
                isDraggingRef.current = false;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [min, max, step]);

    const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();

        isDraggingRef.current = true;
        event.preventDefault();
        if (isDraggingRef.current && containerRef.current) {
            setIsPlaying(false);
            wasPlaying.current = playbackState.isPlaying
            setPlaybackPosition(event);
        }
    };
    
    const getCurrentElapsedTime = () => {
        return playbackState.elapsedTime + (Date.now() - playbackState.startWatchtime) / 1000 * playbackState.playbackSpeed;
    }

    const updateInterval = (newState: PlaybackState) => {
        if (newState.isPlaying) {
            // If we are playing, we need to start a new interval.
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }

            const id = setInterval(() => {
                setSliderPosition(getCurrentElapsedTime());
            }, elapsedTimeUpdateInterval * 1000);

            intervalId.current = id;
        } else {
            // If we're not playing, we need to clear it.
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }

    useEffect(() => {
        // If we're dragging then we're the reason for this change, and we should just ignore it.
        if (!isDraggingRef.current) {
            setSliderPosition(playbackState.elapsedTime);
        }
    }, [playbackState.elapsedTime]);

    useEffect(() => {
        updateInterval(playbackState);
    }, [playbackState.startWatchtime, playbackState.isPlaying, playbackState.playbackSpeed]);

    useEffect(() => {
        if (!playbackState.isPlaying) return;
        if (!intervalId.current) return;
          
        clearInterval(intervalId.current);
        const id = setInterval(() => {
            setSliderPosition(getCurrentElapsedTime());
        }, elapsedTimeUpdateInterval * 1000);
        intervalId.current = id;
      }, [playbackState.playbackSpeed]);

    const setSliderPosition = (newValue: number) => {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.style.width = `${((newValue - min) / (max - min)) * 100}%`;
    }

    return (
        <div className="slider-hover" onMouseDown={handleMouseDown} ref={containerRef}>
            <div className="slider">
                <div
                    className="track"
                    ref={sliderRef}
                />
            </div>
        </div>
    );
};

export default PlaybackBar;

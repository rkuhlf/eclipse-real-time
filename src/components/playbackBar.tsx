import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import './playbackBar.css';
import { playbackContext } from '../playbackContext';

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

    const [intervalId, setIntervalId] = useState<number | null>(null);
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

    useEffect(() => {
        if (playbackState.isPlaying) {
            if (intervalId) return;

            const id = setInterval(() => {
                setSliderPosition(playbackState.elapsedTime + (Date.now() - playbackState.startWatchtime) / 1000 * playbackState.playbackSpeed);
            }, elapsedTimeUpdateInterval * 1000);
            setIntervalId(id);
        } else {
            if (!intervalId) return;
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [playbackState.isPlaying]);

    useEffect(() => {
        // If we're dragging then we're the reason for this change, and we should just ignore it.
        if (!isDraggingRef.current) {
            setSliderPosition(playbackState.elapsedTime);
        }
    }, [playbackState.elapsedTime]);

    useEffect(() => {
        if (!playbackState.isPlaying) return;
        if (!intervalId) return;
          
        clearInterval(intervalId);
        const id = setInterval(() => {
            setSliderPosition(playbackState.elapsedTime + (Date.now() - playbackState.startWatchtime) / 1000 * playbackState.playbackSpeed);
        }, elapsedTimeUpdateInterval * 1000);
        setIntervalId(id);
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

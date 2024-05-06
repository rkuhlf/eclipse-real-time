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

    const { playbackState, setCurrentWatchtime } = useContext(playbackContext);

    useEffect(() => {
        setSliderPosition(playbackState.elapsedTime);
    });


    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            event.preventDefault();
            if (isDraggingRef.current && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const fraction = offsetX / rect.width;
                console.log(event.clientX, rect.left, rect.width, fraction);
                const newValue = min + (max - min) * (fraction);
                const roundedValue = Math.round(newValue / step) * step;
                setSliderPosition(roundedValue);
                setCurrentWatchtime(roundedValue);
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [min, max, step]);

    const handleMouseDown = () => {
        isDraggingRef.current = true;
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

    const setSliderPosition = (newValue: number) => {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.style.width = `${((newValue - min) / (max - min)) * 100}%`;
    }

    // TODO: A hover element like youtube has.
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

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
    const [value, setValue] = useState(2);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const [intervalId, setIntervalId] = useState<number | null>(null);

    const { playbackState, setCurrentWatchtime } = useContext(playbackContext);


    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDraggingRef.current && sliderRef.current) {
                const rect = sliderRef.current.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const percentage = (offsetX / rect.width) * 100;
                const newValue = min + (max - min) * (percentage / 100);
                const roundedValue = Math.round(newValue / step) * step;
                setValue(roundedValue);
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
        setSliderPosition(playbackState.elapsedTime);
    }, [playbackState.elapsedTime]);

    const setSliderPosition = (newValue: number) => {
        console.log("Tryring to set slider position")
        // const slider = sliderRef.current;
        // if (!slider) return;

        // slider.value = newValue as any;
    }

    return (
        <div className="slider-hover">
            <div className="slider" ref={sliderRef}>
                <div
                    className="track"
                    style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                />
                <div
                    className="thumb"
                    style={{ left: `${((value - min) / (max - min)) * 100}%` }}
                    onMouseDown={handleMouseDown}
                />
            </div>
        </div>
    );
};

export default PlaybackBar;

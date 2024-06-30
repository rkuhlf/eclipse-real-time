import { useContext, useEffect, useRef } from 'preact/hooks';
import { PlaybackState, playbackContext } from "../playbackContext";
import { hotfireWindows } from "../data";
import { currentHotfireContext } from "../hotfireContext";

import "./playbackControls.css";
import Select from './select';
import PlaybackBar from './playbackBar';
import PrevFrameSvg from './icons/prevframe';
import PauseSvg from './icons/pause';
import PlaySvg from './icons/play';
import NextFrameSVG from './icons/nextframe';


const arrowOffset = 1;
const frameOffset = 0.03;

const elapsedTimeUpdateInterval = 0.06;

function formatTime(time: number): string {
    return time.toFixed(2);
}

const PlaybackControls = () => {
    const { playbackState, toggleIsPlaying, offsetCurrentWatchtime, updateState, setCurrentWatchtime } = useContext(playbackContext);
    const { currentHotfireId } = useContext(currentHotfireContext);
    const intervalId = useRef<number | null>(null);
    const timeRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        setTime(playbackState.elapsedTime);
        const downHandler = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                event.stopImmediatePropagation();
                offsetCurrentWatchtime(-arrowOffset);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                event.stopImmediatePropagation();
                offsetCurrentWatchtime(arrowOffset);
            } else if (event.key === " ") {
                // The behavior for this is in the upHandler, but we need to prevent default in the down handler as well.
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        const upHandler = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                event.stopImmediatePropagation();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                event.stopImmediatePropagation();
            } if (event.key === " ") {
                event.preventDefault();
                event.stopImmediatePropagation();
                toggleIsPlaying();
            }
        };

        document.addEventListener('keydown', downHandler);
        document.addEventListener('keyup', upHandler);

        return () => {
            document.removeEventListener('keydown', downHandler);
            document.removeEventListener('keyup', upHandler);
        };
    }, []);

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
                setTime(getCurrentElapsedTime());
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

    const handleSpeed = (value: string) => {
        // When we set the speed, we'll also make sure to update the current watch time globally. This prevents an issue where changing the speed while playing causes the wrong speed to be set when paused.
        if (playbackState.isPlaying) {
            setCurrentWatchtime(getCurrentElapsedTime());
        }
        updateState({ playbackSpeed: parseFloat(value) });
    }

    useEffect(() => {
        console.log(playbackState.isPlaying, playbackState.playbackSpeed, playbackState.startWatchtime)
        updateInterval(playbackState);
    }, [playbackState.isPlaying, playbackState.playbackSpeed, playbackState.startWatchtime]);

    useEffect(() => {
        setTime(playbackState.elapsedTime);
        updateInterval(playbackState);
    }, [playbackState.elapsedTime]);

    const setTime = (newValue: number) => {
        const timeSpan = timeRef.current;
        if (!timeSpan) return;

        timeSpan.textContent = formatTime(newValue);
    }

    return (
        <div class="playback-controls">
            <PlaybackBar min={0} max={hotfireWindows[currentHotfireId].duration} step={frameOffset} />
            <div className="buttons">
                <div>
                    <span ref={timeRef}></span> / {formatTime(hotfireWindows[currentHotfireId].duration)}
                </div>
                <div className="playback-buttons">
                    <button id="prev-frame" onClick={() => offsetCurrentWatchtime(-frameOffset)}><PrevFrameSvg /></button>
                    <button id="play-pause" onClick={toggleIsPlaying}>{playbackState.isPlaying ? <PauseSvg /> : <PlaySvg />}</button>
                    <button id="next-frame" onClick={() => offsetCurrentWatchtime(frameOffset)}><NextFrameSVG /></button>
                </div>
                <Select defaultValue='1' options={[
                    {
                        label: ".2x",
                        value: ".2"
                    }, {
                        label: ".5x",
                        value: ".5"
                    }, {
                        label: "1x",
                        value: "1"
                    }, {
                        label: "2x",
                        value: "2"
                    }
                ]} onChange={handleSpeed} />
            </div>
        </div>
    );
};

export default PlaybackControls;

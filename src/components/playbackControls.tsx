import "./playbackControls.css";

import { useContext, useEffect } from 'preact/hooks';
import { playbackContext } from "../playbackContext";
import { hotfireWindows } from "../data";
import { currentHotfireContext } from "../hotfireContext";


const arrowOffset = 1;
const frameOffset = 0.03;

function formatTime(time: number): string {
    return time.toFixed(2);
}

const PlaybackControls = () => {
    const { playbackState, setIsPlaying, offsetCurrentWatchtime, setCurrentWatchtime, updateState } = useContext(playbackContext);
    const { currentHotfireId } = useContext(currentHotfireContext);

    useEffect(() => {
        const downHandler = (event: KeyboardEvent) => {
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

    const handleSlider = (e: Event) => {
        const value = (e.target as HTMLInputElement)?.value as any | null;
        if (value !== null) {
            setCurrentWatchtime(value);
        }
    }

    const handleSpeed = (e: Event) => {
        const value = (e.target as HTMLInputElement)?.value as any | null;

        if (value !== null) {
            updateState({playbackSpeed: value});
        }
    }

    return (
        <div>
            <div class="video-controls">
                <button id="play-pause" onClick={() => setIsPlaying(!playbackState.isPlaying)}>{playbackState.isPlaying ? "Pause" : "Play"}</button>
                <div>
                    {formatTime(playbackState.elapsedTime)} / {formatTime(hotfireWindows[currentHotfireId].duration)}
                </div>
                <input type="range" id="seek-bar" min={0}
                    max={hotfireWindows[currentHotfireId].duration}
                    step={frameOffset}
                    value={playbackState.elapsedTime}
                    onInput={handleSlider}
                />
                <button id="prev-frame" onClick={() => offsetCurrentWatchtime(-frameOffset)}>&lt;</button>
                <button id="next-frame" onClick={() => offsetCurrentWatchtime(frameOffset)}>&gt;</button>
                <select id="speed" onChange={handleSpeed}>
                    <option value="0.25">0.25x</option>
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>1x</option>
                    <option value="2">2x</option>
                </select>
            </div>
        </div>
    );
};

export default PlaybackControls;

import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { playbackContext } from "../playbackContext";
import { hotfireWindows } from "../data";
import { currentHotfireContext } from "../hotfireContext";

import "./playbackControls.css";
import nextFrame from "../assets/nextframe.svg";
import prevFrame from "../assets/prevframe.svg";
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import { ReactSVG } from 'react-svg';


const arrowOffset = 1;
const frameOffset = 0.03;

const elapsedTimeUpdateInterval = 0.03;

function formatTime(time: number): string {
    return time.toFixed(2);
}

const PlaybackControls = () => {
    const { playbackState, toggleIsPlaying, offsetCurrentWatchtime, setCurrentWatchtime, updateState } = useContext(playbackContext);
    const { currentHotfireId } = useContext(currentHotfireContext);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const sliderRef = useRef<HTMLInputElement | null>(null);
    const timeRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const downHandler = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                offsetCurrentWatchtime(-arrowOffset);
            } else if (event.key === "ArrowRight") {
                offsetCurrentWatchtime(arrowOffset);
            }
        };

        const upHandler = (event: KeyboardEvent) => {
            if (event.key === " ") {
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

    const setSliderPosition = (newValue: number) => {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.value = newValue as any;
        const timeSpan = timeRef.current;
        if (!timeSpan) return;

        timeSpan.textContent = formatTime(newValue);
    }

    return (
        <div>
            <div class="playback-controls">
                <button id="play-pause" onClick={toggleIsPlaying}>{playbackState.isPlaying ? <ReactSVG src={pause} /> : <ReactSVG src={play}/>}</button>
                <div>
                    <span ref={timeRef}></span> / {formatTime(hotfireWindows[currentHotfireId].duration)}
                </div>
                <input type="range" id="seek-bar" min={0}
                    max={hotfireWindows[currentHotfireId].duration}
                    step={frameOffset}
                    ref={sliderRef}
                    onInput={handleSlider}
                />
                <button id="prev-frame" onClick={() => offsetCurrentWatchtime(-frameOffset)}><ReactSVG src={prevFrame} /></button>
                <button id="next-frame" onClick={() => offsetCurrentWatchtime(frameOffset)}><ReactSVG src={nextFrame} /></button>
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

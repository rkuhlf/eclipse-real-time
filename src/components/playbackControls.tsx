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
import Select from './select';
import PlaybackBar from './playbackBar';


const arrowOffset = 1;
const frameOffset = 0.03;

const elapsedTimeUpdateInterval = 0.06;

function formatTime(time: number): string {
    return time.toFixed(2);
}

const PlaybackControls = () => {
    const { playbackState, toggleIsPlaying, offsetCurrentWatchtime, updateState } = useContext(playbackContext);
    const { currentHotfireId } = useContext(currentHotfireContext);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const timeRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        setTime(playbackState.elapsedTime);
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

    const handleSpeed = (value: string) => {
        updateState({ playbackSpeed: parseFloat(value) });
    }

    useEffect(() => {
        if (playbackState.isPlaying) {
            if (intervalId) return;

            const id = setInterval(() => {
                setTime(playbackState.elapsedTime + (Date.now() - playbackState.startWatchtime) / 1000 * playbackState.playbackSpeed);
            }, elapsedTimeUpdateInterval * 1000);
            setIntervalId(id);
        } else {
            if (!intervalId) return;
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [playbackState.isPlaying]);

    useEffect(() => {
        setTime(playbackState.elapsedTime);
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
                    <button id="prev-frame" onClick={() => offsetCurrentWatchtime(-frameOffset)}><ReactSVG src={prevFrame} /></button>
                    <button id="play-pause" onClick={toggleIsPlaying}>{playbackState.isPlaying ? <ReactSVG src={pause} /> : <ReactSVG src={play} />}</button>
                    <button id="next-frame" onClick={() => offsetCurrentWatchtime(frameOffset)}><ReactSVG src={nextFrame} /></button>
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

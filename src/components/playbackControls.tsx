import "./playbackControls.css";

import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { currentHotfireContext } from "../hotfireContext";
import { playbackContext } from "../playbackContext";



const PlaybackControls = () => {
    const { isPlaying, setIsPlaying } = useContext(playbackContext);

    const handlePlayAll = () => {
        setIsPlaying(true);
    };

    const handlePauseAll = () => {
        setIsPlaying(false);
    };

    return (
        <div>
            {!isPlaying ? (
                <button onClick={handlePlayAll}>Play All</button>
            ) : (
                <button onClick={handlePauseAll}>Pause All</button>
            )}
        </div>
    );
};

export default PlaybackControls;

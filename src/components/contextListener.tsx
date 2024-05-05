import { useContext, useEffect } from "preact/hooks";
import { PlaybackState, playbackContext } from "../playbackContext";

interface ContextListenerProps {
    isPlayingUpdated?: (newState: PlaybackState) => void;
    currentWatchtimeUpdated?: (newState: PlaybackState) => void;
    playbackSpeedUpdated?: (newState: PlaybackState) => void;
}

export const ContextListener = ({ isPlayingUpdated, currentWatchtimeUpdated, playbackSpeedUpdated }: ContextListenerProps) => {
    const { playbackState } = useContext(playbackContext);

    if (isPlayingUpdated != null) {
        useEffect(() => {
            isPlayingUpdated(playbackState);
        }, [playbackState.isPlaying]);
    }

    if (currentWatchtimeUpdated != null) {
        useEffect(() => {
            currentWatchtimeUpdated(playbackState);
        }, [playbackState.elapsedTime]);
    }

    if (playbackSpeedUpdated != null) {
        useEffect(() => {
            playbackSpeedUpdated(playbackState);
        }, [playbackState.playbackSpeed]);
    }

    return <></>
}
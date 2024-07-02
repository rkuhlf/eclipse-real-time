import { createContext, ComponentChildren } from 'preact';
import { useCallback, useContext, useEffect, useRef, useState } from 'preact/hooks';
import { hotfireWindows } from './data';
import { currentHotfireContext } from './hotfireContext';

export interface PlaybackContextType {
    playbackState: PlaybackState;
    setCurrentWatchtime: (val: number) => void;
    offsetCurrentWatchtime: (val: number) => void;
    updateState: (newstate: Partial<PlaybackState>) => void;
    toggleIsPlaying: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
}

export type windowId = "window1" | "window2" | "window3" | "window4";


const defaultState = {
    elapsedTime: 0,
    isPlaying: false,
    startWatchtime: 0,
    playbackSpeed: 1,
};

export const playbackContext = createContext<PlaybackContextType>({
    playbackState: {...defaultState},
    setCurrentWatchtime: () => { },
    offsetCurrentWatchtime: () => { },
    updateState: () => { },
    toggleIsPlaying: () => { },
    setIsPlaying: () => { },
});

export type PlaybackState = {
    isPlaying: boolean;
    startWatchtime: number;
    elapsedTime: number;
    playbackSpeed: number;
}

export const PlaybackProvider = ({ children }: { children: ComponentChildren }) => {
    const [state, setState] = useState<PlaybackState>({...defaultState});
    const endOfPlaybackTimeoutId = useRef<number | null>(null);
    const atEndOfPlayback = useRef<boolean>(false);

    const { currentHotfireId } = useContext(currentHotfireContext);

    const getCurrentWatchTime = (state: PlaybackState) => {
        if (state.startWatchtime == 0 && state.elapsedTime == 0) {
            return 0;
        }

        return state.elapsedTime + (Date.now() - state.startWatchtime) / 1000 * state.playbackSpeed;
    }

    const computeRemainingTime = (newState: PlaybackState) => {
        console.log(currentHotfireId);
        return (hotfireWindows[currentHotfireId].duration - getCurrentWatchTime(newState)) / newState.playbackSpeed;
    }

    const updateEndOfPlaybackTimeout = (newState: PlaybackState) => {
        if (!newState.isPlaying) {
            // If we've paused, all we have to do is clear the time out.
            if (endOfPlaybackTimeoutId.current) { clearTimeout(endOfPlaybackTimeoutId.current); }
        } else {
            // If we are now playing, we need to start up the timeout.
            if (endOfPlaybackTimeoutId.current) { clearTimeout(endOfPlaybackTimeoutId.current); }
            endOfPlaybackTimeoutId.current = setTimeout(() => {
                atEndOfPlayback.current = true;
                setIsPlaying(false);
            }, computeRemainingTime(newState) * 1000);
        }
    }

    const updateState = (replacementState: Partial<PlaybackState>) => {
        setState(prevState => {
            const newState = { ...prevState, ...replacementState };
            updateEndOfPlaybackTimeout(newState);
            return newState;
        })
    }

    const toggleIsPlaying = useCallback(() => {
        setState(prevState => {
            let newState;
            if (prevState.isPlaying) {
                newState = { ...prevState, isPlaying: false, elapsedTime: getCurrentWatchTime(prevState) };
            } else {
                newState = { ...prevState, isPlaying: true, startWatchtime: Date.now() };
            }
            updateEndOfPlaybackTimeout(newState);
            return newState;
        });
    }, [state, setState]);

    const setIsPlaying = useCallback((isPlaying: boolean) => {
        setState(prevState => {            
            // If we are pausing it and it was previously playing.
            if (prevState.isPlaying && !isPlaying) {
                const newState = { ...prevState, isPlaying, elapsedTime: getCurrentWatchTime(prevState) };
                updateEndOfPlaybackTimeout(newState);
                return newState;
            } else {
                const newState = { ...prevState, isPlaying, startWatchtime: Date.now() };
                updateEndOfPlaybackTimeout(newState);
                return newState;
            }
        });
    }, [state, setState]);

    useEffect(() => {
        const newState = {...defaultState};
        updateEndOfPlaybackTimeout(newState);
        setState(newState);
    }, [currentHotfireId])

    const setCurrentWatchtime = useCallback((newTime: number) => {
        setState(prevState => {
            // Clamp the time to the times we want to allow.
            newTime = Math.max(0, newTime);
            newTime = Math.min(hotfireWindows[currentHotfireId].duration, newTime);

            const newState = {
                ...prevState,
                elapsedTime: newTime,
                startWatchtime: Date.now()
            };
            updateEndOfPlaybackTimeout(newState);
            return newState;
        });
    }, [state, setState]);

    const offsetCurrentWatchtime = useCallback((offset: number) => {
        setState(prevState => {
            let prevWatchtime = prevState.elapsedTime;

            const now = Date.now();
            if (prevState.isPlaying) {
                prevWatchtime = prevState.elapsedTime + (now - prevState.startWatchtime) / 1000 * prevState.playbackSpeed;
            }

            let newTime = prevWatchtime + offset;
            // Clamp the time to the times we want to allow.
            newTime = Math.max(0, newTime);
            newTime = Math.min(hotfireWindows[currentHotfireId].duration, newTime);

            const newState = {
                ...prevState,
                elapsedTime: newTime,
                startWatchtime: now
            };
            updateEndOfPlaybackTimeout(newState);
            return newState;
        });
    }, [state, setState]);

    return (
        <playbackContext.Provider value={{ playbackState: state, setIsPlaying, toggleIsPlaying, setCurrentWatchtime, offsetCurrentWatchtime, updateState }}>
            {children}
        </playbackContext.Provider>
    );
};

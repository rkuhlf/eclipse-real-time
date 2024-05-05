import { createContext, ComponentChildren } from 'preact';
import { useCallback, useContext, useEffect, useState } from 'preact/hooks';
import { hotfireWindows } from './data';
import { currentHotfireContext } from './hotfireContext';

interface PlaybackContextType {
    playbackState: PlaybackState;
    setCurrentWatchtime: (val: number) => void;
    offsetCurrentWatchtime: (val: number) => void;
    updateState: (newstate: Partial<PlaybackState>) => void;
    toggleIsPlaying: () => void;
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
});

export type PlaybackState = {
    isPlaying: boolean;
    startWatchtime: number;
    elapsedTime: number;
    playbackSpeed: number;
}

export const PlaybackProvider = ({ children }: { children: ComponentChildren }) => {
    const [state, setState] = useState<PlaybackState>({...defaultState});

    const { currentHotfireId } = useContext(currentHotfireContext);

    const updateState = (newState: Partial<PlaybackState>) => {
        setState(prevState => {
            return { ...prevState, ...newState };
        })
    }

    const toggleIsPlaying = useCallback(() => {
        setState(prevState => {
            if (prevState.isPlaying) {
                return { ...prevState, isPlaying: false, elapsedTime: prevState.elapsedTime + (Date.now() - prevState.startWatchtime) / 1000 * prevState.playbackSpeed }
            } else {
                return { ...prevState, isPlaying: true, startWatchtime: Date.now() }
            }
        });
    }, [state, setState]);

    useEffect(() => {
        setState({...defaultState})
    }, [currentHotfireId])

    const setCurrentWatchtime = useCallback((newTime: number) => {
        setState(prevState => {
            // Clamp the time to the times we want to allow.
            newTime = Math.max(0, newTime);
            newTime = Math.min(hotfireWindows[currentHotfireId].duration, newTime);

            return {
                ...prevState,
                elapsedTime: newTime,
                startWatchtime: Date.now()
            };
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

            return {
                ...prevState,
                elapsedTime: newTime,
                startWatchtime: now
            };
        });
    }, [state, setState]);

    return (
        <playbackContext.Provider value={{ playbackState: state, toggleIsPlaying, setCurrentWatchtime, offsetCurrentWatchtime, updateState }}>
            {children}
        </playbackContext.Provider>
    );
};

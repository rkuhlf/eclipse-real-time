import { createContext, ComponentChildren } from 'preact';
import { useCallback, useContext, useState } from 'preact/hooks';
import { hotfireWindows } from './data';
import { currentHotfireContext } from './hotfireContext';

interface PlaybackContextType {
    playbackState: PlaybackState;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentWatchtime: (val: number) => void;
    offsetCurrentWatchtime: (val: number) => void;
    updateState: (newstate: Partial<PlaybackState>) => void;
}

export type windowId = "window1" | "window2" | "window3" | "window4";


export const playbackContext = createContext<PlaybackContextType>({
    playbackState: {
        elapsedTime: 0,
        isPlaying: false,
        startWatchtime: 0,
        playbackSpeed: 1,
    },
    setIsPlaying: () => {},
    setCurrentWatchtime: () => {},
    offsetCurrentWatchtime: () => {},
    updateState: () => {},
});

type PlaybackState = {
    isPlaying: boolean;
    startWatchtime: number;
    elapsedTime: number;
    playbackSpeed: number;
}

export const PlaybackProvider = ({ children }: { children: ComponentChildren }) => {
    const [state, setState] = useState<PlaybackState>({
        isPlaying: false,
        startWatchtime: 0,
        elapsedTime: 0,
        playbackSpeed: 1
    });

    const {currentHotfireId} = useContext(currentHotfireContext);

    const updateState = (newState: Partial<PlaybackState>) => {
        setState(prevState => {
            return {...prevState, ...newState};
        })
    }

    const setIsPlaying = useCallback((isPlaying: boolean) => {
        setState(prevState => {
            if (prevState.isPlaying == isPlaying) return prevState;

            if (isPlaying) {
                return {...prevState, isPlaying: true, startWatchtime: Date.now()}
            } else {
                return {...prevState, isPlaying: false, elapsedTime: prevState.elapsedTime + (Date.now() - prevState.startWatchtime) / 1000 * prevState.playbackSpeed}
            }
        });
    }, [state, setState]);

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
                prevWatchtime = prevState.elapsedTime + (now - prevState.startWatchtime) / 1000  * prevState.playbackSpeed;
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
        <playbackContext.Provider value={{ playbackState: state, setIsPlaying, setCurrentWatchtime, offsetCurrentWatchtime, updateState }}>
            {children}
        </playbackContext.Provider>
    );
};

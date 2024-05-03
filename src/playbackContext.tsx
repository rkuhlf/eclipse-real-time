import { createContext, ComponentChildren } from 'preact';
import { useCallback, useContext, useState } from 'preact/hooks';
import { hotfireWindows } from './data';
import { currentHotfireContext } from './hotfireContext';

interface PlaybackContextType {
    playbackState: PlaybackState;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentWatchtime: (val: number) => void;
    offsetCurrentWatchtime: (val: number) => void;
}

export type windowId = "window1" | "window2" | "window3" | "window4";


export const playbackContext = createContext<PlaybackContextType>({
    playbackState: {
        elapsedTime: 0,
        isPlaying: false,
        startWatchtime: 0,
    },
    setIsPlaying: () => {},
    setCurrentWatchtime: () => {},
    offsetCurrentWatchtime: () => {},
});

type PlaybackState = {
    isPlaying: boolean;
    startWatchtime: number;
    elapsedTime: number;
}

export const PlaybackProvider = ({ children }: { children: ComponentChildren }) => {
    const [state, setState] = useState<PlaybackState>({
        isPlaying: false,
        startWatchtime: 0,
        elapsedTime: 0
    });

    const {currentHotfireId} = useContext(currentHotfireContext);

    const setIsPlaying = useCallback((isPlaying: boolean) => {
        setState(prevState => {
            if (prevState.isPlaying == isPlaying) return prevState;

            if (isPlaying) {
                return {...prevState, isPlaying: true, startWatchtime: Date.now()}
            } else {
                return {...prevState, isPlaying: false, elapsedTime: prevState.elapsedTime + (Date.now() - prevState.startWatchtime) / 1000}
            }
        });
    }, [state, setState]);

    const offsetCurrentWatchtime = useCallback((offset: number) => {
        setState(prevState => {
            let prevWatchtime = prevState.elapsedTime;
            
            const now = Date.now();
            if (prevState.isPlaying) {
                prevWatchtime = prevState.elapsedTime + (now - prevState.startWatchtime) / 1000;
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
        <playbackContext.Provider value={{ playbackState: state, setIsPlaying, setCurrentWatchtime: ()=>{}, offsetCurrentWatchtime }}>
            {children}
        </playbackContext.Provider>
    );
};

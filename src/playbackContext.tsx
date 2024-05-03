import { createContext, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

interface PlaybackContextType {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export type windowId = "window1" | "window2" | "window3" | "window4";


export const playbackContext = createContext<PlaybackContextType>({
    isPlaying: false,
    setIsPlaying: () => {}
});

export const PlaybackProvider = ({ children }: { children: ComponentChildren }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <playbackContext.Provider value={{ isPlaying, setIsPlaying }}>
            {children}
        </playbackContext.Provider>
    );
};

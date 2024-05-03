import { createContext, ComponentChildren } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { WindowInfo, hotfireId, hotfireWindows } from './data';

interface CurrentHotfireContextType {
    currentHotfireId: hotfireId;
    setCurrentHotfire: (hotfireId: hotfireId) => void;
    currentWindows: Partial<Record<windowId, WindowInfo>>;
    updateCurrentWindows: (update: Partial<Record<windowId, WindowInfo>>) => void;
}

export type windowId = "window1" | "window2" | "window3" | "window4";


export const currentHotfireContext = createContext<CurrentHotfireContextType>({
    currentHotfireId: "Hotfire 0",
    setCurrentHotfire: () => { },
    currentWindows: {},
    updateCurrentWindows: () => { },
});

export const CurrentHotfireProvider = ({ children }: { children: ComponentChildren }) => {
    const initialHotfire = 'Hotfire 0';
    const [currentHotfireId, setCurrentHotfireId] = useState<hotfireId>(initialHotfire);
    const [currentWindows, setCurrentWindows] = useState<Partial<Record<windowId, WindowInfo>>>({
        "window1": hotfireWindows[initialHotfire][0],
        "window2": hotfireWindows[initialHotfire][1],
        "window3": hotfireWindows[initialHotfire][2],
        "window4": hotfireWindows[initialHotfire][3],
    });

    // TODO: Make it so that we read in the previous state of all of the windows.
    const setCurrentHotfire = useCallback((newId: hotfireId) => {
        console.log("Updated current windows.")

        setCurrentHotfireId(newId);

        setCurrentWindows({
            "window1": hotfireWindows[newId][0],
            "window2": hotfireWindows[newId][1],
            "window3": hotfireWindows[newId][2],
            "window4": hotfireWindows[newId][3],
        });
    }, [setCurrentHotfireId, setCurrentWindows]);

    
    const updateCurrentWindows = useCallback((newState: Partial<Record<windowId, WindowInfo>>): void => {
        setCurrentWindows(prevState => ({
          ...prevState, ...newState
        }));
      }, [setCurrentWindows]);

    return (
        <currentHotfireContext.Provider value={{ currentHotfireId, setCurrentHotfire, currentWindows, updateCurrentWindows }}>
            {children}
        </currentHotfireContext.Provider>
    );
};

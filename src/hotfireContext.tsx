import { createContext, ComponentChildren } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { WindowInfo, hotfireId, hotfireWindows } from './data';

export interface CurrentHotfireContextType {
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
        "window1": hotfireWindows[initialHotfire].windows[0],
        "window2": hotfireWindows[initialHotfire].windows[1],
        "window3": hotfireWindows[initialHotfire].windows[2],
        "window4": hotfireWindows[initialHotfire].windows[3],
    });

    // TODO: Make it so that we read in the previous state of all of the windows.
    const setCurrentHotfire = useCallback((newId: hotfireId) => {
        setCurrentHotfireId(newId);

        setCurrentWindows({
            "window1": hotfireWindows[newId].windows[0],
            "window2": hotfireWindows[newId].windows[1],
            "window3": hotfireWindows[newId].windows[2],
            "window4": hotfireWindows[newId].windows[3],
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

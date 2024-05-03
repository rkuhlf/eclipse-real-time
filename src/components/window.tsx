
import { useCallback, useContext, useEffect, useState } from 'preact/hooks';
import { currentHotfireContext, windowId } from '../context';
import { hotfireWindows } from '../data';

type WindowProps = {
    windowId: windowId;
}

export const Window = ({ windowId }: WindowProps) => {
    const { currentWindows, currentHotfireId, updateCurrentWindows } = useContext(currentHotfireContext);

    if (currentHotfireId == null) {
        return <></>
    }


    const handleChange = useCallback((e: Event) => {
        const value = (e.target as HTMLSelectElement)?.value as any | null;
        if (value !== null) {
            // Update the current window to have the window that matches the name we clicked on.
            for (const entry of hotfireWindows[currentHotfireId]) {
                if (entry.name == value) {
                    updateCurrentWindows({
                        [windowId]: entry
                    });

                    break;
                }
            }            
        }
    }, [updateCurrentWindows]);
    
  
    return (
      <div className="window">
        <div className="dropdown">
          <select value={currentWindows[windowId]?.name} onChange={handleChange}>
            {Object.values(hotfireWindows[currentHotfireId]).map(option => (
              <option key={option.name} value={option.name}>{option.name}</option>
            ))}
          </select>
        </div>

        {currentWindows[windowId]?.content}
      </div>
    );
  };
    

import { useCallback, useContext, useState } from 'preact/hooks';
import { currentHotfireContext, windowId } from '../hotfireContext';
import { hotfireWindows } from '../data';
import Select from './select';
import DropdownSVG from './icons/dropdown';


type WindowProps = {
  windowId: windowId;
}

export const Window = ({ windowId }: WindowProps) => {
  const { currentWindows, currentHotfireId, updateCurrentWindows } = useContext(currentHotfireContext);
  const [isShowingDropdown, setIsShowingDropdown] = useState(false);

  if (currentHotfireId == null) {
    return <></>
  }


  const handleChange = useCallback((value: string) => {
    if (value !== null) {
      // Update the current window to have the window that matches the name we clicked on.
      for (const entry of hotfireWindows[currentHotfireId].windows) {
        if (entry.name == value) {
          updateCurrentWindows({
            [windowId]: entry
          });

          break;
        }
      }
    }
  }, [updateCurrentWindows, currentHotfireId]);

  return (
    <div className="window">
      <div className="dropdown" onMouseEnter={() => setIsShowingDropdown(true)} onMouseLeave={() => setIsShowingDropdown(false)}>
        {
          isShowingDropdown ? <Select defaultValue={currentWindows[windowId]?.name || ""} onChange={handleChange} options={Object.values(hotfireWindows[currentHotfireId].windows).map(option => ({
            label: option.name,
            value: option.name
          }
          ))} /> : <div className="dropdown-arrow hover-trigger">
            <DropdownSVG />
          </div>
        }
      </div>

      {currentWindows[windowId]?.content}
      <div className="nav-shadow"></div>
      <div className="shadow"></div>
    </div>
  );
};

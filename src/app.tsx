import { useCallback, useContext } from 'preact/hooks';
import './app.css'
import { Window } from './components/window';
import { currentHotfireContext } from './hotfireContext';
import { hotfireId, hotfireWindows } from './data';
import PlaybackControls from './components/playbackControls';
import { ReactSVG } from 'react-svg';

import dropdown from "./assets/dropdown.svg";
import Select from './components/select';

export const App = () => {
  const { currentHotfireId, setCurrentHotfire } = useContext(currentHotfireContext);

  const handleChange = useCallback((newValue: string) => {
    setCurrentHotfire(newValue);
  }, []);

  return (
    <>
      <div className="nav">
        <div className="select-title">
          <Select defaultValue={currentHotfireId} options={(Object.keys(hotfireWindows).map(key => ({ label: key, value: key})))} onChange={handleChange} />
        </div>
      </div>

      <div className="grid-container">
        <Window windowId='window1' />
        <Window windowId='window2' />
        <Window windowId='window3' />
        <Window windowId='window4' />
      </div>

      <PlaybackControls />
    </>
  );
};
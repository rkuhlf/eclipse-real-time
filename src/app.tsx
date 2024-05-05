import { useCallback, useContext } from 'preact/hooks';
import './app.css'
import { Window } from './components/window';
import { currentHotfireContext } from './hotfireContext';
import { hotfireId, hotfireWindows } from './data';
import PlaybackControls from './components/playbackControls';

export const App = () => {
  const { currentHotfireId, setCurrentHotfire } = useContext(currentHotfireContext);

  const handleChange = useCallback((e: Event) => {
    const value = (e.target as HTMLSelectElement)?.value as hotfireId | null;

    if (value !== null) {
      console.log(setCurrentHotfire);
      setCurrentHotfire(value);
    }
  }, []);

  return (
    <>
      <div className="nav">
        <select value={currentHotfireId} onChange={handleChange}>
          {Object.keys(hotfireWindows).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
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
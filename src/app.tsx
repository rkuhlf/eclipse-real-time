import { useCallback, useContext } from 'preact/hooks';
import './app.css'
import { Window } from './components/window';
import { currentHotfireContext } from './hotfireContext';
import { hotfireWindows } from './data';
import PlaybackControls from './components/playbackControls';
import Select from './components/select';

// Function to detect if the user is on a mobile device
const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const MobileApp = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5%", textAlign: 'center', alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh", padding: "10%" }}>
      <h1>This app only works on desktop</h1>
      <p>Please switch to a desktop device to access the app.</p>
    </div>
  )
}

export const DesktopApp = () => {
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


export const App = () => {
  return (isMobileDevice()) ?
    <MobileApp /> :
    <DesktopApp />
};
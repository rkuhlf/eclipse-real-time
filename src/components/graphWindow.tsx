import { useContext } from 'preact/hooks';
import GraphWindowImpl, { GraphWindowProps } from './graphWindowImpl';
import { playbackContext } from '../playbackContext';
import { currentHotfireContext } from '../hotfireContext';

const GraphWindow = (props: GraphWindowProps) => {
  const playbackContextInstance = useContext(playbackContext);
  const currentHotfireContextInstance = useContext(currentHotfireContext);

  return <GraphWindowImpl playbackContext={playbackContextInstance} currentHotfireContext={currentHotfireContextInstance} {...props}>

  </GraphWindowImpl>
}


export default GraphWindow;
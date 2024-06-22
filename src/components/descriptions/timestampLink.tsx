import { useContext } from "preact/hooks";
import { playbackContext } from "../../playbackContext";
import { ComponentChildren } from "preact";


export const TimeStampLink = ({ time, children }: { time: number, children: ComponentChildren }) => {
    const { setCurrentWatchtime, setIsPlaying } = useContext(playbackContext);

    return (


        <a onClick={() => {setCurrentWatchtime(time); setIsPlaying(false); }}>
            {children}
        </a>
    );
}
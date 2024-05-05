// There's a lot of information I need to hardcode here. This is everything that tells the website which windows should be available for which hotfires.

import { JSX } from "preact/jsx-runtime"
import { HotfireZeroDescription } from "./components/descriptions/hotfireZeroDescription"
import { HotfireTwoDescription } from "./components/descriptions/hotfireTwoDescription"
import { HotfireThreeDescription } from "./components/descriptions/hotfireThreeDescription"
import VideoWindow from "./components/videoWindow"

import hotfire0trailer from "./assets/hotfire0trailer.mp4";
import hotfire0ground from "./assets/hotfire0ground.mp4";
import hotfire2trailer from "./assets/hotfire2trailer.mp4";
import hotfire2ground from "./assets/hotfire2ground.mp4";
import hotfire3trailer from "./assets/hotfire3trailer.mp4";
import hotfire3ground from "./assets/hotfire3ground.mp4";
import GraphWindow from "./components/graphWindow"

export type WindowInfo = {
    name: string,
    content: JSX.Element
};

export type HotfireInfo = {
    duration: number,
    windows: WindowInfo[]
}


// The first four of each of these will be taken as the default windows.
export const hotfireWindows: Record<string, HotfireInfo> = {
    "Hotfire 0": {
        duration: 37,
        windows: [
            {
                name: "Ground Video",
                // Synced
                content: <VideoWindow key={Math.random()} src={hotfire0ground} startTime={0} />,
            },
            {
                name: "Trailer Video",
                // Synced
                content: <VideoWindow key={Math.random()} src={hotfire0trailer} startTime={0} />
            },
            {
                name: "Pressure",
                content: <GraphWindow key={Math.random()} dataPath={"../assets/parsedhotfire0.json"} labels="Time (s)" data={["Injector (psi)", "Feedline (psi)", "Chamber (psi)"]} startTime={-0.55} />
            },
            {
                name: "Description",
                content: <HotfireZeroDescription />
            },
        ]
    },
    "Hotfire 2": {
        duration: 40, windows: [
            {
                name: "Ground Video",
                // Synced.
                content: <VideoWindow key={Math.random()} src={hotfire2ground} startTime={3.65} />,
            },
            {
                name: "Trailer Video",
                content: <VideoWindow key={Math.random()} src={hotfire2trailer} startTime={0} />
            },
            {
                name: "Thrust",
                content: <GraphWindow key={Math.random()} dataPath={"../assets/parsedhotfire2.json"} labels="Time (s)" data={["Thrust (lbf)"]} startTime={0} />
            },
            {
                name: "Pressure",
                content: <GraphWindow key={Math.random()} dataPath={"../assets/parsedhotfire2.json"} labels="Time (s)" data={["Injector (psi)", "Feedline (psi)", "Chamber (psi)"]} startTime={0} />
            },
            {
                name: "Temperature",
                content: <GraphWindow key={Math.random()} dataPath={"../assets/parsedhotfire2.json"} labels="Time (s)" data={["Chamber (\u00b0C)"]} startTime={0} />
            },
            {
                name: "Description",
                content: <HotfireTwoDescription />
            },
        ]
    },
    "Hotfire 3": {
        duration: 29, windows: [
            {
                name: "Ground Video",
                // Synced.
                content: <VideoWindow key={Math.random()} src={hotfire3ground} startTime={2.41} />,
            },
            {
                name: "Trailer Video",
                // Synced.
                content: <VideoWindow key={Math.random()} src={hotfire3trailer} startTime={0} />
            },
            {
                name: "Thrust",
                content: <GraphWindow key={Math.random()} dataPath={"../assets/parsedhotfire3.json"} labels="Time (s)" data={["Thrust (lbf)"]} startTime={1.9} />
            },
            {
                name: "Pressure",
                content: <GraphWindow key={Math.random()} dataPath={"../assets/parsedhotfire3.json"} labels="Time (s)" data={["Injector (psi)", "Feedline (psi)", "Chamber (psi)"]} startTime={1.9} />
            },
            {
                name: "Description",
                content: <HotfireThreeDescription />
            },
        ]
    },
}

export type hotfireId = keyof typeof hotfireWindows;
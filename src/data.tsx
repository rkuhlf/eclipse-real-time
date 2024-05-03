// There's a lot of information I need to hardcode here. This is everything that tells the website which windows should be available for which hotfires.

import { JSX } from "preact/jsx-runtime"
import { HotfireZeroDescription } from "./components/descriptions/hotfireZeroDescription"
import { HotfireOneDescription } from "./components/descriptions/hotfireOneDescription"
import { HotfireTwoDescription } from "./components/descriptions/hotfireTwoDescription"
import { HotfireThreeDescription } from "./components/descriptions/hotfireThreeDescription"
import VideoWindow from "./components/videoWindow"
import hotfire3trailer from "./assets/hotfire3trailer.mp4";
import hotfire3ground from "./assets/hotfire3ground.mp4";

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
        duration: 29,
        windows: [
            {
                name: "Description",
                content: <HotfireZeroDescription />
            },
            {
                name: "Thrust",
                content: <>Thrust</>
            },
            {
                name: "Ground Video",
                // Synced.
                content: <VideoWindow src={hotfire3ground} startTime={2.43} />,
            },
            {
                name: "Trailer Video",
                // Synced.
                content: <VideoWindow src={hotfire3trailer} startTime={0} />
            },
        ]
    },
    "Hotfire 1": {
        duration: 15, windows: [
            {
                name: "Description",
                content: <HotfireOneDescription />
            }
        ]
    },
    "Hotfire 2": {
        duration: 15, windows: [
            {
                name: "Description",
                content: <HotfireTwoDescription />
            }
        ]
    },
    "Hotfire 3": {
        duration: 15, windows: [
            {
                name: "Description",
                content: <HotfireThreeDescription />
            }
        ]
    },
}

export type hotfireId = keyof typeof hotfireWindows;
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


// The first four of each of these will be taken as the default windows.
export const hotfireWindows = {
    "Hotfire 0": [
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
            content: <VideoWindow src={hotfire3ground} />,
        },
        {
            name: "Trailer Video",
            content: <VideoWindow src={hotfire3trailer} />
        },
    ],
    "Hotfire 1": [
        {
            name: "Description",
            content: <HotfireOneDescription />
        }
    ],
    "Hotfire 2": [
        {
            name: "Description",
            content: <HotfireTwoDescription />
        }
    ],
    "Hotfire 3": [
        {
            name: "Description",
            content: <HotfireThreeDescription />
        }
    ],
}

export type hotfireId = keyof typeof hotfireWindows;
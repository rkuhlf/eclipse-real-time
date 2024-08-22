// There's a lot of information I need to hardcode here. This is everything that tells the website which windows should be available for which hotfires.

import { JSX } from "preact/jsx-runtime"
import { HotfireZeroDescription } from "./components/descriptions/hotfireZeroDescription"
import { HotfireTwoDescription } from "./components/descriptions/hotfireTwoDescription"
import { HotfireThreeDescription } from "./components/descriptions/hotfireThreeDescription"
import VideoWindow from "./components/videoWindow"

import hotfire1trailer from "./assets/hotfire1trailer.mp4";
import hotfire1ground from "./assets/hotfire1ground.mp4";
import hotfire2trailer from "./assets/hotfire2trailer.mp4";
import hotfire2ground from "./assets/hotfire2ground.mp4";
import hotfire3trailer from "./assets/hotfire3trailer.mp4";
import hotfire3ground from "./assets/hotfire3ground.mp4";
import baymaxCam from "./assets/BaymaxCam.mp4";
import teamReactions from "./assets/TeamReactions.mp4";
import trailerCam from "./assets/TrailerCam.mp4";
import calgaryCam from "./assets/CalgaryRegularSpeed.mp4";
import GraphWindow from "./components/graphWindow"
import { FlightDescription } from "./components/descriptions/flightDescription"

export type WindowInfo = {
    name: string,
    content: JSX.Element
};

export type HotfireInfo = {
    duration: number,
    windows: WindowInfo[],
    defaultWindow1?: number;
    defaultWindow2?: number;
    defaultWindow3?: number;
    defaultWindow4?: number;
}


// The first four of each of these will be taken as the default windows.
export const hotfireWindows: Record<string, HotfireInfo> = {
    "Hotfire 1": {
        duration: 37,
        windows: [
            {
                name: "Ground Video",
                // Synced
                content: <VideoWindow key={Math.random()} src={hotfire1ground} startTime={0} scale={2} />,
            },
            {
                name: "Trailer Video",
                // Synced
                content: <VideoWindow key={Math.random()} src={hotfire1trailer} startTime={0} offsetY={-180} scale={0.75} />
            },
            {
                name: "Pressure",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedhotfire1.json"} labels="Time (s)" data={["Injector (psi)", "Feedline (psi)", "Chamber (psi)"]} startTime={-0.55} />
            },
            {
                name: "Description",
                content: <HotfireZeroDescription />
            },
        ]
    },
    "Hotfire 2": {
        defaultWindow4: 5,
        duration: 40, windows: [
            {
                name: "Ground Video",
                // Synced.
                content: <VideoWindow key={Math.random()} src={hotfire2ground} startTime={3.65} scale={0.7} />,
            },
            {
                name: "Trailer Video",
                content: <VideoWindow key={Math.random()} src={hotfire2trailer} startTime={0} scale={1.11776} offsetX={-22.9941} offsetY={-100.12} />
            },
            {
                name: "Thrust",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedhotfire2.json"} labels="Time (s)" data={["Thrust (lbf)"]} startTime={0} />
            },
            {
                name: "Pressure",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedhotfire2.json"} labels="Time (s)" data={["Injector (psi)", "Feedline (psi)", "Chamber (psi)"]} startTime={0} />
            },
            {
                name: "Temperature",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedhotfire2.json"} labels="Time (s)" data={["Chamber (\u00b0C)"]} startTime={0} />
            },
            {
                name: "Description",
                content: <HotfireTwoDescription />
            },
        ]
    },
    "Hotfire 3": {
        defaultWindow4: 4,
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
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedhotfire3.json"} labels="Time (s)" data={["Thrust (lbf)"]} startTime={1.9} />
            },
            {
                name: "Pressure",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedhotfire3.json"} labels="Time (s)" data={["Injector (psi)", "Feedline (psi)", "Chamber (psi)"]} startTime={1.9} />
            },
            {
                name: "Description",
                content: <HotfireThreeDescription />
            },
        ]
    },
    "Flight": {
        defaultWindow3: 4,
        defaultWindow4: 9,
        duration: 400, windows: [
            {
                name: "Calgary Cam",
                content: <VideoWindow key={Math.random()} src={calgaryCam} startTime={5.39} />
            },
            {
                name: "Baymax Cam",
                content: <VideoWindow key={Math.random()} src={baymaxCam} startTime={8.5} scale={0.5} />
            },
            {
                name: "Trailer Cam",
                content: <VideoWindow key={Math.random()} src={trailerCam} startTime={5.41} />,
            },
            {
                name: "Reactions Cam",
                content: <VideoWindow key={Math.random()} src={teamReactions} startTime={6} scale={0.5} />
            },
            {
                name: "Altitude MSL (ft)",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedflight.json"} labels="Time (s)" data={["Featherweight Altitude (ft)", "Telemega Altitude (ft)"]} startTime={-9.64} />
            },
            {
                name: "Speed (ft/s)",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedflight.json"} labels="Time (s)" data={["Telemega Speed (ft/s)", "Featherweight Speed (ft/s)"]} startTime={-9.64} />
            },
            {
                name: "Acceleration (ft/s^2)",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedflight.json"} labels="Time (s)" data={["Telemega Acceleration (ft/s^2)", "Featherweight Acceleration (ft/s^2)"]} startTime={-9.64} />
            },
            {
                name: "Temperature (F)",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedflight.json"} labels="Time (s)" data={["Telemega Temperature (F)"]} startTime={-9.64} />
            },
            {
                name: "Mach",
                content: <GraphWindow key={Math.random()} dataPath={"/assets/parsedflight.json"} labels="Time (s)" data={["Telemega Mach"]} startTime={-9.64} />
            },
            {
                name: "Description",
                content: <FlightDescription />
            },
        ]
    },
}

export type hotfireId = keyof typeof hotfireWindows;
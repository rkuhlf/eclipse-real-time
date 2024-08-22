Must have:

Should have:
- Start with default positions.
- Add the flight.
    - Add the sim.
    - Subtract out the predicted drag from the rocket, and subtract out the predicted thrust from the rocket to get some predicted forces.
- Finish the tables
- Add ability to specify defaults, that way I can list everything in a sensible order in the dropdown.
- Bug where if you go back in time after a video has paused from it being too far past the duration it won't start playing again. Only happens when you use the arrows while playing.

Nice to have:
- Preserve the state of the different hotfires.
- Add the luna hotfires.
    - Add different sections for different vehicles.
- Change the thrust for hotfire three to the one that's better. https://docs.google.com/spreadsheets/d/1YPNvGyRxLNO_Y38eYAh70m6hxMvxNFnK/edit#gid=1427090460
- Hotfire 0 has a pressure curve that goes negative. That should probably be adjusted in a separate graph.
- See if there is a properly zeroed thrust curve for hotfire 2.
- Do an analysis for combustion instability.
    - In particular during the second half of hotfire 2.
- It would be good to have photos for all of this stuff in the description.
- It would be fun to have a text description for each component (e.g. nozzle) as its own window.
- It would be nice to have a full-screen button for each of the windows.
- The playbackUpdate intervals should be refactored into an observer pattern - a bunch of components observing the update of a central interval.
- It would be good to have a graph of the prediction - could maybe be a checkbox for a line that you could enable or disable.
- Tutorial
- Mute button for the video feeds.

Feedback:
- Ella and Owen both would have benefited from a tutorial
- Ella wants a note about the flame diverter that went flying in hotfire 3
- Hotfire 0 the trailer view should start centered on the flame.
- Weird bug where the dropdown doesn't show up instantly (Safari) after switching hotfires.
- The red line for the graphsis really far offset from the cursor (especially noticeable on hotfire 3).
- Add a hotfire 1 with at least an explanation.
- Title hotfire dropdown is too big.
- Add 'k' as a shortcut to make it play.
Must have:
- For now it should say that it only works on desktop.

Should have:
- Add the flight.
- Finish the tables
- Cursor should change to pan while panning.
- There should maybe be a little bit more cursor: pointer. In particular scrolling on the playback bar and such.

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
- It would be fun to have a text description for each component as its own window.
- It would be nice to have a full-screen button for each of the windows.
- The playbackUpdate intervals should be refactored into an observer pattern - a bunch of components observing the update of a central interval.




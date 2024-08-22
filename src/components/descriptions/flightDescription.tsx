import { Description } from "./description";
import { TimeStampLink } from "./timestampLink";

export const FlightDescription = () => (
    <Description>
        <div>We launched Archimedes with Titan inside of it on Thursday June 20th, reaching an altitude of about 20,000 feet above ground level, fully recovering, and winning the 30k Hybrid SRAD  bracket of Spaceport 2024. We finished 17th overall, crushing it in the technical report category and doing consistently well in the others (you can find the spreadsheet of the results here: https://www.soundingrocket.org/2024-sa-cup.html).</div>

        {/* Finished 8th for technical report. 35th in Design and Build quality, 39th for our flight. 17th in bonuses */}

        <div>
            The Featherweight's data didn't come back properly, but we had a screen recording of the video, so an OCR script could automate converting it back into a table.
        </div>

        {/* <div>
            Total Impulse    | 30400 N-s | 6830 lbf-s |
            Burn Time        | 9 s       |
            Max Thrust       | 3800 N    | 860 lbf |
            Mean Pressure    | 26.2 bar  | 380 psi |
            Oxidizer Used    |
            Fuel Used        |
            O/F              |
            Specific Impulse |
            C*               |
            C* Efficiency    |
        </div> */}

        <div>
            The first smoke shows at <TimeStampLink time={8.24}>8.24 seconds into the data</TimeStampLink>, then we see flame from the ignition mechanism <TimeStampLink time={8.57}>0.33 seconds after</TimeStampLink>, and <TimeStampLink time={9.32}>0.75 seconds after that</TimeStampLink> the full burn begins. Compared to hotfire 3, in which there were 1.3 seconds between the first smoke and the full burn, the 1.1 seconds seen here serves to verify the startup transient improvement from hotfire 2.
        </div>

        <div>
            Based on the temperature data we received from the Telemega and the speed given, we hit Mach 1.08 <TimeStampLink time={16.67}>~7 seconds into the flight</TimeStampLink>. This is an imprecise measurement - the temperature data has potential to be off or slightly delayed, and the same for speed, and we did not hear a sonic boom on the ground. However, I think it's very likely that we <i>did</i> break the sound barrier in the upper atmosphere, but it was just barely not fast enough to break the sound barrier on the ground. Basically, I suspect that had we been 10,000 ft above the ground, the people on-site could have heard it, but because we were 6,000 ft below the rocket, the sonic boom dissipated before it could reach us.
        </div>

        <div>
            We hit burn time around here as well, near 7.5s into the flight. That was perfect: exactly what we were aiming for! During that burn, we reached our max speed of ~1200 ft/s and our max acceleration of ~300 ft/s^2 or ten g's.
        </div>

        <div>
            We hit apogee at <TimeStampLink time={37.47}>28 seconds</TimeStampLink>, reaching 26,279 ft above sea level or 24,652 ft above sea level depending on whether you believe the Featherweight or the Telemega (this corresponds to an apogee of 21,667 or 20,040 ft above ground level). The Featherweight computes the altitude using its GPS calculations, whereas the Telemega uses both an accelerometer and a barometer. In general, I'd stick to the barometric reading for altitude, particularly less than 30,000 ft, so I'd guess our true apogee was fairly close to 20,000 ft above ground level.
        </div>

        <div>
            While 20,000 ft isn't incredible in the context of a 30,000 ft competition, it's a very good start. Hybrid motors are somewhat unpredictable, and we were flying a rocket with unknown drag coefficients - it's expected that we would be a little bit off from our predictions.
        </div>

        <div>
            On top of that, we achieved a perfect recovery - deployment of the drogue at apogee, followed by deployment of the main at 1,000 ft (visual confirmation - it isn't all that clear from the data). This is a problem that Eclipse has had mixed results with in the best, so it's awesome that we were able to figure it out this year. This launch of Archimedes marks a significant success in the history of the club, and should inspire future generations of Eclipsians to innovate even further.
        </div>

        {/* There was also a featherweight blue raven on this flight (according to the docs) that would provide backup data for the Telemega. However it doesn't appear to be log file for it in the drive anywhere. */}
        {/* I forgot to download the Telemega lat/long data, so I just left it off here. */}

        {/* Ground level is 4,612 ft. */}
    </Description>
);
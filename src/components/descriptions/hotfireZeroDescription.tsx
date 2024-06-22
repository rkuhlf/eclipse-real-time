import { Description } from "./description";
import { TimeStampLink } from "./timestampLink";

export const HotfireZeroDescription = () => (
    <Description>
        <div>
            Hotfire zero was the first full test of Titan 2. We planned to use a flight-configuraton injector plate that would hopefully yield us sufficient oxidizer flow to generate 1200 lbf of thrust, but to only supply half the flight-configuration mass of oxidizer so that the burn time would be 3.5 seconds. Unfortunately, we encountered two main problems: half the desired flow rate, doubling the test's burn time, and an extremely slow startup transient. On top of that, there was an issue with the load cell, so there is no force data for this test.
        </div>

        <div>
            Total Impulse    | Unknown  | Unknown |
            Burn Time        | 10.5s                 |
            Max Thrust       | Unknown  | Unknown |
            Mean Pressure    | 19.3 bar | 280 psi |
            Oxidizer Used    |
            Fuel Used        |
            O/F              |
            Specific Impulse | Unknown | Unknown |
            C*               |
            C* Efficiency    |
        </div>

        <div>
            Started at 650 psi.
            The first smoke shows at <TimeStampLink time={1.41}>1.41 seconds into the data</TimeStampLink>, and <TimeStampLink time={2.46}>2 seconds after</TimeStampLink> we see the first signs of a full burn, although we are only reaching half of the peak thrust at this point. The engine doesn't fully get up to speed until <TimeStampLink time={4.08}>a second and a half later</TimeStampLink>. We suspect that part of this is due to the dip in supply pressure from the feed line, and part of it was due to the alternate injection that we used for this hotfire. The two and a half seconds it takes the engine to fully start is a little worse than hotfire 2, in which we saw two seconds, and significantly worse than hotfire three, which fully started in less than one and a half seconds.
        </div>
        
        <div>The nozzle actually remained intact for the full duration of this hotfire, unlike hotfires 2 and 3. We suspect that this is due to the relatively low pressures the nozzle experienced owing to the lower oxidizer flow rate.</div>

        <div>It's difficult to discern due to a drop in the sampling rate, but it looks like the gas-only phase begins about <TimeStampLink time={14.01}>11.5 seconds after the burn started</TimeStampLink>.</div>
    </Description>
    // C* = P * A / m
    // C* max is computed for each O/F ratio (assuming constant O/F ratio over the burn). This is because specific impulse already gives us a measure of the overall effectiveness. Burn time is the duration of the liquid-only burn.
);
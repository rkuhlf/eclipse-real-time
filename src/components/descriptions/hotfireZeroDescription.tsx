import { Description } from "./description";
import { TimeStampLink } from "./timestampLink";

export const HotfireZeroDescription = () => (
    <Description>
        <div>
            Hotfire zero was the first full test of Titan 2. We planned to use a flight-configuration injector plate that would hopefully yield us sufficient oxidizer flow to generate 1200 lbf of thrust, but to only supply half the flight-configuration mass of oxidizer so that the burn time would be 3.5 seconds. Unfortunately, we encountered two problems: 1{")"} we had half the desired flow rate, doubling the test's burn time, and 2{")"} we had an extremely slow startup transient. On top of that, there was an issue with the load cell, so there is no force data for this test.
        </div>

        {/* <div>
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
        </div> */}

        <div>
            The feedline pressure started a little low - 650 psi - so the pressures measured will naturally be a little lower. The first smoke shows at <TimeStampLink time={1.41}>1.41 seconds into the data</TimeStampLink>, and <TimeStampLink time={2.46}>2 seconds after</TimeStampLink> we see the first signs of a full burn, although we are only reaching half of the peak thrust at this point. The engine doesn't fully get up to speed until <TimeStampLink time={4.08}>a second and a half later</TimeStampLink>. We suspect that this was due to the injection system that we used for this hotfire, which was replaced in the next two hotfires. The two and a half seconds it takes the engine to fully start is a little worse than hotfire 2, in which we saw two seconds, and significantly worse than hotfire three, which fully started in less than one and a half seconds.
        </div>
        
        <div>The nozzle actually remained intact for the full duration of this hotfire, unlike hotfires 2 and 3. We suspect that this is due to the relatively low pressures the nozzle experienced owing to the lower oxidizer flow rate.</div>

        <div>At first it may appear that the data is de-synced, given that the injector pressure starts to drop much after the combustion chamber starts to drop. However, it's probably correct - the discrepancy is due to a drop in the sampling rate. Because of the lower fidelity it's difficult to discern, but it looks like the gas-only phase begins about <TimeStampLink time={14.01}>11.5 seconds after the burn started</TimeStampLink>.</div>

        It's also worth pointing out that the PT for the combustion chamber starts at a negative pressure. This is probably an issue with calibration, but it's unclear. Regardless, the absolute value measured by that PT (and likely the other PTs) is unreliable.
    </Description>
    // C* = P * A / m
    // C* max is computed for each O/F ratio (assuming constant O/F ratio over the burn). This is because specific impulse already gives us a measure of the overall effectiveness. Burn time is the duration of the liquid-only burn.
);
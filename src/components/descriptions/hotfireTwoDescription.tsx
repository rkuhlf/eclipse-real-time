import { Description } from "./description";
import { TimeStampLink } from "./timestampLink";

export const HotfireTwoDescription = () => (
    <Description>
        {/* Total Impulse    | 30700 Ns | 6900 lbf-s |
        Burn Time        | 10 s |
        Max Thrust       | 2670 N | 600 lbf |
        Mean Pressure    | 20.7 bar  |300 psi |
        Oxidizer Used    |
        Fuel Used        |
        O/F              |
        Specific Impulse |
        C*               |
        C* Efficiency    | */}
        Hotfire 2 was the first successful test conducted by the team in charge of the Spaceport 2024 mission. Following Hotfire 1, which failed to fully ignite, resulting in a cold dump of the nitrous, it was proof that Titan could work and would be ready for Spaceport. It seeked to fully ignite, double the injector flow rate of Hotfire 0, and to have an improved startup transient.

        <div>
            The feedline pressure started a little low - 650 psi - so the pressures measured will naturally be a little lower. The first smoke shows at <TimeStampLink time={3.34}>3.34 seconds into the data</TimeStampLink>, followed by a ton of dark smoke until  <TimeStampLink time={5.37}>2 seconds after</TimeStampLink> when the full burn begins. It still takes until <TimeStampLink time={5.85}>0.5 seconds later</TimeStampLink> for the burn to stabilize, with the tubes flung away slightly before that.
        </div>
        
        {/* <div>Notably, there was no temporary pressure drop in the injector PT in this hotfire, even though there was a clear drop in hotfires 0 and 3.</div> */}

        <div>
            At some point in this burn, the nozzle cracks, although it remains inside the rocket for the rest of the burn. It's not clear when it was cracked from the data, but it might be near <TimeStampLink time={11.16}>5.8 seconds into the burn</TimeStampLink>, when there is a marked increase in the variation of the force output.
            The gas-only phase begins <TimeStampLink time={15.81}>around 10.5 seconds in</TimeStampLink>.
        </div>

    </Description>

    // 7 lbs is a number I found randomly in the documentation. It might be wrong but it seems reasonable.
    // Nozzle split in half again
    // Better startup (Thrust to weight ratio only 4:1, but acceptable bc of velocity of the rail)
    // Glued Nylon tubes didn’t completely burn away in the injector plate (3/7 burned)
    // With load cell data from this test we are expected to reach 20,000ft 


);
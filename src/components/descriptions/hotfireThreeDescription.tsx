import { Description } from "./description";
import { TimeStampLink } from "./timestampLink";

export const HotfireThreeDescription = () => (
    <Description>
        <div>Hotfire 3 was the final hotfire before Spaceport. The main improvement to the engine was combining each trio of injector holes into a single larger hole, with the hope of preventing nylon tubing from blocking the flow and slowing the startup. As the data shows, it seems to have worked fairly well.</div>

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
            The feedline pressure started nicely near 750 psi, so this is the one test of the three that started with the possibility of attaining nominal pressures. Regardless, like hotfire 2, the combustion chamber in this test starts at 370 psi. However, the second hotfire drops off to 270 psi by the end, whereas hotfire 3 stays up at 330 psi.
        </div>

        <div>
            The first smoke shows at <TimeStampLink time={0.63}>0.63 seconds into the data</TimeStampLink>, then we see flame from the ignition mechanism <TimeStampLink time={1.86}>1.2 seconds after</TimeStampLink>, and <TimeStampLink time={1.92}>0.06 seconds after that</TimeStampLink> the full burn begins. Compared to hotfire 2, in which there were two seconds between the first smoke and the full burn, the 1.3 seconds shown here indicates that the goop method yielded a remarkable improvement. It still takes until <TimeStampLink time={2.25}>0.3 seconds later</TimeStampLink> for the burn to stabilize. It's only at this point that we see the fill tubes fly away from the nozzle.
        </div>
        
        <div>The full thrust is reached after <TimeStampLink time={3.21}>a full second</TimeStampLink> due to a temporary drop in the injector pressure. That drop was probably caused by a delay in the bubbles coming out of the tank (as described in all of those papers on my workflowy).</div>

         <div>
            <TimeStampLink time={6.99}>3.4 seconds into the burn</TimeStampLink>, the nozzle pops out (you can actually see it in the frame!). The gas-only phase begins <TimeStampLink time={11.22}>around 9 seconds</TimeStampLink>. <TimeStampLink time={14.46}>12.5 seconds in</TimeStampLink>, there's a really interesting qualitative change in the flow.
         </div>


        {/* Burn time is the amount of time from when the ignition finishes and the thrust has stabilized to when the gas-only phase begins. That is the most measurable amount of time. */}
    </Description>
);
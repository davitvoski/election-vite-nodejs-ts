import { memo } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { IPartyVisualizer } from "../../../../App";

function ValidBallots({ parties }: {
    parties: IPartyVisualizer[]
}) {
    return (
        <div className="flex flex-col">
            <h3 className="text-2xl text-center inline-flex ml-20">Elected Candidates</h3>
            <PieChart className={"nbCirconscriptionsEnAvance"} width={350} height={250}>
                <Pie
                    data={parties}
                    cx={170}
                    cy={120}
                    innerRadius={40}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="nbCirconscriptionsEnAvance"
                    isAnimationActive={true}
                    label
                >
                    {parties.map(party => (
                        <Cell key={party.nomPartiPolitique} fill={party.color} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
}

export default ValidBallots
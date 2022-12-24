import { PieChart, Pie, Cell, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { IPartyVisualizer } from "../../../App";

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-[#A18C04]">
                <p className="label">{`${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export default function ValidBallots({ parties }: {
    parties: IPartyVisualizer[]
}) {
    return (
        <div className="flex flex-col">
            <h3 className="text-2xl text-center inline-flex ml-36">Votes</h3>
            <PieChart width={350} height={250}>
                <Pie
                    data={parties}
                    cx={170}
                    cy={130}
                    innerRadius={40}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="nbVoteTotal"
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

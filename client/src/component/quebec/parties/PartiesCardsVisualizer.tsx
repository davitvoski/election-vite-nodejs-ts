import { useEffect, useState } from "react";
import { IPartyVisualizer } from "../../../App";
import { PartyColors } from "../map/MapTable";
import PartyCard from "./PartyCard";


// type MapChartProps = {
//     setContentToolTip: (content: string) => void
//     setTable: (geo: IGeometry) => void
// }

export default function PartiesCardsVisualizer({ politicalParties, setPoliticalParties }: {
    politicalParties: IPartyVisualizer[],
    setPoliticalParties: (parties: IPartyVisualizer[]) => void
}) {

    const partyURL = "/election/quebec/2022/parties/votes"

    useEffect(() => {
        const fetchParties = async () => {
            const response = await fetch(partyURL)
            const data = (await response.json()) as IPartyVisualizer[]
            let filteredParties = data.filter((party) => party.tauxVoteTotal > 10)
            filteredParties.map((party, index) => {
                party.color = PartyColors[party.abreviationPartiPolitique]
            })
            setPoliticalParties(filteredParties)
        }

        fetchParties().catch((err) => console.log(err))
    }, [])

    return (
        <section className='flex gap-10 justify-center m-6 text-center'>
            {politicalParties && politicalParties.map((party, index) => (
                <PartyCard key={party.nomPartiPolitique} party={party} />
            ))}
        </section>

    )
}

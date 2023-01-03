import { ChangeEvent, memo, useEffect, useState } from "react";
import { PartyColors } from "../../../../types/QuebecPartyTypes";
import { IPartyVisualizer } from "../QC";
import PartyCard from "./PartyCard";


function PartiesCardsVisualizer({ politicalParties, setPoliticalParties, year }: {
    politicalParties: IPartyVisualizer[],
    setPoliticalParties: (parties: IPartyVisualizer[]) => void,
    year: string
}) {

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchParties = async () => {
            const API = `/election/quebec/${year}/parties/votes`

            const response = await fetch(API, {
                signal: signal
            })
            const data = (await response.json()) as IPartyVisualizer[]
            let filteredParties = data.filter((party) => party.tauxVoteTotal > 10)
            filteredParties.map((party, index) => {
                party.color = PartyColors[party.abreviationPartiPolitique]
            })

            setPoliticalParties(filteredParties)
        }

        fetchParties().catch((err: Error) => {
            if (err.name !== 'AbortError') {
                console.log(err)
            }
        })

        return () => {
            controller.abort()
        }

    }, [year])

    return (
        <section className='flex gap-10 justify-center m-6 text-center'>
            {politicalParties && politicalParties.map((party, index) => (
                <PartyCard key={party.nomPartiPolitique} party={party} />
            ))}
        </section>
    )
}

export default PartiesCardsVisualizer
import { ChangeEvent, useEffect, useState } from "react";
import { IPartyVisualizer } from "../../../App";
import { PartyColors } from "../../../types/QuebecPartyTypes";
import PartyCard from "./PartyCard";


export default function PartiesCardsVisualizer({ politicalParties, setPoliticalParties, year }: {
    politicalParties: IPartyVisualizer[],
    setPoliticalParties: (parties: IPartyVisualizer[]) => void,
    year: string
}) {

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchParties = async () => {
            const API = `/election/quebec/${year}/parties/votes`
            console.log("API url: ", API)

            const response = await fetch(API, {
                signal: signal
            })
            console.log(response)
            const data = (await response.json()) as IPartyVisualizer[]
            let filteredParties = data.filter((party) => party.tauxVoteTotal > 10)
            filteredParties.map((party, index) => {
                party.color = PartyColors[party.abreviationPartiPolitique]
            })
            console.log(filteredParties);

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

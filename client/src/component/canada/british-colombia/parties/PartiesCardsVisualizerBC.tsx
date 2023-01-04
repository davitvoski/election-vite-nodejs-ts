import { useEffect } from "react";
import { IBCParty } from "../../../../types/Parties";
import PartyCard from "./PartyCardBC";


function PartiesCardsVisualizerBC({ politicalParties, setPoliticalParties, year }: {
    politicalParties: IBCParty[],
    setPoliticalParties: (parties: IBCParty[]) => void,
    year: string
}) {

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchParties = async () => {
            const API = `/election/british-columbia/2020/parties`

            const response = await fetch(API, {
                signal: signal
            })
            const data = (await response.json()) as IBCParty[]

            setPoliticalParties(data)
        }

        fetchParties().catch((err: Error) => {
            if (err.name !== 'AbortError') {
                alert("Please Try Again Later.")
            }
        })

        return () => {
            controller.abort()
        }

    }, [year])

    return (
        <section className='flex gap-10 justify-center m-6 text-center'>
            {politicalParties && politicalParties.map((party, index) => (
                <PartyCard key={party.abbv} party={party} />
            ))}
        </section>
    )
}

export default PartiesCardsVisualizerBC
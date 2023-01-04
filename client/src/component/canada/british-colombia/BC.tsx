import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { IBCParty } from "../../../types/Parties"
import MapVisualizerBC from "./map/MapVisualizerBC"
import PartiesCardsVisualizerBC from "./parties/PartiesCardsVisualizerBC"

export function BC() {
    const year = "2020"

    const [politicalParties, setPoliticalParties] = useState<IBCParty[]>();

    return (
        <>
            <main className='flex flex-col container'>
                <h2 className={`text-sm text-center mt-4 font-bold`}>Only 2020 available</h2>
                <h2 className={`text-4xl text-center mt-4`}>BRITISH-COLUMBIA 2020 Election Parties</h2>
                <PartiesCardsVisualizerBC politicalParties={politicalParties!}
                    setPoliticalParties={setPoliticalParties} year={year!} />

                <h2 className={`text-4xl mt-4 text-center`}>Election District Results</h2>
                <section className='flex flex-col items-center'>
                    <MapVisualizerBC year={year!} />
                </section>

            </main>
        </>
    )
}
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IParty } from "../../../types/QuebecTypes";
import CirconscriptionVisualizer from "./circonscription/CirconscriptionVisualizer";
import MapVisualizer from "./map/MapVisualizerQC";
import PartiesCardsVisualizer from "./parties/PartiesCardsVisualizer";
import ElectedCandidates from "./piecharts/ElectedCandidates";
import ValidBallots from "./piecharts/ValidBallots";
import ValidBallotsPercentage from "./piecharts/ValidBallotsPercentage";


export type IPartyVisualizer = IParty & {
    id: number,
    color: string
}

function QC() {
    const [politicalParties, setPoliticalParties] = useState<IPartyVisualizer[]>();
    let { year } = useParams()
    if (!year) year = "2022"

    return (
        <>
            <main className='flex flex-col container'>
                <h2 className={`text-4xl text-center mt-4`}>Election Parties</h2>
                <PartiesCardsVisualizer politicalParties={politicalParties!}
                    setPoliticalParties={setPoliticalParties} year={year!} />

                <section className='flex gap-10 justify-center'>
                    {politicalParties &&
                        <ValidBallots parties={politicalParties} />
                    }
                    {politicalParties &&
                        <ValidBallotsPercentage parties={politicalParties} />
                    }
                    {politicalParties &&
                        <ElectedCandidates parties={politicalParties} />
                    }

                </section>

                <h2 className={`text-4xl mt-4 text-center`}>Election District Results</h2>
                <section className='flex flex-col items-center'>
                    <MapVisualizer year={year!} />
                    <CirconscriptionVisualizer year={year!} />
                </section>

            </main>

        </>
    )
}

export default QC

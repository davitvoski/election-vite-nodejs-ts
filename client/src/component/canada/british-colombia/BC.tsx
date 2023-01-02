import { useParams } from "react-router-dom"
import MapVisualizerBC from "./map/MapVisualizerBC"

export function BC() {
    let { year } = useParams()
    year = "2020"

    return (
        <>
            <main className='flex flex-col container'>

                <h2 className={`text-4xl mt-4 text-center`}>Election District Results</h2>
                <section className='flex flex-col items-center'>
                    <MapVisualizerBC year={year!} />
                    {/* <CirconscriptionVisualizer year={year!} /> */}
                </section>
            </main>
        </>
    )
}
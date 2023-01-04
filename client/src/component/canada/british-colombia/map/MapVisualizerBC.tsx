import { useState } from "react"
import { Tooltip } from "react-tooltip"
import { Geometry } from "../../../../types/british-colombia/IMapBC"
import MapChartBC from "./MapChartBC"


export default function MapVisualizerBC({ year }: { year: string }) {
    const [content, setContent] = useState<string>("Hover over district")
    const [dataTable, setDataTable] = useState<Geometry>()

    return (
        <section className="mt-5 container flex flex-row w-full flex-grow text-center justify-center items-center">
            <div className="ml-20 mb-4 w-7/12 flex-block items-center justify-center">
                <div className='border-2 border-black text-center'>
                    <h1 className="ml-5 inline-block text-black text-3xl"> British-Columbias' Electoral Division Wins </h1>
                    <MapChartBC setContentToolTip={setContent} setTable={setDataTable} year={year} />
                    <Tooltip anchorId="regionName-tip">{content}</Tooltip>
                </div>
            </div>
        </section>
    )
}


import { useState } from "react"
import { Tooltip } from "react-tooltip"
import { IGeometry } from "../../../../types/QuebecTypes"
import MapChart from "./MapChartQC"
import MapTable from "./MapTableQC"


export default function MapVisualizer({ year }: { year: string }) {
    const [content, setContent] = useState<string>("Hover over district")
    const [dataTable, setDataTable] = useState<IGeometry>()

    return (
        <section className="mt-5 container flex flex-row w-full flex-grow text-center justify-center items-center h-1/2">
            <div className="ml-20 xl:w-8/12 ck flex-block items-center justify-center">
                <div className='border-2 border-black text-center'>
                    <h1 className="ml-5 inline-block text-black text-3xl"> Quebecs' Electoral Division Wins </h1>
                    <MapChart setContentToolTip={setContent} setTable={setDataTable} year={year} />
                    <Tooltip anchorId="regionName-tip">{content}</Tooltip>
                </div>
            </div>
            <div className="xl:w-10/12 flex flex-grow">
                {dataTable ? <MapTable year={year} geo={dataTable} /> :
                    <h1 className="w-full self-center text-center text-3xl">Click District To Load Table</h1>}
            </div>
        </section>
    )
}


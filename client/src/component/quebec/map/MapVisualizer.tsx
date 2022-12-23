import { useState } from "react"
import { Tooltip } from "react-tooltip"
import { IGeometry } from "../../../Types"
import MapChart from "./MapChart"
import MapTable from "./MapTable"


export default function MapVisualizer() {
    const [content, setContent] = useState<string>("Hover over district")
    const [dataTable, setDataTable] = useState<IGeometry>()
    
    return (
        <section className="mt-5 container flex flex-row w-full flex-grow text-center justify-center items-center h-1/2">
            <div className="m-6 xl:w-8/12 ck flex-block items-center justify-center">
                <div className='border-2 border-black text-center'>
                    {/* <div className='border-2 border-black text-center' style={{ backgroundColor: "#f5f4f6" }}> */}
                    <h1 className="ml-5 inline-block text-black text-3xl"> Quebecs' Electoral Division Wins </h1>
                    <MapChart setContentToolTip={setContent} setTable={setDataTable} />
                    <Tooltip anchorId="regionName-tip">{content}</Tooltip>
                </div>
            </div>
            <div className="xl:w-10/12 flex flex-grow">
                {dataTable ? <MapTable geo={dataTable} /> :
                    <h1 className="w-full self-center text-center text-3xl">Click District To Load Table</h1>}
            </div>
        </section>
    )
}
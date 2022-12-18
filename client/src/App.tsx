import { useState } from 'react'
import MapChart from './component/quebec/map/MapChart'
import { Tooltip } from "react-tooltip"
import { IGeometry } from './Types'

// import reactLogo from './assets/react.svg'
// import './App.css'

function App() {
  const [content , setContent] = useState<string>()
  const [dataTable, setDataTable] = useState<IGeometry>()

  return (
    <div>
      <section className="mt-5 container flex flex-row w-full flex-grow">
        <div id="dda" className="m-6 xl:w-1/2 ck flex-block items-center justify-center">
          <div className='border-2 border-black text-center' style={{ backgroundColor: "#f5f4f6" }}>
            <h1 className="ml-5 inline-block text-black text-3xl"> Quebecs' Electoral Division Wins </h1>
            {/* <MapChart setContentToolTip={setContent} setTable={setDataTable} /> */}
            <MapChart setContentToolTip={setContent} setTable={setDataTable} />
            <Tooltip>{content}</Tooltip>
          </div>
        </div>
        {/* <div className="xl:w-10/12 flex flex-grow">
          {dataTable ? <MapTable geo={dataTable} /> :
            <h1 className="w-full self-center text-center text-3xl">Click District To Load Table</h1>}
        </div> */}
      </section>

    </div>
  )
}

export default App

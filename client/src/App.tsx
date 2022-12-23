import { useEffect, useRef, useState } from 'react'
import MapChart from './component/quebec/map/MapChart'
import { Tooltip } from "react-tooltip"
import { IGeometry, IParty } from './Types'
import MapTable from './component/quebec/map/MapTable'
import PartyCard from './component/quebec/Party/PartyCard'
import { PartyColors } from './component/quebec/map/MapTable'
import AllPartiesCards from './component/quebec/Party/AllPartiesCards'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}

function App() {
  const [content, setContent] = useState<string>("Hover over district")
  const [dataTable, setDataTable] = useState<IGeometry>()
  let allCironscription = useRef()

  // useEffect(() => {
  //   const fetchParties = async () => {
  //     const response = await fetch(partyURL)
  //     const data = (await response.json()) as IPartyVisualizer[]
  //     let filteredParties = data.filter((party: IParty) => party.tauxVoteTotal > 10)
  //     filteredParties.map((party, index) => {
  //       party.color = PartyColors[party.abreviationPartiPolitique]
  //     })
  //     setPoliticalParties(filteredParties)
  //   }

  //   fetchParties().catch((err) => console.log(err))
  // }, [])

  return (
    <div>
      <main className='flex flex-col text-center container'>
        <h2 className={`text-4xl mt-4`}>Election Parties</h2>
        <AllPartiesCards />
        <h2 className={`text-4xl mt-4`}>Election District Results</h2>
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


      </main>

    </div>
  )
}

export default App

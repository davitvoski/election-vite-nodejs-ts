import { useEffect, useRef, useState } from 'react'
import MapChart from './component/quebec/map/MapChart'
import { Tooltip } from "react-tooltip"
import { IGeometry, IParty } from './Types'
import MapTable from './component/quebec/map/MapTable'
import Card from './component/quebec/Card/Card'
import PartyCard from './component/PartyCard/PartyCard'
import { PartyColors } from './component/quebec/map/MapTable'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}

function App() {
  const partyURL = "/election/quebec/2022/parties/votes"
  const [content, setContent] = useState<string>("Hover over district")
  const [dataTable, setDataTable] = useState<IGeometry>()
  const [politicalParties, setPoliticalParties] = useState<IPartyVisualizer[]>();
  let allCironscription = useRef()

  useEffect(() => {
    const fetchParties = async () => {
      const response = await fetch(partyURL)
      const data = (await response.json()) as IPartyVisualizer[]
      let filteredParties = data.filter((party: IParty) => party.tauxVoteTotal > 10)
      filteredParties.map((party, index) => {
        party.color = PartyColors[party.abreviationPartiPolitique]
      })
      setPoliticalParties(filteredParties)
    }

    fetchParties().catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <main className='flex flex-col text-center'>
        <h2 className={`text-4xl mt-4`}>Vote Ratio of Major Parties</h2>
        <section className='flex gap-10 justify-center m-6'>
          {politicalParties && politicalParties.map((party, index) => (
            <PartyCard key={party.nomPartiPolitique} party={party} />
          ))}
        </section>

        <h1 className="text-6xl"></h1>
        <section className="mt-5 container flex flex-row w-full flex-grow text-center">
          <div id="dda" className="m-6 xl:w-1/2 ck flex-block items-center justify-center">
            <div className='border-2 border-black text-center' style={{ backgroundColor: "#f5f4f6" }}>
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

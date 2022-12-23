import { useEffect, useRef, useState } from 'react'
import MapChart from './component/quebec/map/MapChart'
import { Tooltip } from "react-tooltip"
import { IGeometry, IParty } from './Types'
import MapTable from './component/quebec/map/MapTable'
import PartyCard from './component/quebec/Party/PartyCard'
import { PartyColors } from './component/quebec/map/MapTable'
import AllPartiesCards from './component/quebec/Party/PartiesCardsVisualizer'
import MapVisualizer from './component/quebec/map/MapVisualizer'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}

function App() {
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
        <MapVisualizer />



      </main>

    </div>
  )
}

export default App

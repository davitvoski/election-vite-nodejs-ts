import {  IParty } from './types/Types'
import PartiesCardsVisualizer from './component/quebec/parties/PartiesCardsVisualizer'
import MapVisualizer from './component/quebec/map/MapVisualizer'
import ValidBallots from './component/quebec/piecharts/ValidBallots'
import ValidBallotsPercentage from './component/quebec/piecharts/ValidBallotsPercentage'
import ElectedCandidates from './component/quebec/piecharts/ElectedCandidates'
import CirconscriptionVisualizer from './component/quebec/circonscription/CirconscriptionVisualizer'
import { useState } from 'react'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}

function App() {
  const [politicalParties, setPoliticalParties] = useState<IPartyVisualizer[]>();

  return (
    <div>
      <main className='flex flex-col container'>

        <h2 className={`text-4xl text-center mt-4`}>Election Parties</h2>
        <PartiesCardsVisualizer politicalParties={politicalParties!}
          setPoliticalParties={setPoliticalParties} />

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
          <MapVisualizer />
          <CirconscriptionVisualizer />
        </section>

      </main>

    </div>
  )
}

export default App

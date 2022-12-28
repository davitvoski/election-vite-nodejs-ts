import { IParty } from './types/Types'
import PartiesCardsVisualizer from './component/quebec/parties/PartiesCardsVisualizer'
import MapVisualizer from './component/quebec/map/MapVisualizer'
import ValidBallots from './component/quebec/piecharts/ValidBallots'
import ValidBallotsPercentage from './component/quebec/piecharts/ValidBallotsPercentage'
import ElectedCandidates from './component/quebec/piecharts/ElectedCandidates'
import CirconscriptionVisualizer from './component/quebec/circonscription/CirconscriptionVisualizer'
import { ChangeEvent, useState } from 'react'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}


function App() {
  const [politicalParties, setPoliticalParties] = useState<IPartyVisualizer[]>();
  const [year, setYear] = useState<string>("2022")

  return (
    <>
      <header className='flex flex-col justify-center'>
        <h1 className='text-4xl text-center'>Candian Elections</h1>
        <nav className='flex justify-center gap-10 '>

          <span>
            <label>Country:</label>
            <select name="countries">
              <option value="canada">Canada</option>
            </select>
          </span>

          <span>
            <label>State:</label>
            <select name="provinces">
              <option value="quebec">Quebec</option>
            </select>
          </span>

          <span>
            <label>Year:</label>
            <select name="election-year" onChange={(e) => { setYear((e.target as HTMLSelectElement).value); }} >
              <option value="2022">2022</option>
              <option value="2018">2018</option>
            </select>
          </span>

        </nav>
      </header>

      <main className='flex flex-col container'>

        <h2 className={`text-4xl text-center mt-4`}>Election Parties</h2>
        <PartiesCardsVisualizer politicalParties={politicalParties!}
          setPoliticalParties={setPoliticalParties} year={year} />

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
          <MapVisualizer year={year}/>
          <CirconscriptionVisualizer year={year} />
        </section>

      </main>

    </>
  )
}

export default App

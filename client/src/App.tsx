import { useEffect, useRef, useState } from 'react'
import { ICirconscription, IParty } from './Types'
import PartiesCardsVisualizer from './component/quebec/Party/PartiesCardsVisualizer'
import MapVisualizer from './component/quebec/map/MapVisualizer'
import ValidBallots from './component/quebec/DonutCharts/ValidBallots'
import ValidBallotsPercentage from './component/quebec/DonutCharts/ValidBallotsPercentage'
import ElectedCandidates from './component/quebec/DonutCharts/ElectedCandidates'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}

const cironscriptionPath = "/2022/allCirconscription"
function App() {
  const [politicalParties, setPoliticalParties] = useState<IPartyVisualizer[]>();
  let allCironscription = useRef<ICirconscription[]>()
  const [circonscription, setCirconscription] = useState<ICirconscription>();

  useEffect(() => {
    const fetchCirconscription = async () => {
      const response = await fetch(cironscriptionPath)
      const data = (await response.json()) as ICirconscription[]
      allCironscription.current = data
      setCirconscription(data[0])
    }

    fetchCirconscription().catch((err) => console.log(err))
  }, [])

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
        <MapVisualizer />



      </main>

    </div>
  )
}

export default App

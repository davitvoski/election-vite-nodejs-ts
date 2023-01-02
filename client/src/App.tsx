import { IParty } from './types/QuebecTypes'
import { SelectHTMLAttributes, SyntheticEvent } from 'react'
import { Link, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'


export type IPartyVisualizer = IParty & {
  id: number,
  color: string
}


function App() {
  const { year } = useParams()
  const navigate = useNavigate()


  function changeYearHandler(e: SyntheticEvent) {
    e.preventDefault()
    let year, state
    const target = e.target as HTMLSelectElement
    if (target.id === "state") {
      state = target.value
      year = (target!.parentElement!.nextElementSibling!!.children[1] as HTMLSelectElement).value
    }

    if (target.id === "election-year") {
      year = target.value
      state = (target!.parentElement!.previousElementSibling!.children[1] as HTMLSelectElement).value
    }

    navigate(`/${state}/${year}`, { replace: true })
  }

  return (
    <>
      <header className='flex flex-col justify-center'>
        <h1 className='text-4xl text-center'>Candian Elections</h1>
        <nav className='flex justify-center gap-10' onChange={changeYearHandler}>
          <span>
            <label>State:</label>
            <select id="state" name="state">
              <option value="quebec">
                Quebec
              </option>
              <option value="british-columbia">
                British-Columbia
              </option>
            </select>
          </span>

          <span>
            <label>Year:</label>
            <select id="election-year" name="election-year" value={year} >
              <option value="2022">2022</option>
              <option value="2018">2018</option>

            </select>
          </span>

        </nav>
      </header>

      {/* <Switch>
        <Route path="/quebec/:year" />
        <Route path="/british-columbia" />
      </Switch> */}
      <Outlet />

      {/* <main className='flex flex-col container'> */}
      {/* <h2 className={`text-4xl text-center mt-4`}>Election Parties</h2>
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
          <MapVisualizer year={year} />
          <CirconscriptionVisualizer year={year} />
        </section> */}

      {/* </main> */}

    </>
  )
}

export default App

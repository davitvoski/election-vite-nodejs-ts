import { IParty } from './types/QuebecTypes'
import { createContext, SelectHTMLAttributes, SyntheticEvent, useContext, useRef } from 'react'
import { Link, Outlet, Route, Routes, useNavigate, useOutletContext, useParams } from 'react-router-dom'


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
        <h1 className='text-4xl text-center'>Canadian Elections</h1>
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
            <select id="election-year" name="election-year" defaultValue={year}>
              <option value="2022">2022</option>
              <option value="2018">2018</option>

            </select>
          </span>

        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default App

/**
 *   
 * @link Inspired from https://tailwindcomponents.com/component/table-social
 */

import { useState } from "react"
import { useEffect } from "react"
import { Geometry } from "../../../../types/british-colombia/IMapBC"
import { PartyColors } from "../../../../types/QuebecPartyTypes"
import { ICirconscription, IGeometry } from "../../../../types/QuebecTypes"


type MapTableProps = {
    geo: Geometry
    year: string
}

export default function MapTableBC(props: MapTableProps) {
    const serverURL = `/election/british-columbia/2020/circonscription/`
    const [circonscription, setCirco] = useState<ICirconscription>()

    useEffect(() => {
        const numeroCO = props.geo.properties
        const fetchData = async () => {
            let circonscription = await (await fetch(`${serverURL}${numeroCO}`)).json()
            setCirco(circonscription)
        }

        fetchData()
    }, [props.geo])

    return (
        <>
            {circonscription && <section className="py-1 bg-blueGray-50 w-full">
                <div className="w-full xl:w-9/12 px-4 mx-auto mt-6 ">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                        <div className=" bg-slate-300 rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        Results in {circonscription.nomCirconscription}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 block w-full overflow-x-auto ">
                            <table className="items-center w-full border-collapse text-blueGray-700  ">
                                <thead className="thead-light ">
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Political Party
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Candidate
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Votes
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                            Share
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {circonscription.candidats.map((candidat, index) => {
                                        return <tr key={`${candidat.numeroCandidat}`} className={`${index === 0 ? "bg-green-200" : ""}`}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                {candidat.abreviationPartiPolitique}
                                            </th>
                                            <td className="border-t-0 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {candidat.nom + " " + candidat.prenom}
                                            </td>
                                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {candidat.nbVoteTotal}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300 w-full">
                                                            <div style={{ width: candidat.tauxVote + 10, backgroundColor: PartyColors[candidat.abreviationPartiPolitique] }}
                                                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black`}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    )
}
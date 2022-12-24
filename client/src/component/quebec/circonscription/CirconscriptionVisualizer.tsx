import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ICirconscription } from "../../../types/Types";
import { PartyColors } from "../map/MapTable";

export default function CirconscriptionVisualizer() {
    const cironscriptionPath = "/election/quebec/2022/allCirconscription"
    const allCirconscription = useRef<ICirconscription[]>()
    const [circonscription, setCirconscription] = useState<ICirconscription>();

    const handleCirconscriptionChange = (e: ChangeEvent) => {
        const circName = (e.target as HTMLSelectElement).value
        const circ = allCirconscription.current!.find(c => c.nomCirconscription === circName)
        console.log(circ);
        setCirconscription(circ)

    }

    useEffect(() => {
        const fetchCirconscription = async () => {
            const response = await fetch(cironscriptionPath)
            if (!response.ok) throw new Error("Failed to fetch data")
            const data = (await response.json()) as ICirconscription[]
            allCirconscription.current = data
            // Default Distrcit
            setCirconscription(data[110])
        }

        fetchCirconscription().catch(() => alert("We are having trouble connecting to the server. Please try again later."))
    }, [])

    return (
        <>
            {circonscription &&
                <div className="block w-11/12 overflow-x-auto self-center mt-10 mb-10">
                    <div className="border-2 p-1 inline-block mb-[0.2em]" style={{ borderColor: PartyColors[circonscription.candidats[0].abreviationPartiPolitique] }}>
                        <label className="text-lg">Choose A District</label>
                        <select className="text-center p-1 ml-2" onChange={handleCirconscriptionChange} value={circonscription.nomCirconscription}>
                            {allCirconscription.current!.map(cir => (
                                <option key={cir.nomCirconscription} value={cir.nomCirconscription}>
                                    {cir.nomCirconscription}
                                </option>
                            ))}
                        </select>
                    </div>
                    <table className={`items-center w-full border-collapse text-blueGray-700 border-2 border-black`}>
                        <thead style={{ backgroundColor: PartyColors[circonscription.candidats[0].abreviationPartiPolitique] }}>
                            <tr className="text-fuchsia-200 ">
                                <th className="px-6 bg-blueGray-50text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    Identifier</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    Name</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    Valid Votes</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    Exercised Votes</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    Rejected Votes</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    Number Of Electors</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    % Of Valid Votes</th>
                                <th className="px-6 bg-blueGray-50 text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                                    % Of Rejected Votes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-100 font-bold" style={{ color: PartyColors[circonscription.candidats[0].abreviationPartiPolitique] }} >
                            <tr>
                                <td className="border-t-0 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base text-center">{circonscription.numeroCirconscription} </h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base">{circonscription.nomCirconscription}</h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base"> {circonscription.nbVoteValide}</h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base"> {circonscription.nbVoteExerce}</h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base">{circonscription.nbVoteRejete}</h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base">{circonscription.nbElecteurInscrit}</h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base">{circonscription.tauxVoteValide}</h1>
                                </td>
                                <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <h1 className=" text-base">{circonscription.tauxVoteRejete}</h1>
                                </td>

                            </tr>
                        </tbody>
                    </table >
                </div >
            }
        </>
    )
}

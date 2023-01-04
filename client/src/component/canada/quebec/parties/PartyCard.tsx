import { IPartyVisualizer } from "../QC";


function PartyCard({ party }: { party: IPartyVisualizer }) {
    return (
        <div className={`border-2 p-4`} style={{ borderColor: party.color }}>
            <h3 className="text-2xl" style={{ color: party.color }}>{party.abreviationPartiPolitique} </h3>
            <p className="text-xl">Elected Members</p>
            <h1 className="text-8xl" style={{ color: party.color }}>{party.nbCirconscriptionsEnAvance} </h1>
            <p className="text-xl">Votes</p>
            <h4 className="text-2xl">{party.nbVoteTotal}</h4>
            <p className="text-xl">Percentage</p>
            <h6 className="text-2xl">{party.tauxVoteTotal.toPrecision(4)}%</h6>
        </div>
    )
}

export default PartyCard;
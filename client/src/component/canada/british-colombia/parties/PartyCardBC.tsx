import { IBCParty } from "../../../../types/Parties";


function PartyCard({ party }: { party: IBCParty }) {
    return (
        <div className={`border-2 p-4`} style={{ borderColor: party.color }}>
            <h3 className="text-2xl" style={{ color: party.color }}>{party.abbv} </h3>
            <p className="text-xl">Elected Members</p>
            <h1 className="text-8xl" style={{ color: party.color }}>{party.elected} </h1>
            <p className="text-xl">Votes</p>
            <h4 className="text-2xl">{party.totalVotes}</h4>
            <p className="text-xl">Percentage</p>
            <h6 className="text-2xl">{party.totalVotesPercentage.toPrecision(4)}%</h6>
        </div>
    )
}

export default PartyCard;
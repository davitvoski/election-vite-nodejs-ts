import DB from "../../db/db"
import * as fs from "fs/promises"
import { IBCParty } from "../../interfaces/json/british-colombia/Parties"


const PartyCollection = "British_Columbia_Party_2020"
const partyPathJSON = "../../data/canada/british-colombia/2020/Parties.json"


async function savePartiesToDB() {
    try {
        //Get json data
        let rawData = await fs.readFile(partyPathJSON)
        let partiesJson: IBCParty[] = JSON.parse(rawData.toString());
        console.log("Got parties json")

        const db = new DB()
        await db.dropAndCreateCollection(PartyCollection)
        await db.insertManyToCollection(PartyCollection, partiesJson)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

(async () => {
    await savePartiesToDB()
    console.log("Done.")
    process.exit(0)
})()
import DB from "../../db/db"
import * as fs from "fs/promises"
import { ICirconscription } from "../../interfaces/json/interfaceCirconscription"
import { IParty } from "../../interfaces/json/interfaceParty"

const districtCollection = "Quebec_Circonscription_2022"
const circonscriptionPathJSON = "../data/quebec/2022/Circonscription_Data_2022.json"


const PartyCollection = "Qeubec_Party_2022"
const partyPathJSON = "../data/quebec/2022/Party_Final_Vote_2022.json"


async function saveDistrictsToDB() {
    try {
        //Get json data
        const rawData = await fs.readFile(circonscriptionPathJSON)
        const districtsJson: ICirconscription[] = JSON.parse(rawData.toString());
        // Remove unwanted properties
        districtsJson.forEach(d => {
            delete d.iso8601DateMAJ
            delete d.nbBureauComplete
            delete d.nbBureauTotal
        })

        console.log("Got Distrtict json")
        const db = new DB()
        await db.dropAndCreateCollection(districtCollection)
        await db.insertManyToCollection(districtCollection, districtsJson)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

async function savePartiesToDB() {
    try {
        //Get json data
        let rawData = await fs.readFile(partyPathJSON)
        let partiesJson: IParty[] = JSON.parse(rawData.toString());
        // Remove unwanted properties
        partiesJson.forEach(p => {
            delete p.nbCandidat
        })
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
    await Promise.all([saveDistrictsToDB(), savePartiesToDB()])
    console.log("Done.")
    process.exit(0)
})()
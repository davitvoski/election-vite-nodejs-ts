import DB from "../../db/db"
import * as fs from "fs/promises"
import { ICirconscription } from "../../interfaces/json/quebec/interfaceCirconscription"
import { IParty } from "../../interfaces/json/interfaceParty"

const districtCollection = "Quebec_Circonscription_2018"
const circonscriptionPathJSON = "../data/quebec/2018/Circonscription_Data_2018.json"


const PartyCollection = "Quebec_Party_2018"
const partyPathJSON = "../data/quebec/2018/Party_Final_Vote_2018.json"


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
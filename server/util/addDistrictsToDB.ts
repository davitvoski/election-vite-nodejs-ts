import DB from "../db/db"
import * as fs from "fs/promises"
const districtCollection = "Circonscription"
const PartyCollection = "Party_Final_Votes"

async function saveDistrictsToDB() {
    try {
        //Get json data
        let rawData = await fs.readFile('../data/Circonscription_Data.json')
        let districtsJson = JSON.parse(rawData.toString());
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
        let rawData = await fs.readFile('../data/Party_Final_Votes.json')
        let partiesJson = JSON.parse(rawData.toString());
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
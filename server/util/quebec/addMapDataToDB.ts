import DB from "../../db/db"
import * as fs from "fs/promises"
import { IQCTopoJson } from "../../interfaces/json/quebec/interfaceTopoJson"
import { IQCCirconscription } from "../../interfaces/json/quebec/interfaceCirconscription"

const collectionName = "QuebecMap-2018"

const circonscriptionPathJSON = "./../data/quebec/2018/Circonscription_Data_2018.json"
const mapPathJSON = "./../data/quebec/topoJsonQuebecMap.json"

interface IPartyColors {
    [key: string]: string
}

const PartyColors: IPartyColors = {
    "P.Q.": "#0419a1",
    "C.A.Q.-E.F.L.": "#149ecb",
    "C.A.Q.-É.F.L.": "#149ecb",
    "P.L.Q./Q.L.P.": "#e00719",
    "P.C.Q-E.E.D.": "#8a08d5",
    "Q.S.": "#e08407",
    "C.Q.": "#000000",
    "P.Li.Q.": "#000000",
} as const

/**
 * This function adds the color of the winner in the region to the topoJson circoncription data
 * @param {IQCTopoJson} topoJson 
 */
async function addWinnersColor(topoJson: IQCTopoJson) {
    // Read topoJson file
    let generalResults = await fs.readFile(circonscriptionPathJSON)
    let data: IQCCirconscription[] = JSON.parse(generalResults.toString()) as IQCCirconscription[]
    data.forEach((circo) => {
        circo.candidats.sort((candidat, candidat2) => {
            return candidat.tauxVote > candidat2.tauxVote ? 1 : 0
        })
    })

    console.log("Adding colors.")
    topoJson.objects.circonscriptions.geometries.forEach(geo => {
        const circo = data.find(circo => {
            return circo.numeroCirconscription === geo.properties.CO_CEP
        })
        // Get Color
        const color: string = PartyColors[circo!!.candidats[0].abreviationPartiPolitique as string]

        if (color) {
            geo.properties["COLOR"] = color
        } else {
            geo.properties["COLOR"] = "#808080"
        }
    })
}

/**
 * This function saves the Cleaned topoJson data to MongoDB
 * @file [./data/topoJsonSimpleMaps.json]
 */
async function savetopojsonToDB() {
    try {
        // Read topoJson file
        let rawData = await fs.readFile(mapPathJSON)
        let topoJson: IQCTopoJson = JSON.parse(rawData.toString());
        console.log("GOT JSON")
        await addWinnersColor(topoJson)
        const db = new DB()
        //Check Collection
        await db.dropAndCreateCollection(collectionName)
        await db.insertManyToCollection(collectionName, [topoJson])
        console.log("Done.");
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

}

(async () => {
    await savetopojsonToDB()
    process.exit(0)
})()
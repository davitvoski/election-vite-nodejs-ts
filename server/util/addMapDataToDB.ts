import DB from "../db/db"
import * as fs from "fs/promises"
import { ITopoJson } from "./interfaceTopoJson"
import * as ICir from "./interfaceCirconscription"

const collectionName = "TopoJsonSimpleMaps"

interface IPartyColors {
    [key: string]: string
}

const PartyColors: IPartyColors = {
    "P.Q.": "#0419a1",
    "C.A.Q.-E.F.L.": "#149ecb",
    "P.L.Q./Q.L.P.": "#e00719",
    "P.C.Q-E.E.D.": "#8a08d5",
    "Q.S.": "#e08407",
    "C.Q.": "#000000",
    "P.Li.Q.": "#000000",
}

/**
 * This function adds the color of the winner in the region to the topoJson circoncription data
 * @param {ITopoJson} topoJson 
 */
async function addWinnersColor(topoJson: ITopoJson) {
    // Read topoJson file
    let generalResults = await fs.readFile('../data/Circonscription_Data.json')
    let data: ICir.ICirconscription[] = JSON.parse(generalResults.toString()) as ICir.ICirconscription[]
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
    // Read topoJson file
    let rawData = await fs.readFile('../data/topoJsonSimpleMaps.json')
    let topoJson: ITopoJson = JSON.parse(rawData.toString());
    console.log("GOT JSON")
    await addWinnersColor(topoJson)
    const db = new DB()
    //Check Collection
    await db.dropAndCreateCollection(collectionName)
    await db.insertManyCollection(collectionName, [topoJson])
    console.log("Done.");
}

(async () => {
    await savetopojsonToDB()
    process.exit(0)
})()
import * as express from "express"
import { Candidat } from "../../interfaces/json/interfaceCirconscription"
import { getCircoDataFromMongo, getTopoJsonDataFromMongo } from "./database.controller"
import { redisClient } from "../../app"
import { ITopoJson } from "../../interfaces/json/interfaceTopoJson"

/**
 * This method gets the TopoJson data from MongoDB to visualize the map
 * @param {express.Request} _ Express Request
 * @param {express.Response} res Express Response
 */
async function getTopoJsonData(_: express.Request, res: express.Response) {
    try {
        let topoJson: string | null | ITopoJson = await redisClient.get("Quebec_Map")
        if (topoJson == null) {
            console.log("TOPOJSON NO CAHCE")
            // Get Data From Database
            topoJson = await getTopoJsonDataFromMongo()
            // Cache map
            redisClient.set("Quebec_Map", JSON.stringify(topoJson), {
                EX: 60 * 60 * 24,
                NX: true
            })
        } else {
            topoJson = JSON.parse(topoJson)
        }
        res.status(200).json(topoJson)
    } catch (err) {
        console.error(err)
        res.sendStatus(404)
    }
}


/**
 * This method gets the TopoJson data from MongoDB to visualize the map
 * @param {express.Request} _ Express Request
 * @param {express.Response} res Express Response
 */
async function getCirconscriptionVoteDetails(req: express.Request, res: express.Response) {
    const numeroCIRCO: string = req.params.numeroCirco
    try {
        // let circonscription //= cache.get(numeroCIRCO);
        let circonscription = await getCircoDataFromMongo(numeroCIRCO)

        // Sort the candidats by their vote percentage - winner is at index 0
        circonscription.candidats.sort((candidat: Candidat, candidat2: Candidat) => {
            return candidat.tauxVote > candidat2.tauxVote ? 1 : 0
        })

        res.status(200).json(circonscription)
    } catch (err) {
        console.error(err)
        res.sendStatus(404)
    }
}

export { getCirconscriptionVoteDetails, getTopoJsonData }
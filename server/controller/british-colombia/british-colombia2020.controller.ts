import * as express from "express"
import * as dbController from "./../quebec/database.controller"
import { redisClient } from "../../app"
import { IMapBC } from "../../interfaces/json/british-colombia/IMapBC"
import { IBCParty } from "../../interfaces/json/british-colombia/Parties"

/**
 * This method gets the TopoJson data from MongoDB to visualize the map
 * @param {express.Request} _ Express Request
 * @param {express.Response} res Express Response
 */
async function getMap_BC_2020(_: express.Request, res: express.Response) {
    const colectionName = "British-Colombia-Map-2020"
    try {
        let topoJson: string | null | IMapBC = await redisClient.get("BritishColombiaMap2020")
        if (topoJson == null) {
            // Get Data From Database
            topoJson = await dbController.getTopoJsonDataFromMongo(colectionName)
            // Cache map
            redisClient.set("BritishColombiaMap2020", JSON.stringify(topoJson), {
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
 * This endpoint sends all parties votes data to the client
 * @param {express.Request}  _  Express Request
 * @param {express.Response} res Express Response
 */
async function getAllParties_BC_2020(_: express.Request, res: express.Response) {
    const colectionName = "British_Columbia_Party_2020"

    try {
        let allPartyVotes: string | null | IBCParty[] = await redisClient.get("British_Columbia_Party_2020")
        if (allPartyVotes == null) {
            allPartyVotes = await dbController.getAllPartyVotesFromMongo(colectionName)
            // Cache the all circonscription
            redisClient.set("British_Columbia_Party_2020", JSON.stringify(allPartyVotes), {
                EX: 60 * 60 * 24,
                NX: true
            })
        } else {
            allPartyVotes = JSON.parse(allPartyVotes)
        }
        res.status(200).json(allPartyVotes)
    } catch (err) {
        console.error(err)
        res.sendStatus(404)
    }
}


export { getMap_BC_2020, getAllParties_BC_2020}
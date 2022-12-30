import * as express from "express"
import { ICandidat, IQCCirconscription } from "../../interfaces/json/quebec/interfaceCirconscription"
import * as dbController from "./database.controller"
import { redisClient } from "../../app"
import { IQCTopoJson } from "../../interfaces/json/quebec/interfaceTopoJson"
import { IQCParty } from "../../interfaces/json/quebec/interfaceParty"

/**
 * This method gets the TopoJson data from MongoDB to visualize the map
 * @param {express.Request} _ Express Request
 * @param {express.Response} res Express Response
 */
async function getMap_2018(_: express.Request, res: express.Response) {
    const colectionName = "QuebecMap-2018"
    try {
        let topoJson: string | null | IQCTopoJson = await redisClient.get("QuebecMap2018")
        if (topoJson == null) {
            // Get Data From Database
            topoJson = await dbController.getTopoJsonDataFromMongo(colectionName)
            // Cache map
            redisClient.set("QuebecMap2018", JSON.stringify(topoJson), {
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
async function getCirconscriptionVoteDetails_2018(req: express.Request, res: express.Response) {
    const colectionName = "Quebec_Circonscription_2018"

    try {
        const numeroCIRCO: string = req.params.numeroCirco
        let circonscription: string | null | IQCCirconscription = await redisClient.get(`Quebec_Circonscription_2018_${numeroCIRCO}`)
        if (circonscription == null) {
            // Get Data From Database
            circonscription = await dbController.getCircoDataFromMongo(numeroCIRCO, colectionName)
            // Cache the circonscription
            redisClient.set(`Quebec_Circonscription_2018_${numeroCIRCO}`, JSON.stringify(circonscription), {
                EX: 60 * 60 * 24,
                NX: true
            })
        } else {
            circonscription = JSON.parse(circonscription) as IQCCirconscription
        }
        // Sort the candidats by their vote percentage - winner is at index 0
        circonscription.candidats.sort((candidat: ICandidat, candidat2: ICandidat) => {
            return candidat.tauxVote > candidat2.tauxVote ? 1 : 0
        })

        res.status(200).json(circonscription)
    } catch (err) {
        console.error(err)
        res.sendStatus(404)
    }
}

/**
 * This endpoint sends all the circonscription data to the client
 * @param {express.Request}  _  Express Request
 * @param {express.Response} res Express Response
 */
async function getAllCirconscription_2018(_: express.Request, res: express.Response) {
    const colectionName = "Quebec_Circonscription_2018"

    try {
        let allCirconscription: string | null | IQCCirconscription[] = await redisClient.get("Quebec_All_Circonscription_2018")
        if (allCirconscription == null) {
            allCirconscription = await dbController.getAllCirconscriptionFromMongo(colectionName)
            // Cache the all circonscription
            redisClient.set("Quebec_All_Circonscription_2018", JSON.stringify(allCirconscription), {
                EX: 60 * 60 * 24,
                NX: true
            })
        } else {
            allCirconscription = JSON.parse(allCirconscription)
        }
        res.status(200).json(allCirconscription)
    } catch (err) {
        console.error(err as string)
        res.sendStatus(404)
    }
}

/**
 * This endpoint sends all parties votes data to the client
 * @param {express.Request}  _  Express Request
 * @param {express.Response} res Express Response
 */
async function getAllPartyVotes_2018(_: express.Request, res: express.Response) {
    const colectionName = "Quebec_Party_2018"

    try {
        let allPartyVotes: string | null | IQCParty[] = await redisClient.get("Quebec_Parties_2018")
        if (allPartyVotes == null) {
            allPartyVotes = await dbController.getAllPartyVotesFromMongo(colectionName)
            // Cache the all circonscription
            redisClient.set("Quebec_Parties_2018", JSON.stringify(allPartyVotes), {
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

export { getCirconscriptionVoteDetails_2018, getMap_2018, getAllCirconscription_2018, getAllPartyVotes_2018 }
import * as express from "express"
import { ICandidat, ICirconscription } from "../../interfaces/json/interfaceCirconscription"
import * as dbController from "./database.controller"
import { redisClient } from "../../app"
import { ITopoJson } from "../../interfaces/json/interfaceTopoJson"
import { IParty } from "../../interfaces/json/interfaceParty"

/**
 * This method gets the TopoJson data from MongoDB to visualize the map
 * @param {express.Request} _ Express Request
 * @param {express.Response} res Express Response
 */
async function getTopoJsonData(_: express.Request, res: express.Response) {
    try {
        let topoJson: string | null | ITopoJson = await redisClient.get("Quebec_Map")
        if (topoJson == null) {
            // Get Data From Database
            topoJson = await dbController.getTopoJsonDataFromMongo()
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
    try {
        const numeroCIRCO: string = req.params.numeroCirco
        let circonscription: string | null | ICirconscription = await redisClient.get(`Quebec_Circo_${numeroCIRCO}`)
        if (circonscription == null) {
            // Get Data From Database
            circonscription = await dbController.getCircoDataFromMongo(numeroCIRCO)
            // Cache the circonscription
            redisClient.set(`Quebec_Circo_${numeroCIRCO}`, JSON.stringify(circonscription), {
                EX: 60 * 60 * 24,
                NX: true
            })
        } else {
            circonscription = JSON.parse(circonscription) as ICirconscription
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
async function getAllCirconscription(_: express.Request, res: express.Response) {
    try {
        let allCirconscription: string | null | ICirconscription[] = await redisClient.get("Quebec_All_Circonscription")
        if (allCirconscription == null) {
            allCirconscription = await dbController.getAllCirconscriptionFromMongo()
            // Cache the all circonscription
            redisClient.set("Quebec_All_Circonscription", JSON.stringify(allCirconscription), {
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
async function getAllPartyVotes(_: express.Request, res: express.Response) {
    try {
        let allPartyVotes: string | null | IParty[] = await redisClient.get("Quebec_All_Party_Votes")
        if (allPartyVotes == null) {
            allPartyVotes = await dbController.getAllPartyVotesFromMongo()
            // Cache the all circonscription
            redisClient.set("Quebec_All_Party_Votes", JSON.stringify(allPartyVotes), {
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

export { getCirconscriptionVoteDetails, getTopoJsonData, getAllCirconscription, getAllPartyVotes }
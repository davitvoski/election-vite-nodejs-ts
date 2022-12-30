import * as express from "express"
import * as dbController from "./../quebec/database.controller"
import { redisClient } from "../../app"
import { IQCTopoJson } from "../../interfaces/json/quebec/interfaceTopoJson"
import { IMapBC } from "../../interfaces/json/british-colombia/IMapBC"

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




export { getMap_BC_2020 }
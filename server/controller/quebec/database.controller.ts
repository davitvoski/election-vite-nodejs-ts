import DB from "../../db/db";
import { ICirconscription } from "../../interfaces/json/interfaceCirconscription";
import { ITopoJson } from "../../interfaces/json/interfaceTopoJson";
const db = new DB();

const collectionTopoJson = "TopoJsonSimpleMaps"
const collectionCiro = "Circonscription"

/**
 * This method gets a cironcription from database.
 * @param numeroCIRCO - [Number] The circonscription number
 * @returns {ICirconscription} The circonscription data
 */
async function getCircoDataFromMongo(numeroCIRCO: string): Promise<ICirconscription> {
    // Check if the circonscription number is a number
    if (isNaN(+numeroCIRCO)) {
        throw Error("Circonscription number provided is not a number")
    }
    // numeroCirconscription: Number(numeroCIRCO) 
    try {
        // Get Collection
        const collection = await db.getCollection(collectionCiro)
        // Get Data
        const circonscription = await collection.find({ numeroCirconscription: Number(numeroCIRCO) }, { projection: { _id: 0 } }).toArray()
        const data = circonscription[0] as unknown as ICirconscription
        return data
    } catch (err) {
        throw new Error(err as string)
    }

}

/**
* This method gets the TopoJson data from database.
* @returns {Pormise<ITopoJson>} The TopoJson data from MongoDB
*/
async function getTopoJsonDataFromMongo(): Promise<ITopoJson> {
    try {
        // Get Collection
        const collection = await db.getCollection(collectionTopoJson)
        // Get Data
        const topojsonArray = await collection.find({}, { projection: { _id: 0 } }).toArray()
        const data = topojsonArray[0] as unknown as ITopoJson
        return data
    } catch (err) {
        throw new Error(err as string)
    }
}

async function getAllCirconscriptionFromMongo(): Promise<ICirconscription[]> {
    try {
        // Get Collection
        const collection = await db.getCollection(collectionCiro)
        const allCirconscription = await collection.find({}, { projection: { _id: 0 } }).toArray() as unknown as ICirconscription[]
        return allCirconscription
    } catch (err) {
        throw new Error(err as string)
    }
}

export { getCircoDataFromMongo, getTopoJsonDataFromMongo, getAllCirconscriptionFromMongo }
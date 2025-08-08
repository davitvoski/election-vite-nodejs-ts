import DB from "../../db/db";
import { IQCCirconscription } from "../../interfaces/json/quebec/interfaceCirconscription";
import { IQCParty } from "../../interfaces/json/quebec/interfaceParty";
import { IQCTopoJson } from "../../interfaces/json/quebec/interfaceTopoJson";

const db = new DB();

/**
 * This method gets a cironcription from database.
 * @param numeroCIRCO - [Number] The circonscription number
 * @returns {IQCCirconscription} The circonscription data
 */
async function getCircoDataFromMongo(numeroCIRCO: string, collectionName: string): Promise<IQCCirconscription> {
    // Check if the circonscription number is a number
    if (isNaN(+numeroCIRCO)) {
        throw Error("Circonscription number provided is not a number")
    }

    try {
        // Get Collection
        const collection = await db.getCollection(collectionName)
        // Get Data
        const circonscription = await collection.find({ numeroCirconscription: Number(numeroCIRCO) }, { projection: { _id: 0 } }).toArray()
        const data = circonscription[0] as unknown as IQCCirconscription
        return data
    } catch (err) {
        throw new Error(err as string)
    }

}

/**
* This method gets the TopoJson data from database.
* @returns {Pormise<IQCTopoJson>} The TopoJson data from MongoDB
*/
async function getTopoJsonDataFromMongo(collectionName: string): Promise<any> {
    try {
        // Get Collection
        const collection = await db.getCollection(collectionName)
        // Get Data
        const topojsonArray = await collection.find({}, { projection: { _id: 0 } }).toArray()
        const data = topojsonArray[0] as unknown
        return data
    } catch (err) {
        throw new Error(err as string)
    }
}/**
 * This method gets All Circonscriptions from database.
 * @returns {Promise<IQCCirconscription[]>} Promise of All circonscription data
 */
async function getAllCirconscriptionFromMongo(collectionName: string): Promise<any> {
    try {
        // Get Collection
        const collection = await db.getCollection(collectionName)
        const allCirconscription = await collection.find({}, { projection: { _id: 0 } }).toArray() as unknown
        return allCirconscription
    } catch (err) {
        throw new Error(err as string)
    }
}

/**
 * This method gets All Parties from database.
 * @returns {Promise<IQCParty[]>} Promise of All party data
 */
async function getAllPartyVotesFromMongo(collectionName: string): Promise<any> {
    try {
        // Get Collection
        const collection = await db.getCollection(collectionName)
        const allCirconscription = await collection.find({}, { projection: { _id: 0 } }).toArray() as unknown[]
        return allCirconscription
    } catch (err) {
        throw new Error(err as string)
    }
}
export { getCircoDataFromMongo, getTopoJsonDataFromMongo, getAllCirconscriptionFromMongo, getAllPartyVotesFromMongo }
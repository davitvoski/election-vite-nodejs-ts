import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })
import * as mongoDB from "mongodb"

const dbUrl: string = process.env.ATLAS_URI as string
const dbName: string = process.env.ATLAS_DB_NAME as string

class DB {
    private static instance: DB
    private db: mongoDB.Db
    private client: mongoDB.MongoClient

    constructor() {
        if (!DB.instance) {
            DB.instance = this
            this.client = new mongoDB.MongoClient(dbUrl)
            this.client.connect()
            this.db = this.client.db(dbName)
        }
        return DB.instance
    }

    async dropAndCreateCollection(collectionName: string) {
        let collectionExists = (await this.db.listCollections().toArray()).
            find((collection) => collection.name === collectionName)

        if (collectionExists) {
            await this.db.dropCollection(collectionName)
            console.log("Collection dropped.")
        }
        await this.db.createCollection(collectionName)
    }

    async insertManyCollection(collectionName: string, data: any[]) {
        const collection = this.db.collection(collectionName)
        const result = await collection.insertMany(data)
        return result
    }

    async closeConnection() {
        this.client.close()
    }
}

export default DB

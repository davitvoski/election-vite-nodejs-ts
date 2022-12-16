import dotenv from "dotenv"
dotenv.config()
import * as mongoDB from "mongodb"

const dbUrl: string = process.env.ATLAS_URL as string
const dbName: string = process.env.ATLAS_DB_NAME as string


export default class Db {
    private static instance: Db
    private db: mongoDB.Db | undefined

    constructor() {
        if(!Db.instance){
            Db.instance = this
            const client = new mongoDB.MongoClient(dbUrl)
            client.connect()
            this.db = client.db(dbName)
        }
        return Db.instance
    }
}

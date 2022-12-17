import dotenv from "dotenv"
dotenv.config()
import * as express from "express"
import compression from "compression"
import * as redis from "redis"
import quebecElectionRouter from "./routes/quebecElection.router"

const redisClient = redis.createClient({ 
    url: "redis://default:fRMAbrfGsCIQx1GGjMRfBYpZiQcfADoQ@redis-14640.c10.us-east-1-3.ec2.cloud.redislabs.com:14640"
});
(async () => {
    try {
        await redisClient.connect()
    } catch (err) {
        console.log(`Redis-Error: ${err}`)
        process.exit(1)
    }
})();

const app = express.default()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("../client/build"))

// Quebec Election routes
app.use("/election", quebecElectionRouter)

// Default 404 handler
app.use((_, res) => {
    res.sendStatus(404)
});

export default app
export { redisClient }
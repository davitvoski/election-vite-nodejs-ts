import dotenv from "dotenv"
dotenv.config()
import * as express from "express"
import compression from "compression"
import * as redis from "redis"
import quebecElectionRouter from "./routes/quebecElection.router"
import britishColombiaElectionRouter from "./routes/british-colombiaElection.router"

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
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
app.use(express.static("../client/build"))

// Election routes
app.use("/election/quebec", quebecElectionRouter)
app.use("/election/british-colombia", britishColombiaElectionRouter)


// Default 404 handler
app.use((_, res) => {
    res.sendStatus(404)
});

export default app
export { redisClient }
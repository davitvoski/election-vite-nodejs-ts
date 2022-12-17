import * as express from "express"
import compression from "compression"
import quebecElectionRouter from "./routes/quebecElection.router"

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
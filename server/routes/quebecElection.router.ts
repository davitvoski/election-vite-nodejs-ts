import * as express from "express"
import { getAllCirconscription, getCirconscriptionVoteDetails, getTopoJsonData } from "../controller/quebec/quebecElection.controller"

const router = express.Router()

router.get("/2022/allCirconscription", getAllCirconscription)
router.get("/2022/circonscription/:numeroCirco", getCirconscriptionVoteDetails)
router.get("/map", getTopoJsonData)


export default router

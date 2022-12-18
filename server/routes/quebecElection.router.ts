import * as express from "express"
import * as quebecController from "../controller/quebec/quebecElection.controller"

const router = express.Router()

router.get("/2022/allCirconscription", quebecController.getAllCirconscription)
router.get('/2022/parties/votes', quebecController.getAllPartyVotes);
router.get("/2022/circonscription/:numeroCirco", quebecController.getCirconscriptionVoteDetails)
router.get("/map", quebecController.getTopoJsonData)


export default router

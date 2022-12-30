import * as express from "express"
import { getMap_BC_2020 } from "../controller/british-colombia/british-colombia2020.controller"

const router = express.Router()

// router.get("/2020/allCirconscription", quebecController2020.getAllCirconscription_2020)
// router.get('/2020/parties/votes', quebecController2020.getAllPartyVotes_2020)
// router.get("/2020/circonscription/:numeroCirco", quebecController2020.getCirconscriptionVoteDetails_2020)
router.get("/2020/map", getMap_BC_2020)






export default router

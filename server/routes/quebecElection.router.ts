import * as express from "express"
import * as quebecController2022 from "../controller/quebec/quebecElection2022.controller"
import * as quebecController2018 from "../controller/quebec/quebecElection2018.controller"

const router = express.Router()

router.get("/2022/allCirconscription", quebecController2022.getAllCirconscription_2022)
router.get('/2022/parties/votes', quebecController2022.getAllPartyVotes_2022)
router.get("/2022/circonscription/:numeroCirco", quebecController2022.getCirconscriptionVoteDetails_2022)
router.get("/2022/map", quebecController2022.getMap_2022)


router.get("/2018/allCirconscription", quebecController2018.getAllCirconscription_2018)
router.get('/2018/parties/votes', quebecController2018.getAllPartyVotes_2018)
router.get("/2018/circonscription/:numeroCirco", quebecController2018.getCirconscriptionVoteDetails_2018)
router.get("/2018/map", quebecController2018.getMap_2018)




export default router

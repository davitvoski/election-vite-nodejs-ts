import * as express from "express"
import { getAllParties_BC_2020, getMap_BC_2020 } from "../controller/british-colombia/british-colombia2020.controller"

const router = express.Router()

router.get('/2020/parties', getAllParties_BC_2020)
router.get("/2020/map", getMap_BC_2020)


export default router

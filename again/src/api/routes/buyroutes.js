import { Router } from "express";
import {createclient} from "../controllers/buycontroller.js"
const router = Router();
router.post("/compras",createclient)
export default router
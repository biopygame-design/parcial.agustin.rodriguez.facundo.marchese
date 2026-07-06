import { Router } from "express";
import { createAdminUser } from "../controllers/usuariocontroller.js";

const router = Router()


router.get("/login",createAdminUser)

export default router
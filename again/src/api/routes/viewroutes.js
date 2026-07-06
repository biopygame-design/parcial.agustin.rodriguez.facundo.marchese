import { Router } from "express";
import { getView, indexView, postView, putView } from "../controllers/viewcontroller.js";
import { requirelogin } from "../middelwares/middelwares.js";
const router = Router();

// Antes de servir cada vista, chequeamos si existe una sesion, este es un filtro de seguridad para proteger estas rutas de un acceso sin login (y por tanto sin sesion)
router.get("/index", requirelogin, indexView);

router.get("/consultar", requirelogin, getView);

router.get("/crear", requirelogin, postView);

router.get("/modificar", requirelogin, putView);



export default router;
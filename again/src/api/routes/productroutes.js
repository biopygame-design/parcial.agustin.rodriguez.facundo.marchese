import { Router } from "express";
import { valitadeid,requirelogin } from "../middelwares/middelwares.js";
import { GetAll,GetById,createproduct,modificarproducto } from "../controllers/product.controller.js";
const router = Router();

// GET all products
router.get("/juegos", requirelogin, GetAll);



// GET product by id
router.get("/:id", valitadeid, requirelogin, GetById);


// POST product
router.post("/juegos", requirelogin,createproduct);
router.put("/juegos/modificar", modificarproducto,requirelogin)

export default router;
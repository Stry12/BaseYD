import { Router } from "express";
import { methods as pruebaMethods } from "../controllers/prueba_consultas.js";

const router = Router();

router.get('/prueba1/:genero1&:genero2',pruebaMethods.prueba1);
router.get('/prueba2/:genero1&:genero2',pruebaMethods.prueba2);
router.get('/prueba3/:isbn',pruebaMethods.prueba3);
router.get('/prueba4/:cantidad',pruebaMethods.prueba4);
router.get('/prueba5/',pruebaMethods.prueba5);
router.get('/prueba6/:prom',pruebaMethods.prueba6);
router.get('/prueba7/',pruebaMethods.prueba7);
router.get('/prueba8/:cantidad',pruebaMethods.prueba8);
router.get('/prueba9/',pruebaMethods.prueba9);
router.get('/prueba10/:cantidad',pruebaMethods.prueba10);

export default router;
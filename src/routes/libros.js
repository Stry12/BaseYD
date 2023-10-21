import { Router } from "express";
import {methods as librosMethods} from '../controllers/libros.js';

const router = Router();

router.get("/titulos/:text",librosMethods.getLibrosTitulo);

export default router;
import { Router } from "express";
import { RegisterMethods } from "../controllers/register.js";
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath para trabajar con import.meta.url
import path from 'path';
import multer from 'multer';



const router = Router();

router.post('/setuser',RegisterMethods.setUser);

export default router
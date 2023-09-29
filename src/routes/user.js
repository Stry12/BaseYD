import { Router } from "express";
import {methods as userMethods} from '../controllers/user.js';

const router = Router();

router.get("/",userMethods.getLibros);
router.get("/libros",userMethods.getLibros);
router.get("/general/:id",userMethods.getGeneral);


export default router;0
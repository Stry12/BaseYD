import { Router } from "express";
import {methods as userMethods} from '../controllers/user.js';

const router = Router();

//Jorge
router.post("/registro",userMethods.registro);

export default router;
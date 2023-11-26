import { Router } from "express";
import userMethods from '../controllers/user.js';

const router = Router();

//Jorge
router.post("/registro",userMethods.registro);
router.post("/setuser", userMethods.setUser)
router.post("/getuser",userMethods.getCuenta,userMethods.verificarToken)
export default router;
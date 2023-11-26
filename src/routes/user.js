import { Router } from "express";
import {getCuenta, setUser, verificarToken} from '../controllers/user.js';

const router = Router();

router.post("/setuser", setUser)
router.post("/getuser",getCuenta,verificarToken)
export default router;
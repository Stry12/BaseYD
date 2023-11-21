import { Router } from "express";
import {getCuenta, setUser} from '../controllers/user.js';

const router = Router();

router.post("/setuser", setUser)
router.post("/getuser", getCuenta)

export default router;
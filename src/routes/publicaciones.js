import { Router } from "express";
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath para trabajar con import.meta.url
import path from 'path';
import multer from 'multer';
import noSqlPublicaciones from '../controllers/publicaciones_nosql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../imagenes/publicaciones'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-portada-" + file.originalname);
    }
});

const fileUpload = multer({
    storage: diskStorage
}).array('images', 3);

const router = Router();

router.post('/subir', fileUpload, noSqlPublicaciones.createPublicacion);
router.get('/get', noSqlPublicaciones.getPublicaciones);
router.get('/get/:id', noSqlPublicaciones.getPublicacionesid)
router.delete('/delete/:id', noSqlPublicaciones.deletePublicacion);

export default router;
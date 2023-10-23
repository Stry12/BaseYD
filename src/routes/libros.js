import { Router } from "express";
import {methods as librosMethods} from '../controllers/libros.js';
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath para trabajar con import.meta.url
import path from 'path';
import multer from 'multer';

// Obtén la ruta del archivo actual usando import.meta.url y luego conviértela a la ruta del sistema de archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../imagenes/portadas'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-portada-" + file.originalname);
    }
});

const fileUpload = multer({
    storage: diskStorage
}).single('coverImage');

const router = Router();

router.get("/titulos/:text",librosMethods.getLibrosTitulo);
router.get("/getlibros",librosMethods.getLibros);
router.post("/subir",fileUpload,librosMethods.addLibro);

export default router;
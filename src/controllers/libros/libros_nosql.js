import LibroModel from '../../models/libro_nosql.js';
import path from 'path';
const noSqlLibros = {};

noSqlLibros.createLibro = async (req, res) => {
    
    try {
        const rutaCompleta = req.file.path; // C:\Users\Salvador\OneDrive - alumnos.uv.cl\Documentos\GitHub\BaseYD\src\imagenes\portadas\1701060375379-portada-Ver_datos_2-5.png
        const nombreArchivo = path.basename(rutaCompleta);
        // Usar el nombre del archivo como sea necesario
        req.body.coverImage = nombreArchivo;
        const libro = new LibroModel(req.body);
        await libro.save();
        res.status(200).json({ message: 'Libro creado', libro: libro });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

noSqlLibros.getLibros = async (req, res) => {
    try {
        const libros = await LibroModel.find();
        res.status(200).json({ message: 'Lista de libros', libros: libros });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

noSqlLibros.getLibro = async (req, res) => {
    try {
        const libro = await LibroModel.find({"isbn": req.params.id});
        res.status(200).json({ message: 'Libro encontrado', libro: libro });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

noSqlLibros.getISBNautor = async (req, res) => {
    try {
        const libro = await LibroModel.find({},"author isbn title images");
        res.status(200).json({ message: 'Libro encontrado', libro: libro });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

export default noSqlLibros;
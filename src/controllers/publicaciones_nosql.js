import PublicacionesModel from "../models/publicaciones_nosql.js"
import path from 'path';
const noSqlPublicaciones = {};

noSqlPublicaciones.createPublicacion = async (req, res) => {
        
        try {
                // Obtén solo los nombres de los archivos
            const fileNames = req.files.map(file => path.basename(file.path));
        
                // Puedes usar los nombres de los archivos para cualquier cosa que necesites
            console.log('Nombres de archivos guardados:', fileNames);

            req.body.images = fileNames;
            
            // Usar el nombre del archivo como sea necesario
            const publicacion = new PublicacionesModel(req.body);
            await publicacion.save();
            res.status(200).json({ message: 'Publicacion creada', publicacion: publicacion });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        };
}

noSqlPublicaciones.getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await PublicacionesModel.find();
        res.status(200).json({ message: 'Lista de publicaciones', publicaciones: publicaciones });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}


noSqlPublicaciones.getPublicacionesid = async (req, res) => {
    try {
        const publicaciones = await PublicacionesModel.find({"id_usuario": req.params.id});
        res.status(200).json(publicaciones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export default noSqlPublicaciones;
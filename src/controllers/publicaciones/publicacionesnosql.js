import PublicacionModel from '../../models/publicaciones_nosql.js';
const noSqlPublicaciones = {};

noSqlPublicaciones.createPublicacion = async (req, res) => {
    try {
        const publicacion = new PublicacionModel(req.body);
        await publicacion.save();
        res.status(200).json({ message: 'Publicacion creada', publicacion: publicacion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

noSqlPublicaciones.getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await PublicacionModel.find();
        res.status(200).json({ message: 'Lista de publicaciones', publicaciones: publicaciones });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

export default noSqlPublicaciones;
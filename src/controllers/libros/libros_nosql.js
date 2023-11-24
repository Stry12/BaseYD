import LibroModel from '../../models/libro_nosql.js';
const noSqlLibros = {};

noSqlLibros.createLibro = async (req, res) => {
    try {
        const libro = new LibroModel(req.body);
        await libro.save();

        res.status(200).json({ message: 'Libro creado', libro: libro });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
}

export default noSqlLibros;
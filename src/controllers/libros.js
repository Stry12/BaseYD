import mysql2 from 'mysql2';
import connectionConfig from '../database/connection.js';

const createConnection = async () => {
    return mysql2.createConnection(connectionConfig);
}

const getLibrosTitulo = async (req, res) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.promise().query('SELECT * FROM libros WHERE Titulo LIKE ?', [`%${req.params.text}%`]);

        connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros con el título proporcionado.' });
        }

        return res.status(200).json({ message: 'Libros encontrados', libros: rows });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addLibro = async (req, res) => {
    try {
        // Verifica si se ha subido un archivo
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido un archivo de portada.' });
        }

        // La información de la imagen subida está disponible en req.file
        const file = req.file;
        console.log('Nombre del archivo:', file.originalname);
        console.log('Tipo de archivo:', file.mimetype);
        console.log('Tamaño del archivo:', file.size);

        // Aquí puedes guardar la información del archivo en la base de datos o realizar otras acciones necesarias.

        return res.status(200).json({ message: 'Información de la imagen recibida con éxito.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const methods = {
    getLibrosTitulo,
    addLibro
};

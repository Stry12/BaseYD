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



export const methods = {
    getLibrosTitulo
};
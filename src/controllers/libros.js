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

const getLibros = async (req, res) => {
    try {
        const connection = await createConnection();
        //const [rows] = await connection.promise().query('SELECT * FROM libros');
        const [rows] = await connection.promise().query('SELECT libros.ISBN,Portadas.nombre_imagen FROM `libros` INNER JOIN Portadas ON Portadas.ISBN = libros.ISBN');

        connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros' });
        }
        return res.status(200).json({ message: 'Libros encontrados', libros: rows });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getLibroID = async (req, res) => {
    try {
        const connection = await createConnection();
        //const [rows] = await connection.promise().query('SELECT * FROM libros');
        const [rows] = await connection.promise().query('SELECT S.*,Portadas.nombre_imagen FROM ((SELECT * FROM libros WHERE ISBN = ?) AS S INNER JOIN Portadas ON Portadas.ISBN = S.ISBN)', [req.params.id]);

        connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros' });
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

        const connection = await createConnection();
        const [rows] = await connection.promise().query('INSERT INTO libros (ISBN ,Titulo, Autor, Descripción, Categoria) VALUES (? ,?, ?, ?, ?)', [req.body.isbn,req.body.title, req.body.author, req.body.synopsis, req.body.category]);
        const [rows2] = await connection.promise().query('INSERT INTO Portadas (nombre_imagen, ISBN, ruta, extension) VALUES (?, ?, ?, ?)', [req.file.filename, req.body.isbn,req.file.destination, req.file.mimetype]);
        connection.end();      
        console.log('Libro agregado con éxito.');
        return res.status(200).json({ message: 'Información de la imagen recibida con éxito.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const methods = {
    getLibrosTitulo,
    addLibro,
    getLibros,
    getLibroID
};

import mysql2 from 'mysql2';
import connectionConfig from '../../database/connection.js';

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

const getLibros = async (req, res, next) => {
    try {
        const bdSelection = req.params.typeBd;
        if(bdSelection === 'sql'){
            const connection = await createConnection();
            //const [rows] = await connection.promise().query('SELECT * FROM libros');
            const [rows] = await connection.promise().query('SELECT libros.ISBN,Portadas.nombre_imagen FROM `libros` INNER JOIN Portadas ON Portadas.ISBN = libros.ISBN');

            connection.end();

            if (rows.length === 0) {
                return res.status(404).json({ message: 'No se encontraron libros' });
            }
            return res.status(200).json({ message: 'Libros encontrados', libros: rows });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getLibroID = async (req, res, next) => {
    try {
        const bdSelection = req.params.typeBd;
        if(bdSelection === 'sql'){
        const connection = await createConnection();
        //const [rows] = await connection.promise().query('SELECT * FROM libros');
        const [rows] = await connection.promise().query('SELECT S.*,Portadas.nombre_imagen FROM ((SELECT * FROM libros WHERE ISBN = ?) AS S INNER JOIN Portadas ON Portadas.ISBN = S.ISBN)', [req.params.id]);

        connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros' });
        }
        return res.status(200).json({ message: 'Libros encontrados', libros: rows });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addLibro = async (req, res, next) => {
    try {

        const bdSelection = req.params.typeBd;
        console.log(bdSelection);
        if(bdSelection === 'sql'){
            const { ISBN, Titulo, Autor, Categoria, Descripcion } = req.body;
            const connection = await createConnection();
            const [rows] = await connection.promise().query('INSERT INTO libros (ISBN,Titulo,Autor,Categoria,Descripcion) VALUES (?, ?, ?, ?, ?)', [ISBN, Titulo, Autor, Categoria, Descripcion]);
            connection.end();
            console.log(rows);
            res.status(200).json({ message: 'Libro creado', libro: rows });
        };

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getLibrosIsbn = async (req, res) => {
    try {
        const connection = await createConnection();
        //const [rows] = await connection.promise().query('SELECT * FROM libros');
        const [rows] = await connection.promise().query('SELECT libros.ISBN,libros.Titulo,libros.Autor FROM `libros`');

        connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros' });
        }
        return res.status(200).json({ message: 'Libros encontrados', libros: rows });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




export const methods = {
    getLibrosTitulo,
    addLibro,
    getLibros,
    getLibroID,
    getLibrosIsbn
};

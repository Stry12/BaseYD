import mysql2 from 'mysql2';
import connectionConfig from '../database/connection.js';

const createConnection = async () => {
    return mysql2.createConnection(connectionConfig);
}

const registro= async (req,res) => {
    try {
        const {id,nombre,correo} = req.body;

        const connection = await createConnection();
        //const [rows] = await connection.promise().query('SELECT * FROM libros');
        const [rows] = await connection.promise().query('INSERT INTO usuarios (UserIdentification,NombreDeUsuario,CorreoElectronico) VALUES (?, ?, ?)', [id,nombre,correo]);

        connection.end();

        console.log(result);
        res.json(result);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros' });
        }
        return res.status(200).json({ message: 'Usuario registrado', libros: rows });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const methods = {
    registro
};
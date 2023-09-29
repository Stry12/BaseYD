import '../database/connection.js';
import mysql2 from 'mysql2';

const connectionConfig = {
    host: 'localhost' ,
    user:'root',
    password: '',
    database: 'marketbook'
};

const connection = await mysql2.createConnection({
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password,
    database: connectionConfig.database
});

const getLibros= async (req,res) => {
    try {
        const result = await connection.promise().query('SELECT * FROM libros');
        console.log(result);
        res.json(result);

    } catch(error) {  
        res.status(500).json({message: error.message});
    }
};

const getGeneral= async (req,res) => {
    try {
        const {id} = req.params;
        const querys = `SELECT * FROM ${id}`;
        const result = await connection.promise().query(querys);
        console.log(result);
        res.json(result);

    } catch(error) {  
        res.status(500).json({message: error.message});
    }
};

export const methods = {
    getLibros,
    getGeneral
};
import mysql2 from 'mysql2';
import connectionConfig from '../database/connection.js';

const createConnection = async () => {
    return mysql2.createConnection(connectionConfig);
}

const prueba1 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT usuarios.NombreDeUsuario, libros.Titulo FROM usuarios JOIN usuario_libro ON usuarios.UserIdentification = usuario_libro.UserIdentification JOIN libros ON usuario_libro.ISBN = libros.ISBN WHERE libros.Categoria IN ( ? , ? )', [req.params.genero1, req.params.genero2]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}
const prueba2 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT usuarios.NombreDeUsuario, libros.Titulo FROM usuarios JOIN usuario_libro ON usuarios.UserIdentification = usuario_libro.UserIdentification JOIN libros ON usuario_libro.ISBN = libros.ISBN WHERE libros.Categoria NOT IN ( ? , ? )',[req.params.genero1, req.params.genero2]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}
const prueba3 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT usuarios.NombreDeUsuario, libros.Titulo FROM usuarios JOIN usuario_libro ON usuarios.UserIdentification = usuario_libro.UserIdentification JOIN libros ON usuario_libro.ISBN = libros.ISBN WHERE EXISTS (SELECT 1 FROM reseña WHERE reseña.ISBN = ? )',[req.params.isbn]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}
const prueba4 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT usuarios.NombreDeUsuario, COUNT(*) AS LibrosPoseídos FROM usuarios JOIN usuario_libro ON usuarios.UserIdentification = usuario_libro.UserIdentification GROUP BY usuarios.UserIdentification HAVING LibrosPoseídos >= ?',[req.params.cantidad]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}

const prueba5 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT libros.Categoria, AVG(reseña.Estrellas) AS PromedioEstrellas FROM libros JOIN reseña ON libros.ISBN = reseña.ISBN GROUP BY libros.Categoria;');
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}
const prueba6 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT libros.Categoria, AVG(reseña.Estrellas) AS PromedioEstrellas FROM libros JOIN reseña ON libros.ISBN = reseña.ISBN GROUP BY libros.Categoria HAVING PromedioEstrellas >= ?',[req.params.prom]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}
const prueba7 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT publicaciones.UserIdentification, COUNT(chats.Id_publicaciones) AS CantidadMensajes FROM publicaciones JOIN chats ON publicaciones.Id_publicaciones = chats.Id_publicaciones GROUP BY publicaciones.UserIdentification;');
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}
const prueba8 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT publicaciones.UserIdentification, COUNT(chats.Id_publicaciones) AS CantidadMensajes FROM publicaciones JOIN chats ON publicaciones.Id_publicaciones = chats.Id_publicaciones GROUP BY publicaciones.UserIdentification HAVING CantidadMensajes >= ?',[req.params.cantidad]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}

const prueba9 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT categoria.Categoria, COUNT(libros.ISBN) AS CantidadLibros FROM categoria JOIN libros ON categoria.ISBN = libros.ISBN GROUP BY categoria.Categoria');
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}

const prueba10 = async(req,res) => {
    try {
        const connection = await createConnection();
        const [res_prueba] = await connection.promise().query('SELECT categoria.Categoria, COUNT(libros.ISBN) AS CantidadLibros FROM categoria JOIN libros ON categoria.ISBN = libros.ISBN GROUP BY categoria.Categoria HAVING CantidadLibros >= ?;',[req.params.cantidad]);
        console.log(res_prueba);
        
        return res.json(res_prueba);
    } catch (error) {
        
    }
}

export const methods = {
    prueba1,
    prueba2,
    prueba3,
    prueba4,
    prueba5,
    prueba6,
    prueba7,
    prueba8,
    prueba9,
    prueba10,
};
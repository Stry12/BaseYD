import mysql2 from 'mysql2';

const connectionConfig = {
    host: 'localhost' ,
    user:'root',
    password: '',
    database: 'marketbook'
};


const connection = mysql2.createConnection({
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password
})

connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`, (error) => {
    if (error) {
        console.log("Error al crear la base de datos");
        return;
    }

    console.log('Base de datos creada o ya existente');

    //Conexion a la base e datos
    connectionConfig.database = connectionConfig.database;

    //Cerra conexion temporal
    connection.end();
});

export default connection;


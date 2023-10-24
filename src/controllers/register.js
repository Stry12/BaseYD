import mysql2 from 'mysql2';
import connectionConfig from '../database/connection.js';

const createConnection = async () => {
    return mysql2.createConnection(connectionConfig);
}
const existeEmail = async (req,res) => {
    try {
        const connection = await createConnection();
        const [get_email] = await connection.promise().query('SELECT CorreoElectronico FROM usuarios WHERE CorreoElectronico LIKE ? ', [`%${req.params.text}%`]);
        connection.end();

        console.log(get_email);

        if (get_email.length == 0){
            return res.status(404).json({message: 'no se encontró el correo.'})
        }
        return res.status(200).json({message: 'correo encontrado.'})
       
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const setUser = async (req,res) => {
    
    try {
        console.log(req.body);
        const connection = await createConnection();
        const [getEmail] = await connection.promise().query('SELECT CorreoElectronico FROM usuarios WHERE CorreoElectronico LIKE ?', [req.body.email]);
        connection.end();

        if(getEmail.length != 0){
            return res.status(200).json({message: 'este correo ya posee una cuenta.'});
        }
        else{
            
        }

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}



export const RegisterMethods = {
    setUser
};
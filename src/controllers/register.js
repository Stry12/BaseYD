import mysql2 from 'mysql2';
import connectionConfig from '../database/connection.js';
import bcrypt from 'bcrypt';

const createConnection = async () => {
  return mysql2.createConnection(connectionConfig);
};

const existeEmail = async (req, res) => {
  try {
    const connection = await createConnection();
    const [get_email] = await connection
      .promise()
      .query('SELECT CorreoElectronico FROM usuarios WHERE CorreoElectronico LIKE ? ', [
        `%${req.params.text}%`
      ]);
    connection.end();

    console.log(get_email);

    if (get_email.length === 0) {
      return res.status(404).json({ message: 'No se encontró el correo.' });
    }
    return res.status(200).json({ message: 'Correo encontrado.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const setUser = async (req, res) => {
  try {
    console.log(req.body);
    const connection = await createConnection();

    // Verificar si el correo ya existe
    const [getEmail] = await connection
      .promise()
      .query('SELECT CorreoElectronico FROM usuarios WHERE CorreoElectronico LIKE ?', [
        req.body.email
      ]);

    if (getEmail.length !== 0) {
      connection.end();
      return res.status(200).json({ message: 'Este correo ya posee una cuenta.' });
    }

    // Si el correo no existe, proceder con la inserción
    const { name, email, password } = req.body;

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10); // Número de rondas de hashing

    // Realiza la inserción en la base de datos
    const [result] = await connection
      .promise()
      .query('INSERT INTO usuarios (NombreDeUsuario, CorreoElectronico, Contraseña) VALUES (?, ?, ?)', [
        name,
        email,
        hashedPassword
      ]);

    connection.end();

    // Verifica si la inserción fue exitosa
    if (result.affectedRows === 1) {
      return res.status(201).json({ message: 'Registro exitoso.' });
    } else {
      return res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const RegisterMethods = {
  setUser,
  existeEmail
};


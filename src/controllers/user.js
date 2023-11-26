import connectionConfig from '../database/connection.js';
import mysql2 from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createConnection = async () => {
  return mysql2.createConnection(connectionConfig);
}


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
    console.log(req.body);
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
      const plainPassword = password;
      const saltRounds = 10; // Número de rondas para el algoritmo de hash (mayor número, mayor seguridad)
      
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      
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

      connection.end();
    }
};

const getCuenta = async (req, res) => {
  try {
    const connection = await createConnection();
    const { NombreDeUsuario, password } = req.body;

    // Buscar al usuario en la base de datos por nombre de usuario
    const [rows] = await connection.promise().query('SELECT * FROM usuarios WHERE NombreDeUsuario = ?', [
      NombreDeUsuario,
    ]);

    if (rows.length > 0) {
      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      const contraseñaCorrecta = await bcrypt.compare(password, rows[0].Contraseña);

      if (contraseñaCorrecta) {

        const UserForToken = {
          id: rows[0].ID,
          username: rows[0].NombreDeUsuario,
        };
        const token = jwt.sign(UserForToken, 'salvador', {expiresIn: '1m'});
        const [updateResult] = await connection
        .promise()
        .query('UPDATE usuarios SET Token = ?, ExpiracionToken = ? WHERE ID = ?', [
          token,
          new Date(Date.now() + 60), // Expire in 1 min
          rows[0].ID,
      ]);
      
        // Verificar si la actualización fue exitosa
        console.log('Update Result:', updateResult);

        // Las credenciales son correctas
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
        console.log(token);
          
      } else {
        // La contraseña es incorrecta
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } else {
      // El usuario no existe
      res.status(404).json({ error: 'Usuario no encontrado'});
    }

    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  jwt.verify(token.replace('Bearer ', ''), 'salvador', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
    }

    // Verifica si el token ha expirado
    if (new Date() > new Date(decoded.exp * 1000)) {
      return res.status(401).json({ error: 'Acceso no autorizado. Token expirado.' });
    }

    req.usuario = decoded; // Agrega la información del usuario a la solicitud
    next();
  });
};


export {
  setUser,
  getCuenta,
  existeEmail,
  verificarToken,
}
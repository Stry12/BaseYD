import mongoose from 'mongoose';
import values from '../const/conts.js';

mongoose.connect(values.URI_MONGO, {}).catch(err => {
    console.error("Error de conexión: ", err);
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Conexión establecida mongo");
});

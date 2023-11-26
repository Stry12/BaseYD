import mongoose from 'mongoose';
import values from '../const/conts.js';

const uriMongolocal = values.URI_MONGO;

mongoose.connect(uriMongolocal).catch(err => {
    console.error("Error de conexión: ", err);
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Conexión establecida mongo");
});

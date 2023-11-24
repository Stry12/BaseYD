import mongoose from "mongoose";
const { Schema, model } = mongoose;

const publicacionSchema = new Schema({
    id_publicacion: {
        type: String,
        required: true,
        unique: true
    },
    id_usuario: {
        type: String,
        required: true,
        unique: false
    },
    estado: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    fotos:{
        type: Array,
        required: false
    },
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});

export default model('Publicacion', publicacionSchema);
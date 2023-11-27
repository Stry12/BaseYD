import mongoose from "mongoose";
const { Schema, model } = mongoose;

const publicacionSchema = new Schema({
    id_usuario: {
        type: String,
        required: true,
        unique: false
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    condition: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: false
    },
    ubicacion: {
        type: String,
        required: false
    },
    images:{
        type: Array,
        required: false
    },
    isbn: {
        type: String,
        required: false
    },
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});

export default model('Publicacion', publicacionSchema, 'publicaciones');
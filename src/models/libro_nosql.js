import mongoose from "mongoose";
const { Schema, model } = mongoose;

const libroSchema = new Schema({
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    Titulo: {
        type: String,
        required: true,
        unique: false
    },
    Autor: {
        type: String,
        required: true
    },
    Categoria: {
        type: String,
        required: true
    },
    Descripción: {
        type: String,
        required: true
    },
    imagen: {
        type: Array,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});

export default model('Libro', libroSchema);
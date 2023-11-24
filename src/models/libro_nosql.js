import mongoose from "mongoose";
const { Schema, model } = mongoose;

const libroSchema = new Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true,
        unique: false
    },
    autor: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descripción: {
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
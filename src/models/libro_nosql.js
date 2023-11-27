import mongoose from "mongoose";
const { Schema, model } = mongoose;

const libroSchema = new Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: false
    },
    coverImage: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});

export default model('Libro', libroSchema, 'libros');
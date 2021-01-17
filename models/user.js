const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    cedula: {
        type: String,
        unique: true
    },
    rol: {
        type: String
    },
    telefono: {
        type: String
    },
    genero: {
        type: String
    },
    direccion: {
        type: String
    },
    codigoPostal: {
        type: String
    },
    especialidad: {
        type: String
    },
    fechaDeRegistro: {
        type: String
    },
    estado: {
        type: String
    },
    pacientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PacienteSchema',
        // citas: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'CitaSchema'
        // }]
    }]
},

    { collection: 'user' }
    
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
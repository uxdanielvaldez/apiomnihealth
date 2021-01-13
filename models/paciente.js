const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    identificacion: {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    fechaDeNacimiento: {
        type: Date
    },
    genero: {
        type: String
    },
    correoElectronico: {
        type: String
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    user_creation: {
        type: String
    },
    citas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CitaSchema'
    }]
},

    { collection: 'paciente' }
)

const model = mongoose.model('PacienteSchema', PacienteSchema)

module.exports = model
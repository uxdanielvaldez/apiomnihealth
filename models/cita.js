const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    apellido: {
       type: String 
    },
    correoElectronico: {
        type: String
    },
    identificacion: {
        type: String
    },
    fecha: {
        type: String
    },
    hora: {
        type: String
    },
    motivo: {
        type: String
    },
    notas: {
        type: String
    },
    meeting: {
        type: String
    },
    estado: {
        type: Boolean
    },
    user_creation: {
        type: String
    }
},

    { collection: 'cita' }
)

const model = mongoose.model('CitaSchema', CitaSchema);

module.exports = model;
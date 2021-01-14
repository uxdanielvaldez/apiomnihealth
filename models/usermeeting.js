const mongoose = require('mongoose')

const UserMeetingSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    estado: {
        type: String
    },
    referencia: {
        type: String
    },
    sala: {
        type: String
    }

},
    {collection: 'usermeeting'}
)

const model = mongoose.model('UserMeetingSchema', UserMeetingSchema)

module.exports = model
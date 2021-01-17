const mongoose = require('mongoose');

const LogMeetingSchema = new mongoose.Schema({
    username: {
        type: String
    },
    fecha: {
        type: String
    },
    api: {
        type: String
    },
    referencia: {
        type: String
    }
},

    { collection: 'logmeeting' }
    
)

const model = mongoose.model('LogMeetingSchema', LogMeetingSchema);

module.exports = model;
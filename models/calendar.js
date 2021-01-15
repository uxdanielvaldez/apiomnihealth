const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    title: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
    user_creation: {
        type: String
    }
},

    { collection: 'calendar' }
)

const model = mongoose.model('CalendarSchema', CalendarSchema);

module.exports = model;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const presentationModel = new Schema({
    presentation_description: {
        type: String,
        required: true
    },
    presentation_venue: {
        type: String,
        required: true
    },
    presentation_commetti: {
        type: Schema.Types.ObjectId,
    },
    presentation_date: {
        type: Schema.Types.Date,
        required: true
    },
    presentation_time: {
        type: Schema.Types.String,
        required: true
    },
    presentation_status: {
        type: String,
        default: 'pending'
    },
    student_id: {
        type: Schema.Types.ObjectId,
    },
    supervisor_id: {
        type: Schema.Types.ObjectId,
    }
})

const presentation = mongoose.model('presentation', presentationModel)
module.exports = presentation

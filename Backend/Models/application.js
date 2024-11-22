const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationModel = new Schema({
    student_id: {
        type: Schema.Types.ObjectId
    },
    teacher_id: {
        type: Schema.Types.ObjectId
    },
    teacher_role: {
        type: Schema.Types.String
    },
    pdf_id: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const application = mongoose.model('application', applicationModel)
module.exports = application

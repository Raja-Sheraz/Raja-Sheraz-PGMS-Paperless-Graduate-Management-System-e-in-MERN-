const mongoose = require('mongoose')
const { Schema } = mongoose

const reportSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId
    },
    report_identifier: {
        type: Schema.Types.String
    },
    Content: {
        type: Schema.Types.String
    },
    time: {
        text: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
})

const report = mongoose.model('report', reportSchema)

module.exports = report

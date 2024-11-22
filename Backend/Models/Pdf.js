const mongoose = require('mongoose')
const { Schema } = mongoose

const pdfSchema = new Schema({
    pdfName: String,
    status: {
        type: String,
        enum: [
            'Approved',
            'Pending',
            'Modify',
            'Reject',
            'forward to dean',
            'sent to deen',
            'accepted by dean',
            'rejected by dean',
            'modify by dean'
        ],
        default: 'Pending'
    },
    student_id: {
        type: Schema.Types.ObjectId
    },
    teacher_id: {
        type: Schema.Types.ObjectId
    },
    teacher_role: {
        type: Schema.Types.String
    },
    pdf_type: {
        type: String
    },
    document_name: {
        type: String
    },
    report_identifier: {
        type: String
    },
    submitted_first: {
        type: String,
        default: 'false'
    },
    reason: {
        type: String
    },
    forwarded_by: String,
    time: {
        text: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
})

const Pdf = mongoose.model('Pdf', pdfSchema)

module.exports = Pdf

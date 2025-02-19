const mongoose = require('mongoose')
const { Schema } = mongoose

const TeacherSchema = new Schema({
    name: String,
    cnic: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    address: String,
    email: {
        type: String,
        unique: true
    },
    qualification: String,
    department: String,
    gender: String,
    password: String,
    role: { type: Array, default: null },
    students: [{ type: Schema.Types.ObjectId, ref: 'StudentRegistration' }],
    image_name: {
        type: String
    }
})

const userModel = mongoose.model('teacherRegistration', TeacherSchema)
module.exports = userModel

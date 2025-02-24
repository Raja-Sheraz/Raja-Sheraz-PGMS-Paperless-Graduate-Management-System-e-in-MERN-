const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    cnic: {
        type: String,
        unique: true
    },
    reg_no: {
        type: String,
        default: null
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
    regNo:{
        type: String,
        unique: true
    },
    department: String,
    gender: String,
    password: String,

    // image:String,
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'teacherRegistration' // Reference to the Teacher schema
    },
    proposal_status: {
        type: String
    },
    pdf: {
        type: Schema.Types.ObjectId,
        ref: 'Pdf'
    },
    image_name: {
        type: String
    },
    commetti_id: {
        type: Schema.Types.ObjectId
    },
    commetti_acceptence: String,
    dac_acceptence: String,
    dean_acceptence: String,
    dean_accepted_document: Schema.Types.ObjectId
})

const userModel = mongoose.model('StudentRegistration', userSchema)
module.exports = userModel

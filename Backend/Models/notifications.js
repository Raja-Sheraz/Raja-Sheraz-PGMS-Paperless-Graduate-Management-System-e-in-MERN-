const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationModel = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    notification_text: {
        type: String,
        required: true
    },
    notification_status: {
        type: String,
        default: 'unread'
    }
})

const notification = mongoose.model('notification', notificationModel)
module.exports = notification

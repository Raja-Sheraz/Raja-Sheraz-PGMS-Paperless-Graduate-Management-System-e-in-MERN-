const express = require('express')
const router = express.Router()
const supervisorController = require('../Controller/supervisorController')
const pdf = require('../Models/Pdf')
const deanController = require('../Controller/deanController')

const multer = require('multer')

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination directory where the uploaded files will be stored
        cb(null, 'user_images/')
    },
    filename: function (req, file, cb) {
        // Define the filename for the uploaded file
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/send_to_dean', deanController.sendtodean)

router.post('/dean_approve', deanController.deanaccept)
router.post('/dean_reject', deanController.deanreject)
router.post('/dean_modify', deanController.deanmodify)

router.post('/get_dean_message', deanController.getdeanmessage)

module.exports = router

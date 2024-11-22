const express = require('express')
const multer = require('multer')
const path = require('path')
const StudentData = require('../Models/studentRegister')
const Pdf = require('../Models/Pdf')
const student = require('../Models/studentRegister')
const supervision = require('../Models/supervision')
const presentation = require('../Models/presentation')
const teacherData = require('../Models/TeacherRegister')
const commettiData = require('../Models/commetti')
const router = express.Router()

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/get_all_presentations', async (req, res) => {
    try {
        const result = await presentation.find()
        res.status(200).json(result)
    } catch (e) {}
})

router.post('/add_new_presentation', async (req, res) => {
    try {
        new presentation({
            presentation_description: req.body.presentationdescription,
            presentation_commetti: req.body.presentationcommetti,
            presentation_date: req.body.presentationdate,
            presentation_time: req.body.presentationtime,
            presentation_venue: req.body.presentationvenue
        }).save()

        res.status(200).json({ result: 'Sav' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/delete_presentation', async (req, res) => {
    try {
        let data = await presentation.findOneAndDelete({
            _id: req.body._id
        })
        res.status(200).json({ result: 'deleted' })
    } catch (err) {}
})

router.post('/complete_presentation', async (req, res) => {
    try {
        await presentation.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                presentation_status: 'completed'
            }
        )
        res.status(200).json({ result: 'Completed' })
    } catch (err) {}
})

router.post('/get_presentation_schedules', async (req, res) => {
    try {
        if (req.body.role == 'Supervisor' || req.body.role == 'CoordinateCommitte') {
            let teacher = await teacherData.find({ _id: req.body._id })
            if (teacher) {
                let commetties = await commettiData.find()

                let requiredcommetti = []

                commetties.map((item) => {
                    item.commetti_members.map((member) => {
                        if (member == req.body._id) {
                            requiredcommetti.push(item._id)
                        }
                    })
                })

                let presentationdata = []

                // Map over requiredcommetti and create an array of Promises
                let promises = requiredcommetti.map(async (item) => {
                    let pre = await presentation.find({
                        presentation_commetti: item,
                        presentation_status: 'pending'
                    })
                    return pre
                })

                // Wait for all Promises to resolve
                Promise.all(promises)
                    .then((results) => {
                        // Once all Promises are resolved, populate presentationdata
                        presentationdata = results
                        // Send response
                        res.json(presentationdata[0])
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error('Error:', error)
                        res.status(500).json({ error: 'Internal Server Error' })
                    })
            } else {
                res.json({ result: 'null' })
            }
        } else {
            let student = await StudentData.find({ _id: req.body._id })
            if (student[0].commetti_id) {
                let presentationdata = await presentation.find({
                    presentation_commetti: student[0].commetti_id,
                    presentation_status: 'pending'
                })
                res.json(presentationdata)
            } else {
                res.json({ result: 'null' })
            }
        }
    } catch (e) {
        res.json([])
    }
})
router.post('/get_meetings', async (req, res) => {
    try {
        console.log(req.body)
        let data = []
        if (req.body.role) {
            data = await presentation.find(
                {
                    supervisor_id: req.body._id
                }
            )

        }
        else {
            data = await presentation.find(
                {
                    student_id: req.body._id
                }
            )
        }

        res.status(200).json(data)
    } catch (err) {

    }
})

module.exports = router

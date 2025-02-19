// routes/pdfRoutes.js
const express = require('express')
const multer = require('multer')
const path = require('path')
const StudentData = require('../Models/studentRegister')
const Pdf = require('../Models/Pdf')
const student = require('../Models/studentRegister')
const supervision = require('../Models/supervision')
const report = require('../Models/Report')
const router = express.Router()
const TeacherData = require('../Models/TeacherRegister')
const { now } = require('mongoose')

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

// Create a new PDF with file upload
router.post('/pdf', upload.single('pdfFile'), async (req, res) => {
    try {
        const pdf = new Pdf({
            pdfName: req.file.filename, // Use req.file.filename instead of filename
            comments: req.body.comments || []
        })

        // If a file is uploaded, you can handle it here
        if (req.file) {
            // Assuming the file is stored in /tmp/my-uploads
            // You can modify the path accordingly based on your needs
            pdf.file = req.file.path
        }

        const savedPdf = await pdf.save()
        res.json(savedPdf)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

//Students Add a Pdf
router.post('/Student-pdf', upload.single('pdfFile'), async (req, res) => {
    try {
        const studentId = req.body.studentId

        let teacher = await TeacherData.find({ _id: req.body.supervisor_id })

        if (!studentId && req.file) {
            return res.status(400).json({ error: 'Student ID is required' })
        }

        // console.log(req.body);

        const randomString = generateRandomString(24)
        const pdf = new Pdf({
            pdfName: req.file.filename,
            pdf_type: req.body.pdf_type ? req.body.pdf_type : 'proposal',
            student_id: studentId,
            teacher_id: req.body.supervisor_id,
            document_name: req.body.document_name,
            teacher_role: req.body.teacher_role,
            report_identifier: randomString,
            submitted_first: 'true'
        })

        if (req.body.pdf_type != 'paper') {
            student.findOneAndUpdate(
                { _id: studentId },
                {
                    proposal_status: 'pending'
                }
            )
            const currentDateTime = new Date()
            console.log(currentDateTime.toString())

            await report.create({
                student_id: studentId,
                report_identifier: randomString,
                Content: `Submitted proposal to ${teacher[0].name} (Supervisor) [${currentDateTime.toString()}]`
            })
        }

        const savedPdf = await pdf.save()

        res.json({
            message: 'PDF created and associated with the student successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//update pdf file////////////////////////////////////////////////////////////////////////////////////
router.post('/update_pdf_file', upload.single('pdfFile'), async (req, res) => {
    try {
        console.log(req.file.filename)
        await Pdf.findOneAndUpdate(
            {
                _id: req.body.pdf_id
            },
            {
                pdfName: req.file.filename,
                status: 'modified'
            }
        )

        res.status(200).json({
            message: 'Success'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//update pdf
router.put('/pdf/:id', upload.single('pdfFile'), async (req, res) => {
    try {
        const pdfId = req.params.id
        const pdf = await Pdf.findById(pdfId)

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' })
        }

        // Update PDF properties
        pdf.pdfName = req.file.filename

        // Update the file if a new one is provided
        if (req.file) {
            pdf.file = req.file.path
        }

        const updatedPdf = await pdf.save()
        res.json(updatedPdf)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
// add Comments
router.post('/pdf/:pdfId/comments', async (req, res) => {
    try {
        const { pdfId } = req.params
        const { text } = req.body

        if (!text) {
            return res.status(400).json({ error: 'Comment text is required' })
        }

        const pdf = await Pdf.findById(pdfId)

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' })
        }

        // Add the new comment to the comments array
        pdf.comments.push({
            text: text,
            timestamp: Date.now()
        })

        // Save the updated PDF
        const updatedPdf = await pdf.save()

        res.json({ message: 'Comment added successfully', pdf: updatedPdf })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//update status
router.put('/pdf/:pdfId/status', async (req, res) => {
    try {
        const { pdfId } = req.params
        const { status } = req.body

        if (!status) {
            return res.status(400).json({ error: 'Status is required' })
        }

        const pdf = await Pdf.findById(pdfId)

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' })
        }

        if (!Pdf.schema.path('status').enumValues.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' })
        }
        // Update the status of the PDF
        pdf.status = status

        // Save the updated PDF
        const updatedPdf = await pdf.save()

        res.json({ message: 'Status updated successfully', pdf: updatedPdf })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
router.put('/pdf/:pdfId/feedback', async (req, res) => {
    try {
        const { pdfId } = req.params
        const { feedbackText } = req.body

        if (!feedbackText) {
            return res.status(400).json({ error: 'Feedback text is required' })
        }

        const pdf = await Pdf.findById(pdfId)

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' })
        }

        // Update the feedback in the PDF
        pdf.feedback = {
            text: feedbackText,
            timestamp: new Date()
        }

        // Save the updated PDF
        const updatedPdf = await pdf.save()

        res.json({ message: 'Feedback added successfully', pdf: updatedPdf })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Get all PDFs
router.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await Pdf.find()
        res.json(pdfs)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
// Get pdf by ID
router.get('/pdf/:id', async (req, res) => {
    try {
        const pdf = await Pdf.findById(req.params.id)
        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' })
        }
        return res.json(pdf)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

//get pdf by id

router.post('/get_pdf_by_id', async (req, res) => {
    try {
        let data = await Pdf.find({
            _id: req.body._id
        })
        console.log(data)
        res.json(data[0])
    } catch (err) {}
})

router.post('/delete_pdf_by_id', async (req, res) => {
    try {
        await Pdf.findOneAndDelete({
            _id: req.body._id
        })
        res.status(200).json({ result: 'deleted' })
    } catch (err) {
        res.status(500).json({ result: 'error' })
    }
})

router.post('/delete_pdf', async (req, res) => {
    try {
        result = await Pdf.findOneAndDelete({
            _id: req.body._id
        })
        res.status(200).json({ result: 'deleted' })
    } catch (err) {
        res.status(500).json({ result: 'error' })
    }
})

router.post('/upload_pdf', upload.single('pdfFile'), async (req, res) => {
    try {
        res.json(req.file.filename)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router

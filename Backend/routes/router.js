const express = require('express')
const router = new express.Router()
const nodemailer = require('nodemailer')
const cors = require('cors')
const StudentData = require('../Models/studentRegister')
const TeacherData = require('../Models/TeacherRegister')
const supervision = require('../Models/supervision')
const comment = require('../Models/comment')
const pdf = require('../Models/Pdf')
const report = require('../Models/Report')
const Pdf = require('../Models/Pdf')
const notification = require('../Models/notifications')
const commetti = require('../Models/commetti')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

// router.post('/emailsend', (req, res) => {
//     const { email, password } = req.body

//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         })
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: 'Hello! Your PGMS Account Password',
//             html: `<h3>Your Account Password is Given Below </h3><br></br>
//       <h3>User Name:${email}</h3>\n
//       <h3>Password:${password}</h3>`
//         }
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log('Error', error)
//             } else {
//                 console.log('Success' + info.response)
//                 res.status(201).json({ status: 201, info })
//             }
//         })
//     } catch (error) {
//         res.status(401).json({ status: 401, error })
//     }
// })
router.post('/emailsend', async (req, res) => {
    const { email, password } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Hello! Your PGMS Account Password',
            html: `<h3>Your Account Password is Given Below </h3><br></br>
                   <h3>User Name: ${email}</h3>
                   <h3>Password: ${password}</h3>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(201).json({ status: 201, info });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 500, error: 'Failed to send email' });
    }
});

router.post('/get_user_by_id', async (req, res) => {
    let data = ''

    switch (req.body.type) {
        case 'student':
            data = StudentData.find({ _id: req.body._id })
            console.log(data)
            // res.json(data);
            break
        case 'teacher':
            data = TeacherData.find({ _id: req.body._id })
            console.log(data)
            // res.json(data);
            break
    }
})

router.post('/get_comments_on_pdf', async (req, res) => {
    try {
        let data = await comment.find({
            pdf_id: req.body._id
        })
        res.status(200).json(data)
    } catch (err) { }
})

router.get('/get_document_to_forward_deen', async (req, res) => {
    try {
        let data = await pdf.find({
            $or: [
                { status: 'forward to dean' },
                { status: 'accepted by dean' },
                { status: 'rejected by dean' },
                { status: 'modify by dean' },
                { status: 'sent to dean' }
            ]
        })
        console.log(data)
        res.json(data)
    } catch (err) { }
})

router.post('/get_students_with_name', async (req, res) => {
    try {
        const name = req.body.student_name
        const data = await StudentData.find({ name: { $regex: name, $options: 'i' } })
        res.status(200).json(data)
    } catch (err) { }
})

router.post('/get_student_proposals', async (req, res) => {
    try {
        const student_id = req.body.student_id
        const data = await Pdf.find({ student_id: student_id, pdf_type: 'proposal', submitted_first: 'true' })
        res.status(200).json(data)
    } catch (err) { }
})

router.post('/get_report', async (req, res) => {
    res.json(await report.find({ report_identifier: req.body.report_identifier }))
})

router.post('/get_notifications', async (req, res) => {
    res.json(await notification.find({ user_id: req.body.user_id, notification_status: 'unread' }))
})

router.post('/mark_notification_as_read', async (req, res) => {
    try {
        const notification_data = await notification.findOneAndUpdate(
            { _id: req.body.id },
            { notification_status: 'read' }
        )
        res.json({ message: 'read', notification_id: notification_data._id })
    } catch (e) { }
})


router.post('/get_comments_for_commetti_members', async (req, res) => {
    try {
        let pdfData = await pdf.find({
            _id: req.body.pdf_id
        });

        let student = await StudentData.find({
            _id: pdfData[0].student_id
        });

        let commettiData = await commetti.find({
            _id: student[0].commetti_id
        });


        const results = await Promise.all(commettiData[0].commetti_members.map(async (item) => {
            const cdata = await comment.find({ teacher_id: item });

            return cdata; // Return the comments data
        }));

        const flattenedResults = results.flat();

        return res.json(flattenedResults);


    }
    catch (e) {
        return res.json(e);
    }
})

module.exports = router

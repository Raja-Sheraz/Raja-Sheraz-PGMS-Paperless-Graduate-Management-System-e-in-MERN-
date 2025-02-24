const express = require('express')
const router = express.Router()
const supervisorController = require('../Controller/supervisorController')
const pdf = require('../Models/Pdf')
const commetti = require('../Models/commetti')
const teacherData = require('../Models/TeacherRegister')
const studentData = require('../Models/studentRegister')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const report = require('../Models/Report')
// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination directory where the uploaded files will be stored
        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
        // Define the filename for the uploaded file
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/get_all_commetties', async (req, res) => {
    try {
        let result = await commetti.find()
        res.json(result)
    } catch (err) {}
})

router.get('/get_commettie/:department', async (req, res) => {
    try {
        let data = await teacherData.find({
            department: req.params.department,
            role: { $in: ['CoordinateCommitte'] }
        })

        res.json(data)
    } catch (err) {}
})

router.post('/add_new_commetti', async (req, res) => {
    try {
        let teachers = []

        req.body.teachers.map((teacher) => {
            teachers.push(teacher.teacher_id)
        })
        new commetti({
            commetti_title: req.body.title,
            commetti_department: req.body.department,
            commetti_members: teachers,
            commetti_head: req.body.commetti_head
        }).save()

        res.json({ result: 'added' })
    } catch (err) {}
})

router.post('/delete_commetti', async (req, res) => {
    try {
        let data = await studentData.find({
            commetti_id: req.body._id
        })

        if (data.length > 0) {
            res.json({ result: 'not-deleted', students: data })
        } else {
            await commetti.findOneAndDelete({
                _id: req.body._id
            })
            res.json({ result: 'deleted' })
        }
    } catch (err) {}
})

router.post('/get_studets_with_commetti_id', async (req, res) => {
    try {
        let data = await studentData.find({
            commetti_id: req.body._id
        })
        res.json(data)
    } catch (err) {}
})

router.post('/get_commetti_with_id', async (req, res) => {
    try {
        let data = await commetti.find({
            _id: req.body._id
        })
        res.json(data)
    } catch (err) {}
})

router.post('/get_all_papers', async (req, res) => {
    console.log(req.body)
    try {
        let data = []
        switch (req.body.user_type) {
            case 'student':
                data = await pdf.find({
                    student_id: req.body._id,
                    teacher_role: req.body.teacher_role,
                    pdf_type: { $in: ['application', 'paper', 'proposal'] }
                })
                res.json(data)
                break

            case 'teacher':
                data = await pdf.find({
                    teacher_id: req.body._id,
                    teacher_role: req.body.teacher_role,
                    pdf_type: { $in: ['application', 'paper', 'proposal'] }
                })
                res.json(data)
                break
        }
    } catch (err) {}
})

router.post('/forward_to_commetti', async (req, res) => {
    try {
        let pdfdata = await pdf.find({
            _id: req.body.pdf_id
        })

        let commetti_id = await studentData.find({
            _id: pdfdata[0].student_id
        })

        let listofteaches = await commetti.find({
            _id: commetti_id[0].commetti_id
        })

        //forwarded by teacher
        let teacher_data = await teacherData.find({
            _id: req.body.supervisor_id
        })

        listofteaches[0].commetti_members.map(async (item) => {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz'
            let randomName = ''
            for (let i = 0; i < 15; i++) {
                const randomIndex = Math.floor(Math.random() * alphabet.length)
                randomName += alphabet[randomIndex]
            }
            // fs.copyFile(`files/${pdfdata[0].pdfName}`,`files/copiedfile.pdf`,())
            const sourceFilePath = path.join(__dirname, '..', 'files', `${pdfdata[0].pdfName}`)
            const destinationFilePath = path.join(__dirname, '..', 'files', randomName + '.pdf')

            // Read the PDF file
            fs.readFile(sourceFilePath, (err, data) => {
                if (err) {
                    console.error('Error reading file:', err)
                    return
                }

                // Write the PDF file with a new name
                fs.writeFile(destinationFilePath, data, (err) => {
                    if (err) {
                        console.error('Error writing file:', err)
                        return
                    }
                    console.log('File copied successfully!')
                })
            })

            await new pdf({
                pdfName: randomName + '.pdf',
                status: 'Pending',
                student_id: pdfdata[0].student_id,
                teacher_id: item,
                pdf_type: pdfdata[0].pdf_type,
                document_name: pdfdata[0].document_name,
                teacher_role: 'CoordinateCommitte',
                forwarded_by: `${teacher_data[0].name} (Supervisor) to (Coordinate Commetti)`,
                report_identifier: pdfdata[0].report_identifier
            }).save()

            const report_identifier = pdfdata[0].report_identifier
            const currentDateTime = new Date()
            const td = await teacherData.find({ _id: item })
            const old_report = await report.find({ report_identifier: report_identifier })
            const result = await report.findOneAndUpdate(
                { report_identifier: report_identifier },
                {
                    Content:
                        old_report[0].Content +
                        '\n\n' +
                        `Proposal forwarded by ${teacher_data[0].name}(Supervisor) to ${
                            td[0].name
                        } (Commetti Member) [${currentDateTime.toString()}]`
                }
            )
        })

        res.status(200).json({ status: 'forwarded' })
    } catch (err) {
        res.status(401).json({ status: 'error forwarding' })
    }
})

router.post('/get_students_count_with_papers', async (req, res) => {
    try {
        const pending_students = await pdf.find({ teacher_id: req.body._id, status: 'Pending' })
        const approved_students = await pdf.find({ teacher_id: req.body._id, status: 'approved' })
        const rejected_students = await pdf.find({ teacher_id: req.body._id, status: 'rejected' })
        const tomodify_students = await pdf.find({ teacher_id: req.body._id, status: 'modify' })
        const modified_students = await pdf.find({ teacher_id: req.body._id, status: 'modified' })

        res.json({
            pending_students: pending_students.length,
            approved_students: approved_students.length,
            rejected_students: rejected_students.length,
            tomodify_students: tomodify_students.length,
            modified_students: modified_students.length
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/get_commetti_detail_with_commetti_id', async (req, res) => {
    try {
        const result = await commetti.find({ _id: req.body.commetti_id })
        res.status(200).json(result)
    } catch (e) {}
})
router.post('/get_studets_with_commetti_teacher_id', async (req, res) => {
    try {

        let cid = '';
        let commettis = await commetti.find();
        commettis.map((comm) => {
            comm.commetti_members.map((member) => {
                if (member == req.body._id) {
                    cid = comm._id;
                }
            })
        })

        console.log(cid)
        let student_data = await studentData.find({
            'commetti_id': cid
        })
        res.json(student_data);
        } catch (e) {

        }
    })

    router.post('/get_commetti_members', async (req, res) => {
        try {
            let pdfData = await pdf.find({
                _id: req.body.pdf_id
            });
    
            let student = await studentData.find({
                _id: pdfData[0].student_id
            });
    
            let commettiData = await commetti.find({
                _id: student[0].commetti_id
            });

            res.status(200).json({'head':commettiData[0].commetti_head})
        } catch (e) {}
    })

module.exports = router

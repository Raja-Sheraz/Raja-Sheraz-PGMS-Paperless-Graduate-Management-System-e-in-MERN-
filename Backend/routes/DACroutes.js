const express = require('express')
const router = express.Router()
const supervisorController = require('../Controller/supervisorController')
const pdf = require('../Models/Pdf')
const commetti = require('../Models/commetti')
const teacherData = require('../Models/TeacherRegister')
const studentData = require('../Models/studentRegister')
const multer = require('multer')
const dac = require('../Models/dac')
const path = require('path')
const fs = require('fs')
const report = require('../Models/Report')

router.get('/get_dac/:department', async (req, res) => {
    try {
        let data = await teacherData.find({
            department: req.params.department,
            role: { $in: ['DAC'] }
        })

        res.json(data)
    } catch (err) {}
})

router.post('/add_new_dac', async (req, res) => {
    try {
        let teachers = []

        req.body.teachers.map((teacher) => {
            teachers.push(teacher.teacher_id)
        })

        new dac({
            dac_title: req.body.title,
            dac_department: req.body.department,
            dac_members: teachers,
            dac_head: req.body.dac_head
        }).save()

        res.json({ result: 'added' })
    } catch (err) {}
})

router.get('/get_all_dacs', async (req, res) => {
    try {
        const data = await dac.find()
        res.json(data)
    } catch (err) {}
})

router.post('/delete_dac', async (req, res) => {
    try {
        await dac.findOneAndDelete({
            _id: req.body._id
        })
        res.json({ result: 'deleted' })
    } catch (err) {}
})

router.post('/forward_to_dac', async (req, res) => {
    try {
        let pdfdata = await pdf.find({
            _id: req.body.pdf_id
        })

        let listofteaches = await dac.find({
            _id: req.body.dac_id
        })

        //forwarded by teacher
        let teacher_data = await teacherData.find({
            _id: req.body.commetti_member_id
        })
        const report_identifier = pdfdata[0].report_identifier
        listofteaches[0].dac_members.map(async (item) => {
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
                teacher_role: 'DAC',
                forwarded_by: `${teacher_data[0].name} ('Coordinate Commetti') to (DAC))`,
                report_identifier: report_identifier
            }).save()

            const currentDateTime = new Date()
            const td = await teacherData.find({ _id: item })
            const old_report = await report.find({ report_identifier: report_identifier })
            const result = await report.findOneAndUpdate(
                { report_identifier: report_identifier },
                {
                    Content:
                        old_report[0].Content +
                        '\n\n' +
                        `Proposal forwarded by ${teacher_data[0].name}(Commetti Member) to ${
                            td[0].name
                        } (DAC) [${currentDateTime.toString()}]`
                }
            )
        })

        await studentData.findOneAndUpdate(
            {
                _id: pdfdata[0].student_id
            },
            {
                commetti_acceptence: 'accepted'
            }
        )
        const old_report = await report.find({ report_identifier: report_identifier })
        const currentDateTime = new Date()
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content:
                    old_report[0].Content + '\n\n' + `Proposal Accepted by commetti [${currentDateTime.toString()}]`
            }
        )

        res.status(200).json({ status: 'forwarded' })
    } catch (err) {
        console.log(err)
        res.status(401).json({ status: 'error forwarding' })
    }
})

module.exports = router

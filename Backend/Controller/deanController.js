const StudentData = require('../Models/studentRegister')
const TeacherData = require('../Models/TeacherRegister')
const supervision = require('../Models/supervision')
const pdf = require('../Models/Pdf')
const comment = require('../Models/comment')
const dac = require('../Models/dac')
const report = require('../Models/Report')
const notification = require('../Models/notifications')

exports.sendtodean = async (req, res) => {
    try {
        let dean = await TeacherData.find({ role: 'dean' })
        const document = req.body.document

        const pdfData = await pdf.findOneAndUpdate(
            { _id: document._id },
            {
                teacher_id: dean[0]._id,
                status: 'sent to dean',
                teacher_role: 'dean'
            }
        )

        const report_identifier = pdfData.report_identifier
        const currentDateTime = new Date()
        const old_report = await report.find({ report_identifier: report_identifier })
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content:
                    old_report[0].Content +
                    '\n\n' +
                    `Proposal Sent to ${dean[0].name} by Admin [${currentDateTime.toString()}]`
            }
        )
        res.status(200).json({ message: 'Sent to dean' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.deanaccept = async (req, res) => {
    try {
        const pdfData = await pdf.findOneAndUpdate(
            { _id: req.body.pdf_id },
            {
                status: 'accepted by dean'
            }
        )

        const student_data = await StudentData.findOneAndUpdate(
            { _id: pdfData.student_id },
            {
                dean_acceptence: 'accepted',
                dean_accepted_document: pdfData._id
            }
        )

        new notification({
            user_id: pdfData.student_id,
            notification_text: `Congratulations ${student_data.name} your proposal is accepted by dean`
        }).save()

        new notification({
            user_id: student_data.supervisor,
            notification_text: `Congratulations your student's (${student_data.name}) proposal is accepted by dean`
        }).save()

        const report_identifier = pdfData.report_identifier
        const currentDateTime = new Date()
        const old_report = await report.find({ report_identifier: report_identifier })
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content: old_report[0].Content + '\n\n' + `Proposal accepted by dean [${currentDateTime.toString()}]`
            }
        )

        res.status(200).json({ message: 'accepted by dean' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.deanreject = async (req, res) => {
    try {
        const pdfData = await pdf.findOneAndUpdate(
            { _id: req.body.pdf_id },
            {
                status: 'rejected by dean',
                reason: req.body.reason
            }
        )

        const student_data = await StudentData.findOneAndUpdate(
            { _id: pdfData.student_id },
            {
                dean_acceptence: 'rejected',
                dean_accepted_document: pdfData._id
            }
        )

        new notification({
            user_id: pdfData.student_id,
            notification_text: `Dear ${student_data.name} your proposal is rejected by dean`
        }).save()

        new notification({
            user_id: student_data.supervisor,
            notification_text: `Dear supervisor your student's (${student_data.name}) proposal is rejected by dean`
        }).save()

        const report_identifier = pdfData.report_identifier
        const currentDateTime = new Date()
        const old_report = await report.find({ report_identifier: report_identifier })
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content:
                    old_report[0].Content +
                    '\n\n' +
                    `Proposal Rejected by dean with reason "${req.body.reason}" [${currentDateTime.toString()}]`
            }
        )

        res.status(200).json({ message: 'rejected by dean' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.deanmodify = async (req, res) => {
    try {
        const pdfData = await pdf.findOneAndUpdate(
            { _id: req.body.pdf_id },
            {
                status: 'modify by dean',
                reason: req.body.reason
            }
        )

        const student_data = await StudentData.findOneAndUpdate(
            { _id: pdfData.student_id },
            {
                dean_acceptence: 'modify',
                dean_accepted_document: pdfData._id
            }
        )

        new notification({
            user_id: pdfData.student_id,
            notification_text: `Dear ${student_data.name} dean has asked for some modifications with reason "${req.body.reason}"`
        }).save()

        const report_identifier = pdfData.report_identifier
        const currentDateTime = new Date()
        const old_report = await report.find({ report_identifier: report_identifier })
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content:
                    old_report[0].Content +
                    '\n\n' +
                    `Proposal asked to modify by dean with reason "${req.body.reason}" [${currentDateTime.toString()}]`
            }
        )

        res.status(200).json({ message: 'rejected by dean' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.getdeanmessage = async (req, res) => {
    const data = await StudentData.find({ _id: req.body._id })
    if (data[0].dean_acceptence == 'accepted') {
        res.status(200).json(`Dear ${data[0].name} dean has acccepted your proposal Now you can start working!`)
    } else if (data[0].dean_acceptence == 'rejected') {
        res.status(200).json(`Dear ${data[0].name} dean has rejected your proposal!`)
    } else if (data[0].dean_acceptence == 'modify') {
        res.status(200).json(`Dear ${data[0].name} dean has asked to do some modifications!`)
    } else {
        res.status(200).json('')
    }
}

const StudentData = require('../Models/studentRegister')
const TeacherData = require('../Models/TeacherRegister')
const supervision = require('../Models/supervision')
const pdf = require('../Models/Pdf')
const comment = require('../Models/comment')
const dac = require('../Models/dac')
const report = require('../Models/Report')
const presentation =require('../Models/presentation')
exports.get_students_with_proposals = async (req, res) => {
    try {
        const pending_students = await pdf.find({
            teacher_id: req.params.teacher_id,
            pdf_type: 'proposal',
            teacher_role: req.params.role
        })
        res.json(pending_students)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.get_students_count_with_proposals = async (req, res) => {
    try {
        const pending_students = await supervision.find({ teacher_id: req.params.teacher_id, status: 'pending' })
        const approved_students = await supervision.find({ teacher_id: req.params.teacher_id, status: 'approved' })
        const rejected_students = await supervision.find({ teacher_id: req.params.teacher_id, status: 'rejected' })
        const tomodify_students = await supervision.find({ teacher_id: req.params.teacher_id, status: 'modify' })
        const modified_students = await supervision.find({ teacher_id: req.params.teacher_id, status: 'modified' })

        let mystudentscount = await StudentData.find({
            supervisor: req.params.teacher_id
        })

        res.json({
            pending_students: pending_students.length,
            approved_students: approved_students.length,
            rejected_students: rejected_students.length,
            tomodify_students: tomodify_students.length,
            modified_students: modified_students.length,
            mystudentscount: mystudentscount.length
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.get_pdf_id = async (req, res) => {
    try {
        const foundpdf = await pdf.find({ teacher_id: req.params.teacher_id, student_id: req.params.student_id })
        res.json(foundpdf[0]._id)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.add_comment = async (req, res) => {
    try {
        let pdfdata = await pdf.find({
            _id: req.body.pdf_id
        })

        new comment({
            text: req.body.text,
            teacher_id: req.body.teacher_id,
            student_id: pdfdata[0].student_id,
            pdf_id: req.body.pdf_id,
            teacher_role: req.body.teacher_role
        }).save()

        res.json({ result: 'added' })
    } catch (err) {}
}

// exports.approve_proposal = async (req, res) => {

//     await supervision.findOneAndUpdate({
//         pdf_id: req.body.pdf_id,
//         teacher_id: req.body.teacher_id
//     }, {
//         status: 'approved'
//     }).then((response) => {
//         // res.json({ 'data': 'approved' })
//     })
//     res.json({ 'data': 'Approved' })
// }

// exports.reject_proposal = async (req, res) => {

//     supervision.findOneAndUpdate({
//         pdf_id: req.body.pdf_id,
//         teacher_id: req.body.teacher_id
//     }, {
//         status: 'rejected',
//         reason: req.body.reason
//     }).then((response) => {
//         // res.json({ 'data': 'approved' })
//     })
//     res.json({ 'data': 'Rejected' })
// }

// exports.update_proposal = async (req, res) => {

//     supervision.findOneAndUpdate({
//         pdf_id: req.body.pdf_id,
//         teacher_id: req.body.teacher_id
//     }, {
//         status: 'modify',
//         reason: req.body.reason
//     }).then((response) => {
//         // res.json({ 'data': 'approved' })
//     })
//     res.json({ 'data': 'Modified' })

// }

exports.get_sudents_with_proposals_accepted = async (req, res) => {
    try {
        const students = await supervision.find({ teacher_id: req.params.teacher_id, status: 'approved' })
        res.json(students)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.get_user_by_id = async (req, res) => {
    try {
        let data = ''
        switch (req.params.user_type) {
            case 'student':
                data = await StudentData.find({ _id: req.params._id })
                res.json(data)
                break
            case 'teacher':
                data = await TeacherData.find({ _id: req.params._id })
                res.json(data)
                break
        }
    } catch (err) {}
}

exports.confirm_supervision = async (req, res) => {
    try {
        await StudentData.findOneAndUpdate(
            {
                _id: req.body.student_id
            },
            {
                supervisor: req.body.teacher_id,
                proposal_status: 'Approved'
            }
        )
        res.json({ result: 'Confirmed' })
    } catch (err) {}
}

exports.get_pdf_and_comment = async (req, res) => {
    try {
        let pdfdata = await pdf.find({
            teacher_id: req.body.teacher_id,
            student_id: req.body.student_id,
            pdf_type: 'proposal'
        })

        res.json(pdfdata)
    } catch (err) {}
}

exports.get_supervisor_sudents = async (req, res) => {
    try {
        let data = await StudentData.find({
            supervisor: req.params.teacher_id
        })
        res.json(data)
    } catch (err) {}
}

exports.upload_user_image = async (req, res) => {
    try {
        switch (req.body.user_type) {
            case 'teacher':
                await TeacherData.findOneAndUpdate(
                    {
                        _id: req.body._id
                    },
                    {
                        image_name: req.file.filename
                    }
                )
                break

            case 'student':
                await StudentData.findOneAndUpdate(
                    {
                        _id: req.body._id
                    },
                    {
                        image_name: req.file.filename
                    }
                )
                break
        }

        res.status(200).json({ result: 'uploaded' })
    } catch (err) {}
}

exports.get_pdf_by_id = async (req, res) => {
    try {
        let data = await pdf.find({
            _id: req.params.pdf_id
        })
        res.json(data[0])
    } catch (exe) {}
}

exports.approve_paper = async (req, res) => {
    try {
        const pdfdata = await pdf.findOneAndUpdate(
            {
                _id: req.body.pdf_id,
                teacher_id: req.body.teacher_id
            },
            {
                status: 'approved'
            }
        )

        let dacdata = await dac.find({
            dac_head: req.body.teacher_id
        })

        const report_identifier = pdfdata.report_identifier
        const currentDateTime = new Date()
        const td = await TeacherData.find({ _id: req.body.teacher_id })
        const old_report = await report.find({ report_identifier: report_identifier })
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content:
                    old_report[0].Content +
                    '\n\n' +
                    `Proposal Accepted by ${td[0].name} (${pdfdata.teacher_role})  [${currentDateTime.toString()}]`
            }
        )

        if (dacdata.length > 0) {
            let pdf_data = await pdf.find({
                _id: req.body.pdf_id
            })
            await new pdf({
                pdfName: pdf_data[0].pdfName,
                status: 'forward to dean',
                student_id: pdf_data[0].student_id,
                teacher_id: req.body.teacher_id,
                report_identifier: pdf_data[0].report_identifier,
                pdf_type: pdf_data[0].pdf_type,
                teacher_role: 'dean',
                document_name: pdf_data[0].document_name
            }).save()
            const old_report = await report.find({ report_identifier: report_identifier })
            const result = await report.findOneAndUpdate(
                { report_identifier: report_identifier },
                {
                    Content:
                        old_report[0].Content +
                        '\n\n' +
                        `Proposal Accepted by DAC Head (${td[0].name}) [${currentDateTime.toString()}]`
                }
            )

            await StudentData.findOneAndUpdate(
                {
                    _id: pdf_data[0].student_id
                },
                {
                    dac_acceptence: 'accepted'
                }
            )
        }

        res.json({ result: 'approved' })
    } catch (err) {
        console.log(err)
        res.json('Error')
    }
}

exports.modify_paper = async (req, res) => {
    try {
        if (req.body.updated_pdf_name != null) {
            const pdfData = await pdf.findOneAndUpdate(
                {
                    _id: req.body.pdf_id,
                    teacher_id: req.body.teacher_id
                },
                {
                    status: 'modify',
                    reason: req.body.reason,
                    pdfName: req.body.updated_pdf_name
                }
            )

            const report_identifier = pdfData.report_identifier
            const currentDateTime = new Date()
            const td = await TeacherData.find({ _id: req.body.teacher_id })
            const old_report = await report.find({ report_identifier: report_identifier })
            const result = await report.findOneAndUpdate(
                { report_identifier: report_identifier },
                {
                    Content:
                        old_report[0].Content +
                        '\n\n' +
                        `Proposal was asked to modify by ${td[0].name} (${pdfdata.teacher_role})   with reason "${
                            req.body.reason
                        }" File suggestions were made and new file is uploaded. [${currentDateTime.toString()}]`
                }
            )
        } else {
            const pdfdata = await pdf.findOneAndUpdate(
                {
                    _id: req.body.pdf_id,
                    teacher_id: req.body.teacher_id
                },
                {
                    status: 'modify',
                    reason: req.body.reason
                }
            )
            const report_identifier = pdfdata.report_identifier
            const currentDateTime = new Date()
            const td = await TeacherData.find({ _id: req.body.teacher_id })
            const old_report = await report.find({ report_identifier: report_identifier })
            const result = await report.findOneAndUpdate(
                { report_identifier: report_identifier },
                {
                    Content:
                        old_report[0].Content +
                        '\n\n' +
                        `Proposal was asked to modify by ${td[0].name} (${pdfdata.teacher_role})   with reason "${
                            req.body.reason
                        }"  [${currentDateTime.toString()}]`
                }
            )
        }

        res.json({ result: 'Submitted' })
    } catch (err) {}
}

exports.reject_paper = async (req, res) => {
    try {
        const pdfData = await pdf.findOneAndUpdate(
            {
                _id: req.body.pdf_id,
                teacher_id: req.body.teacher_id
            },
            {
                status: 'rejected',
                reason: req.body.reason
            }
        )

        const report_identifier = pdfData.report_identifier
        console.log(report_identifier)
        const currentDateTime = new Date()
        const td = await TeacherData.find({ _id: req.body.teacher_id })
        const old_report = await report.find({ report_identifier: report_identifier })
        const result = await report.findOneAndUpdate(
            { report_identifier: report_identifier },
            {
                Content:
                    old_report[0].Content +
                    '\n\n' +
                    `Proposal Rejected by ${td[0].name} (${pdfData.teacher_role})   with reason "${
                        req.body.reason
                    }"  [${currentDateTime.toString()}]`
            }
        )

        res.json({ result: 'rejected' })
    } catch (err) {}
}
exports.add_new_meeting = async (req, res) => {
    try {
        await new presentation({
            presentation_description: req.body.presentationdescription,
            presentation_date: req.body.presentationdate,
            presentation_time: req.body.presentationtime,
            presentation_venue: req.body.presentationvenue,
            student_id: req.body.student_id,
            supervisor_id: req.body.supervisor_id
        }).save();

        res.status(200).json({ 'result': 'ok' });
    } catch (e) {
        console.error('Error saving new meeting:', e);
        res.status(500).json({ 'result': 'not ok', 'error': e.message });
    }
};

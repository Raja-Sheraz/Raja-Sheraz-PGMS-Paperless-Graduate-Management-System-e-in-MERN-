const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
    test,
    registerUser,
    loginUser,
    getProfile,
    studentRegister,
    getStudent,
    UpdateStd,
    getUser,
    UpdateUser,
    TeacherRegistration,
    getTeacher,

    getUser1,
    UpdateUser1,
    LoginOtherUser,

    TeacherDelete,
    StudentDelete,
    UpdateStudent,
    UpdateTeacher

    // SendEmail,
} = require('../Controller/authController')
const {SearchThesis}=require('../Controller/SearchThesis');
const{UploadThesis}=require('../Controller/Thesis');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)
router.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.sendStatus(200)
})

router.get('/', (req, res) => {
    console.log('HOME')
})
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/studentRegistration', studentRegister)
router.get('/haha', getStudent)
router.get('/getUser/:id', getUser)
router.put('/updateUser/:id', UpdateUser)
router.post('/teacherRegister', TeacherRegistration)
router.get('/getTeacherData', getTeacher)
router.delete('/deleteTeacher/:id', TeacherDelete)
router.delete('/deleteStudent/:id', StudentDelete)

router.get('/getUser1/:id', getUser1)
router.put('/updateUser1/:id', UpdateUser1)
router.put('/updateStudentData/:id', UpdateStudent)
router.put('/updateTeacherData/:id', UpdateTeacher)
router.post('/login1', LoginOtherUser)
router.get('/api/search',SearchThesis);
router.post('/api/upload',UploadThesis);

module.exports = router

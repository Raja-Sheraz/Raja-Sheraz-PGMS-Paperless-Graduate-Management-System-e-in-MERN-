import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/User'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import { TableHeading } from '../components/tableHeading'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import GroupsIcon from '@mui/icons-material/Groups'
import { style } from 'motion';

const StudentsPage = () => {
    const [userData, setUserData] = useState([])
    const [studentsData, setStudentsData] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const Navigate = useNavigate()
    let [studentsgot, setStudentsgot] = useState(false)

    const getSupervisorStudents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get_supervisor_sudents/${user._id}`)
            setStudentsData(response.data)
            setStudentsgot(true)
        } catch (error) {
            console.error('Error fetching supervisor students:', error)
        }
    }

    useEffect(() => {
        if (!studentsgot) {
            getSupervisorStudents()
        }
        let isMounted = true

        return () => {
            isMounted = false
        }
    }, [studentsgot])

    useEffect(() => {
        const removeDuplicates = (objectsArray) => {
            const seen = new Set()
            return objectsArray?.filter((obj) => {
                const objString = JSON.stringify(obj)
                if (!seen.has(objString)) {
                    seen.add(objString)
                    return true
                }
                return false
            })
        }

        if (studentsData) {
            const result = removeDuplicates(studentsData)
            setStudents(result)
        }
    }, [studentsData])

    return (
        <>
            <div className="overflow-hidden flex flex-row" style={{ backgroundColor: '#F5F5F5' }}>
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 min-h-0 ">
                        <h1 style={{ color: 'black', fontSize: '50px', fontWeight: 'bold', fontFamily: 'initial' }}>Students</h1>
                        {loading ? (
                            <div> ADDLoader</div>
                        ) : (
                            <>
                                <TableContainer component={Paper} elevation={3} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                                    <Table style={{borderRadius:'20px'}}>
                                        <TableHead style={{ backgroundColor: 'white',borderRadius:'20px' }}>
                                            <TableRow style={{ backgroundColor: 'white' ,borderRadius:'20px'}}>
                                                <TableCell style={{ backgroundColor: '#925FE2' ,color: 'white', borderColor: '#545B6A',fontWeight:"bold",fontFamily:"initial",fontSize:'18px' }}>
                                                    Name
                                                </TableCell>
                                                <TableCell style={{ backgroundColor: '#925FE2' ,color: 'white', borderColor: '#545B6A',fontWeight:"bold",fontFamily:"initial",fontSize:'18px' }}>
                                                    Phone No
                                                </TableCell>
                                                <TableCell style={{ backgroundColor: '#925FE2' ,color: 'white', borderColor: '#545B6A',fontWeight:"bold",fontFamily:"initial",fontSize:'18px' }}>
                                                    Email
                                                </TableCell>
                                                <TableCell style={{ backgroundColor: '#925FE2' ,color: 'white', borderColor: '#545B6A',fontWeight:"bold",fontFamily:"initial",fontSize:'18px' }}>
                                                    Department
                                                </TableCell>
                                                <TableCell style={{ backgroundColor: '#925FE2' ,color: 'white', borderColor: '#545B6A',fontWeight:"bold",fontFamily:"initial",fontSize:'18px' }}>
                                                    Meeting
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {students.map((student) => (
                                                <TableRow
                                                    key={student._id}
                                                    style={{ backgroundColor: 'white', borderColor: '#545B6A' }}
                                                >
                                                    <TableCell style={{ backgroundColor: 'white' ,color: 'black', borderColor: '#545B6A' }}>
                                                        {student.name}
                                                    </TableCell>
                                                    <TableCell style={{ backgroundColor: 'white' ,color: 'black', borderColor: '#545B6A' }}>
                                                        {student.phone}
                                                    </TableCell>
                                                    <TableCell style={{ backgroundColor: 'white' ,color: 'black', borderColor: '#545B6A' }}>
                                                        {student.email}
                                                    </TableCell>
                                                    <TableCell style={{ backgroundColor: 'white' ,color: 'black', borderColor: '#545B6A' }}>
                                                        {student.department}
                                                    </TableCell>
                                                    <TableCell style={{ backgroundColor: 'white' ,color: 'black',borderColor: '#545B6A' }}>
                                                        <Typography
                                                            className="details-text"
                                                            onClick={() => Navigate(`/Addmeeting/${student._id}`)}
                                                            sx={{
                                                                cursor: 'pointer',
                                                                fontFamily: 'Outfit',
                                                                fontSize: '14px',
                                                                color: 'black',
                                                                backgroundColor: 'white' 
                                                            }}
                                                        >
                                                            <GroupsIcon style={{ color: 'green',width:'50px',height:'50px' }} /> &nbsp;Arrange Meeting
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentsPage

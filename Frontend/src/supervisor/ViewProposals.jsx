import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/User'
import MUIDataTable from 'mui-datatables'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import { TableHeading } from '../components/tableHeading'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'; // Import TableCell
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CommentIcon from '@mui/icons-material/Comment'
const ViewProposals = () => {
    const [userData, setUserData] = useState([])
    const [studentsData, setStudentsData] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState([])
    const { user } = useContext(UserContext)
    let [studentsgot, setStudentsgot] = useState(false)
    const [supervisorstudents, setsupervisorstudents] = useState([])
    const Navigate = useNavigate()

    let [acceptedstudents, setacceptedstudents] = useState([])
    let [rejectedstudents, setrejectedstudents] = useState([])
    let [pendingstudents, setpendingstudents] = useState([])
    let [tomodifystudents, settomodifytudents] = useState([])
    let [modifiedstudents, setmodifiedstudents] = useState([])
    const role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null
    let get_sudents_with_proposals = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get_sudents_with_proposals/${user._id}/${role}`)
            setsupervisorstudents(response.data)
            // console.log(response.data);
            setStudentsgot(true)
        } catch (error) {
            // console.error(`Error fetching student data for ID ${id}:`, error)
            return null // or handle the error in an appropriate way
        }
    }
    useEffect(() => {
        if (!studentsgot) {
            get_sudents_with_proposals()
        }

        let isMounted = true
        const fetchStudentDataById = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/getUser/${id}`)
                return response.data
            } catch (error) {
                console.error(`Error fetching student data for ID ${id}:`, error)
                return null // or handle the error in an appropriate way
            }
        }
        const fetchAllStudentData = async () => {
            const studentsData = await Promise.all(
                supervisorstudents?.map(async (supervisionrequests) => {
                    let student = await fetchStudentDataById(supervisionrequests.student_id)
                    student['supervision_status'] = supervisionrequests.status
                    student['pdf_id'] = supervisionrequests._id
                    // console.log(student);
                    return student
                })
            )
            if (isMounted) {
                setStudentsData((prevData) => [...prevData, ...studentsData])
            }
        }
        fetchAllStudentData()
        return () => {
            isMounted = false
        }
    }, [supervisorstudents])

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
            // console.log(result);

            let a = []
            let tm = []
            let r = []
            let mod = []
            let p = []

            result.map((stu) => {
                if (stu.supervision_status == 'approved') {
                    a.push(stu)
                } else if (stu.supervision_status == 'modify') {
                    tm.push(stu)
                } else if (stu.supervision_status == 'rejected') {
                    r.push(stu)
                } else if (stu.supervision_status == 'modified') {
                    mod.push(stu)
                } else if (stu.supervision_status == 'Pending') {
                    p.push(stu)
                }
            })

            settomodifytudents(tm)
            setacceptedstudents(a)
            setmodifiedstudents(mod)
            setpendingstudents(p)
            setrejectedstudents(r)
            setduplicatedremoved(true)
        }
    }, [studentsData])

    let [duplicateremoved, setduplicatedremoved] = useState(false)

    useEffect(() => {}, [duplicateremoved])

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                sort: false,
                filter: false
            }
        },

        {
            name: 'phone',
            label: 'Phone',
            options: {
                sort: false
            }
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                sort: false
            }
        },

        {
            name: 'department',
            label: 'Department',
            options: {
                sort: false
            }
        },
        {
            name: 'pdf_id',
            label: 'Visit',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <Typography
                                className="details-text"
                                onClick={() => Navigate(`/proposals/VisitSingleProposal/${value}`)}
                                sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                                    style={{backgroundColor:'white',color:'black'}}
                            >
                                <VisibilityIcon style={{color:'green'}} />
                                    
                                    &nbsp; Status
                            </Typography>
                        )
                    }
                }
            }
        },
        {
            name: 'pdf_id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        if (tableMeta.rowData[1] != 'pending') {
                            return (
                                <Typography
                                    className="details-text"
                                    onClick={() => {
                                        Navigate(`/SeeCommentsOnDoc/${value}/supervisor`)
                                    }}
                                    sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                                    style={{backgroundColor:'white',color:'black'}}
                                >
                                   <DeleteForeverIcon style={{ color: 'red' }} />
                                   &nbsp; Delete
                                </Typography>
                            )
                        }
                    }
                }
            }
        }
    ]
    const HeaderElements = () => {
        // return (
        //   // <Button type="button" onClick={() => console.log('Clicked')}>
        //   //   + Add Booking
        //   // </Button>
        // );
    }


    const options = {
        filter: true,
        download: true,
        sort: false,
        responsive: 'vertical',
        selectableRowsOnClick: false,
        print: true,
        viewColumns: false,
        searchOpen: false,
        search: true,
        page: 0,
        pageSize: 10,
        rowsPerPageOptions: [],
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30]
    }

    const getMuiTheme = () =>
        createTheme({
            typography: {
                fontFamily: 'sans-serif'
            },
            palette: {
                background: {
                    // paper: '#3F51B5',
                    // default: '#FFFFFF'
                },
                mode: 'light'
            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: '10px 4px',
                            // border: '1px solid #545B6A'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: '#212121',
                            backgroundColor: '#FAFAFA',
                            // border: '1px solid #BDBDBD'
                            // ":hover":"",
                        },
                        footer: {
                            backgroundColor: 'white',
                            border: '1px solid #545B6A'
                        }
                    }
                }
            }
        })
    return (
        <>
            <div className="bg-neutral-100  overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 min-h-0 overflow-auto">
                        {pendingstudents.length > 0 && (
                            <>
                                <TableHeading name={'Pending Proposals'} />
                                <ThemeProvider theme={getMuiTheme()}>
                                    <MUIDataTable data={pendingstudents} columns={columns} options={options} />
                                </ThemeProvider>
                            </>
                        )}

                        {tomodifystudents.length > 0 && (
                            <>
                                <TableHeading name={'To Modify Proposals'} />
                                <ThemeProvider theme={getMuiTheme()}>
                                    <MUIDataTable data={tomodifystudents} columns={columns} options={options} />
                                </ThemeProvider>
                            </>
                        )}
                        {modifiedstudents.length > 0 && (
                            <>
                                <TableHeading name={'Modified Proposals'} />
                                <ThemeProvider theme={getMuiTheme()}>
                                    <MUIDataTable data={modifiedstudents} columns={columns} options={options} />
                                </ThemeProvider>
                            </>
                        )}
                        {rejectedstudents.length > 0 && (
                            <>
                                <TableHeading name={'Rejected Proposals'} />
                                <ThemeProvider theme={getMuiTheme()}>
                                    <MUIDataTable data={rejectedstudents} columns={columns} options={options} />
                                </ThemeProvider>
                            </>
                        )}

                        {acceptedstudents.length > 0 && (
                            <>
                                <TableHeading name={'Accepted Proposals'} />
                                <ThemeProvider theme={getMuiTheme()}>
                                    <MUIDataTable data={acceptedstudents} columns={columns} options={options} />
                                </ThemeProvider>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProposals

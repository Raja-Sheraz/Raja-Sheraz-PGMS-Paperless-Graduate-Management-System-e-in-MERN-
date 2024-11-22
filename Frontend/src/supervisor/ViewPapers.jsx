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
import VisibilityIcon from '@mui/icons-material/Visibility'
import CommentIcon from '@mui/icons-material/Comment'
function ViewPapers() {
    let { user } = useContext(UserContext)
    let [papers, setpapers] = useState([])
    let [papersgot, setpapersgot] = useState(false)
    let [updated, setupdated] = useState(false)

    const role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null

    let navigate = useNavigate()

    let get_all_papers = async () => {
        let response = await axios.post('/get_all_papers', {
            user_type: 'teacher',
            _id: user?._id,
            teacher_role: role
        })
        console.log(response.data);
        setpapers(response.data)
        setpapersgot(true)
    }

    const fetchStudentDataById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/getUser/${id}`)
            return response.data
            // console.log(response.data)
        } catch (error) {
            console.error(`Error fetching student data for ID ${id}:`, error)
            return null // or handle the error in an appropriate way
        }
    }

    let updateData = async () => {
        const _data = await Promise.all(
            papers?.map(async (paper) => {
                let student = await fetchStudentDataById(paper.student_id)
                paper['student_name'] = student?.name + " (" + student?.reg_no + ")"
                // console.log(student);
                return paper
            })
        )
        // console.log(_data)
        setpapers(_data)
        setupdated(true)
    }

    useEffect(() => {
        if (!papersgot) {
            get_all_papers()
            // console.log('OI9')
        } else if (papersgot && !updated) {
            updateData()
            // console.log('OI6')
        }
        // console.log('OI')
    }, [papers])

    const columns = [
        {
            name: 'document_name',
            label: 'Name',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value) => {
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return <Typography className="details-text">{value}</Typography>
                    }
                }
            }
        },
        {
            name: 'student_name',
            label: 'Student',
            options: {
                sort: false
            }
        },
        {
            name: '_id',
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
                                onClick={() => navigate(`/proposals/VisitSingleProposal/${value}`)}
                                sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                                style={{ backgroundColor: 'white', color: 'black' }}
                            >
                                <VisibilityIcon style={{ color: 'green' }} /> &nbsp; View
                            </Typography>
                        )
                    }
                }
            }
        },
        {
            name: '_id',
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
                                        if (role == 'CoordinateCommitte') {
                                            navigate(`/SeeCommentsOnDoc/${value}/CoordinateCommitte`)
                                        } else if (role == 'DAC') {
                                            navigate(`/SeeCommentsOnDoc/${value}/DAC`)
                                        } else if (role == 'Supervisor') {
                                            navigate(`/SeeCommentsOnDoc/${value}/supervisor`)
                                        }
                                    }}
                                    sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                >
                                    <CommentIcon style={{ color: 'yellow' }} />
                                    &nbsp;See Comments
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
        // filterType: "checkbox",
        // selecttablesRows: false,
        // selecttablesRows: false,
        // elevation: 0,
        // rowsPerPage: 5,
        // rowsPerPageOptions: [5, 10, 20, 30]
        filter: true,
        // filterType: 'checkbox',
        download: true,
        sort: false,
        responsive: 'vertical', // standard | vertical | simple
        // selectableRows: 'multiple',
        selectableRowsOnClick: false,
        print: true,
        viewColumns: false,
        searchOpen: false,
        search: true,
        page: 0,
        pageSize: 10,
        // rowsPerPage: 10,
        rowsPerPageOptions: [],
        // filterType: 'checkbox',
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
                    paper: 'white',
                    default: 'white'
                },
                mode: 'light'
            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: '10px 4px',
                            border: '1px solid #545B6A',
                            fontWeight: 'bold',
                            fontFamily: 'initial',
                            fontSize: '20px',
                            textAlign: 'center'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid #545B6A',
                            fontSize: '15px',
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
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
            <div className=" flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 min-h-0 overflow-auto">
                        {role == 'dean' && (
                            <>
                                {papers.filter((item) => item.status == 'sent to dean').length > 0 && (
                                    <>
                                        <TableHeading name={'Pending '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'sent to dean')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'accepted by dean').length > 0 && (
                                    <>
                                        <TableHeading name={'Accepted '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'accepted by dean')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'modify by dean').length > 0 && (
                                    <>
                                        <TableHeading name={'To Modify'} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'modify by dean')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'rejected by dean').length > 0 && (
                                    <>
                                        <TableHeading name={'Rejected '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'rejected by dean')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                            </>
                        )}
                        {role != 'dean' && (
                            <>
                                {papers.filter((item) => item.status == 'Pending').length > 0 && (
                                    <>
                                        <TableHeading name={'Pending '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'Pending')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'modify').length > 0 && (
                                    <>
                                        <TableHeading name={'To modify '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'modify')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'modified').length > 0 && (
                                    <>
                                        <TableHeading name={'Modified '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'modified')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'rejected').length > 0 && (
                                    <>
                                        <TableHeading name={'Rejected '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'rejected')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                                {papers.filter((item) => item.status == 'approved').length > 0 && (
                                    <>
                                        <TableHeading name={'Accepted '} />
                                        <ThemeProvider theme={getMuiTheme()}>
                                            <MUIDataTable
                                                data={papers.filter((item) => item.status == 'approved')}
                                                columns={columns}
                                                options={options}
                                            />
                                        </ThemeProvider>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewPapers

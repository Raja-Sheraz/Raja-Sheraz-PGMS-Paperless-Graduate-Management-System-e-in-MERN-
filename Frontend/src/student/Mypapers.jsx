import React, { useContext, useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { UserContext } from '../context/User'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { uploadStudentPDF } from '../apis/UploadStudentPdf'
import { selectTeacherForStudent } from '../apis/SelectSuperVisor'
import FeedbackModal from '../components/Modal'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import { Box, Card, CardContent, Divider, Grid, List, ListItem, Avatar, Typography, Button } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { TableHeading } from '../components/tableHeading'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CommentIcon from '@mui/icons-material/Comment'
function Mypapers() {
    let { user } = useContext(UserContext)
    let navigate = useNavigate()
    const role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null


    let [papers, setpapers] = useState([])
    let [updated, setupdated] = useState(false)

    let get_all_papers = async () => {
        let response = await axios.post('/get_all_papers', {
            user_type: 'student',
            _id: user?._id,
            teacher_role:role
        })
        // console.log(response.data)
        setpapers(response.data)
    }

    const getuserbyid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_user_by_id/${id}/teacher`)
            // console.log("teacher id : "+response.data[0]._id);
            return response.data[0]
        } catch (error) {
            console.error(`Error fetching `, error)
            return null // or handle the error in an appropriate way
        }
    }

    const updatedata = async () => {
        const _data = await Promise.all(
            papers?.map(async (paper, index) => {
                let teacher = await getuserbyid(paper.teacher_id)
                paper['teacher_name'] = teacher.name + ' (' + paper?.teacher_role + ')'
                paper['info'] = {
                    status: paper.status,
                    forwarded_by: paper.forwarded_by
                }
                return paper
            })
        )
        console.log(_data)
        setpapers(_data)
        setupdated(true)
    }

    useEffect(() => {
        if (!updated && papers.length == 0) {
            get_all_papers()
        } else if (!updated && papers.length > 0) {
            console.log('UPs')
            updatedata()
        }
    }, [papers])

    const columns = [
        {
            name: 'pdfName',
            label: 'Document',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return <p className="details-text">{value?.substring(13)}</p>
                    }
                }
            }
        },
        {
            name: 'document_name',
            label: 'PDF',
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: 'teacher_name',
            label: 'Teacher',
            options: {
                sort: false
            }
        },
        {
            name: 'pdf_type',
            label: 'Document',
            options: {
                sort: false
            }
        },
        {
            name: 'info',
            label: 'Status',
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <Typography className="details-text" style={{ fontSize: '15px' }}>
                                {value?.forwarded_by != null && (
                                    <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
                                        forwarded by : {value.forwarded_by}
                                    </p>
                                )}
                                <p>{value?.status}</p>
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
                                        navigate(`/ViewPaperResult/${value}/${tableMeta.rowData[4]?.status}`)
                                    }}
                                    sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                                    style={{backgroundColor:'white',color:'black'}}
                                >
                                    <VisibilityIcon style={{ color: 'green' }} /> &nbsp; View
                                    
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
                            textAlign: 'center'
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
        <div className="bg-neutral-100  overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <Button
                        onClick={() => {
                            navigate('/uploadpaper')
                        }}
                    >
                        Upload New
                    </Button>
                    <div className="flex-1 p-4 min-h-0 overflow-auto">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypapers

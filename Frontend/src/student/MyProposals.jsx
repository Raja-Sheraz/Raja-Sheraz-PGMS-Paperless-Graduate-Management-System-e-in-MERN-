// material-ui
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import { Button } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router'
import MUIDataTable from 'mui-datatables'
import axios from 'axios'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'
import { toast } from 'react-toastify'
import { TableHeading } from '../components/tableHeading'
import AddIcon from '@mui/icons-material/Add'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CommentIcon from '@mui/icons-material/Comment'

const MyProposal = () => {
    let { user } = useContext(UserContext)

    const navigate = useNavigate()

    let [proposals, setproposals] = useState([])
    let [proposals_data, setproposals_data] = useState([])

    let get_proposals = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/students/get_proposals/${user._id}`)
            setproposals(response.data)
            // console.log(response.data);
        } catch (err) {}
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
            proposals?.map(async (proposal, index) => {
                let teacher = await getuserbyid(proposal.teacher_id)
                proposal['teacher_name'] = teacher.name
                proposal['teacher_id'] = teacher._id
                proposal['info'] = {
                    status: proposal.status,
                    forwarded_by: proposal.forwarded_by
                }
                return proposal
            })
        )
        // console.log(_data);
        setproposals_data(_data)
    }

    useEffect(() => {
        if (proposals.length > 0) {
            updatedata()
        } else if (proposals_data.length == 0) {
            get_proposals()
        }
    }, [proposals])

    let deletepdf = async (id) => {
        let response = await axios.post('http://localhost:5000/api/delete_pdf', {
            _id: id
        })
        if (response.status == 200) {
            toast.success('Deleted')
            get_proposals()
        } else {
            toast.error('Error deleting')
        }
    }

    const columns = [
        {
            name: 'teacher_name',
            label: 'Teacher',
            options: {
                sort: false,
                filter: false
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
        // {
        //     name: 'info',
        //     label: 'Status',
        //     options: {
        //         sort: false,
        //         customBodyRender: (value) => {
        //             if (value?.status == 'approved') {
        //                 return (
        //                     <>
        //                         {value?.forwarded_by != null && (
        //                             <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
        //                                 forwarded by : {value.forwarded_by}
        //                             </p>
        //                         )}
        //                         <p style={{ color: 'green' }}>{value?.status}</p>
        //                     </>
        //                 )
        //             } else if (value?.status == 'rejected') {
        //                 return (
        //                     <>
        //                         {value?.forwarded_by != null && (
        //                             <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
        //                                 forwarded by : {value.forwarded_by}
        //                             </p>
        //                         )}
        //                         <p style={{ color: 'red' }}>{value?.status}</p>
        //                     </>
        //                 )
        //             } else if (value?.status == 'modify') {
        //                 return (
        //                     <>
        //                         {value?.forwarded_by != null && (
        //                             <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
        //                                 forwarded by : {value.forwarded_by}
        //                             </p>
        //                         )}
        //                         <p style={{ color: 'orange' }}>{value?.status}</p>
        //                     </>
        //                 )
        //             } else if (value?.status == 'modified') {
        //                 return (
        //                     <>
        //                         {value?.forwarded_by != null && (
        //                             <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
        //                                 forwarded by : {value.forwarded_by}
        //                             </p>
        //                         )}
        //                         <p style={{ color: 'orange' }}>{value?.status}</p>
        //                     </>
        //                 )
        //             } else {
        //                 return (
        //                     <>
        //                         {value?.forwarded_by != null && (
        //                             <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
        //                                 forwarded by : {value.forwarded_by}
        //                             </p>
        //                         )}
        //                         <p style={{ color: 'gray', fontStyle: 'italic' }}>{'Pending'}</p>
        //                     </>
        //                 )
        //             }
        //         }
        //     }
        // },
        {
            name: 'info',
            label: 'Status',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    if (value?.status == 'approved') {
                        return (
                            <>
                                {value?.forwarded_by != null && (
                                    <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
                                        forwarded by : {value.forwarded_by}
                                    </p>
                                )}
                                <p style={{ color: 'green' }}>{value?.status}</p>
                            </>
                        )
                    } else if (value?.status == 'rejected') {
                        return (
                            <>
                                {value?.forwarded_by != null && (
                                    <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
                                        forwarded by : {value.forwarded_by}
                                    </p>
                                )}
                                <p style={{ color: 'red' }}>{value?.status}</p>
                            </>
                        )
                    } else if (value?.status == 'modify') {
                        return (
                            <>
                                {value?.forwarded_by != null && (
                                    <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
                                        forwarded by : {value.forwarded_by}
                                    </p>
                                )}
                                <p style={{ color: 'orange' }}>{value?.status}</p>
                            </>
                        )
                    } else if (value?.status == 'modified') {
                        return (
                            <>
                                {value?.forwarded_by != null && (
                                    <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'green' }}>
                                        forwarded by : {value.forwarded_by}
                                    </p>
                                )}
                                <p style={{ color: 'orange' }}>{value?.status}</p>
                            </>
                        )
                    } else {
                        return (
                            <>
                                {value?.forwarded_by != null && (
                                    <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'green' }}>
                                        forwarded by : {value.forwarded_by}
                                    </p>
                                )}
                                <p style={{ color: 'brown', fontStyle: 'italic' }}>Committe status {'Pending'}</p>
                            </>
                        )
                    }
                }
            }
        },
        {
            name: 'reason',
            label: 'Feedback',
            options: {
                sort: false
            }
        },
        // {
        //     name: '_id',
        //     label: 'View',
        //     options: {
        //         sort: false,
        //         filter: false,
        //         customBodyRender: (value, tableMeta) => {
        //             const statusStyle = {
        //                 padding: '6px 4px',
        //                 width: '100px',
        //                 background: '#eeeeee',
        //                 color: '#333333',
        //                 borderRadius: '4px',
        //                 textAlign: 'center'
        //             }
        //             let isAvailable
        //             if (value) {
        //                 isAvailable = 'YES'
        //             } else {
        //                 isAvailable = 'NO'
        //             }
        //             if (isAvailable) {
        //                 if (tableMeta.rowData[1] != 'pending') {
        //                     return (
        //                         <Typography
        //                             className="details-text"
        //                             onClick={() => {
        //                                 navigate(`/supervisionRequestResult/${value}/${tableMeta.rowData[2]?.status}`)
        //                             }}
        //                             sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
        //                         >
        //                             View
        //                         </Typography>
        //                     )
        //                 }
        //             }
        //         }
        //     }
        // },
        {
            name: '_id',
            label: 'View',
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
                        // fontWeight: 'bold'
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
                                        navigate(`/supervisionRequestResult/${value}/${tableMeta.rowData[2]?.status}`)
                                    }}
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
            }
        },
        // {
        //     name: '_id',
        //     label: 'Delete',
        //     options: {
        //         sort: false,
        //         filter: false,
        //         customBodyRender: (value, tableMeta) => {
        //             const statusStyle = {
        //                 padding: '6px 4px',
        //                 width: '100px',
        //                 background: '#eeeeee',
        //                 color: '#333333',
        //                 borderRadius: '4px',
        //                 textAlign: 'center'
        //             }
        //             let isAvailable
        //             if (value) {
        //                 isAvailable = 'YES'
        //             } else {
        //                 isAvailable = 'NO'
        //             }
        //             if (isAvailable) {
        //                 if (tableMeta.rowData[1] != 'pending') {
        //                     return (
        //                         <Typography
        //                             className="details-text"
        //                             onClick={() => {
        //                                 deletepdf(value)
        //                             }}
        //                             sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
        //                         >
        //                             Delete
        //                         </Typography>
        //                     )
        //                 }
        //             }
        //         }
        //     }
        // },
        {
            name: '_id',
            label: 'Delete',
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
                                        deletepdf(value)
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
        },
        // {
        //     name: '_id',
        //     label: 'Comments',
        //     options: {
        //         sort: false,
        //         filter: false,
        //         customBodyRender: (value, tableMeta) => {
        //             const statusStyle = {
        //                 padding: '6px 4px',
        //                 width: '100px',
        //                 background: '#eeeeee',
        //                 color: '#333333',
        //                 borderRadius: '4px',
        //                 textAlign: 'center'
        //             }
        //             let isAvailable
        //             if (value) {
        //                 isAvailable = 'YES'
        //             } else {
        //                 isAvailable = 'NO'
        //             }
        //             if (isAvailable) {
        //                 if (tableMeta.rowData[1] != 'pending') {
        //                     return (
        //                         <Typography
        //                             className="details-text"
        //                             onClick={() => {
        //                                 navigate(`/SeeCommentsOnDoc/${value}/student`)
        //                             }}
        //                             sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
        //                         >
        //                             See Comments
        //                         </Typography>
        //                     )
        //                 }
        //             }
        //         }
        //     }
        // }
        {
            name: '_id',
            label: 'Comments',
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
                                        navigate(`/SeeCommentsOnDoc/${value}/student`)
                                    }}
                                    sx={{ cursor: 'pointer', fontFamily: 'Outfit', fontSize: '14px', ...statusStyle }}
                                    style={{backgroundColor:'white',color:'black'}}
                                >
                                    <CommentIcon style={{color:'orange'}} />
                                    &nbsp; Comments
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

    // const options = {
    //     customHeadRender: () => ({
    //         style: {
    //             fontFamily: 'Outfit',
    //             fontSize: '48px',
    //             fontWeight: 500,
    //             lineHeight: '24px',
    //             letterSpacing: '0',
    //             textAlign: 'center'
    //         }
    //     }),
    //     responsive: 'standard',
    //     print: false,
    //     download: false,
    //     viewColumns: false,
    //     tableLayout: 'fixed',
    //     customTableBodyWidth: 'auto',
    //     tableBodyHeight: 'auto',
    //     selectableRowsHideCheckboxes: true,
    //     customToolbar: HeaderElements
    // }
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
        // <div className="bg-neutral-100  overflow-hidden flex flex-row">
        //     <Sidebar />
        //     <div className="flex flex-col flex-1">
        //         <Header />
        //         <div className="flex-1 p-4 min-h-0 overflow-auto">
        //             <div>
        //                 <Button
        //                     variant="contained"
        //                     color="primary"
        //                     onClick={() => {
        //                         navigate('/sendproposal')
        //                     }}
        //                     style={{ marginTop: '10px' }}
        //                 >
        //                     Submit New Proposal
        //                 </Button>
        //             </div>
        //             <div className="flex-1 p-4  overflow-auto">
        //                 {proposals_data.filter((item) => item.status == 'Pending').length > 0 && (
        //                     <>
        //                         <TableHeading name={'Pending '} />
        //                         <MUIDataTable
        //                             data={proposals_data.filter((item) => item.status == 'Pending')}
        //                             columns={columns}
        //                             options={options}
        //                         />
        //                     </>
        //                 )}

        //                 {proposals_data.filter((item) => item.status == 'modify').length > 0 && (
        //                     <>
        //                         <TableHeading name={'To modify '} />
        //                         <MUIDataTable
        //                             data={proposals_data.filter((item) => item.status == 'modify')}
        //                             columns={columns}
        //                             options={options}
        //                         />
        //                     </>
        //                 )}
        //                 {proposals_data.filter((item) => item.status == 'modified').length > 0 && (
        //                     <>
        //                         <TableHeading name={'Modified '} />
        //                         <MUIDataTable
        //                             data={proposals_data.filter((item) => item.status == 'modified')}
        //                             columns={columns}
        //                             options={options}
        //                         />
        //                     </>
        //                 )}

        //                 {proposals_data.filter((item) => item.status == 'rejected').length > 0 && (
        //                     <>
        //                         <TableHeading name={'Rejected '} />
        //                         <MUIDataTable
        //                             data={proposals_data.filter((item) => item.status == 'rejected')}
        //                             columns={columns}
        //                             options={options}
        //                         />
        //                     </>
        //                 )}
        //                 {proposals_data.filter((item) => item.status == 'approved').length > 0 && (
        //                     <>
        //                         <TableHeading name={'Accepted '} />
        //                         <MUIDataTable
        //                             data={proposals_data.filter((item) => item.status == 'approved')}
        //                             columns={columns}
        //                             options={options}
        //                         />
        //                     </>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-neutral-100  overflow-hidden flex flex-row" style={{ backgroundColor: '#F5F5F5' }}>
        <Sidebar />
        <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 min-h-0 overflow-auto">
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate('/sendproposal')
                        }}
                        style={{
                            marginTop: '10px',
                            width: '500px',
                            height: '300px',
                            
                            background: 'linear-gradient(45deg, #87a8d0 30%, #fc92e3 90%)', // Gradient colors here
                            borderRadius: '10px',
                            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                            color: 'white'
                        }}
                    >
                        <AddIcon style={{ fontSize: '100px' }} />
                        &nbsp; Submit New Proposal
                    </Button>
                </div>
                <div className="flex-1 p-4  overflow-auto">
                    {proposals_data.filter((item) => item.status == 'Pending').length > 0 && (
                        <>
                            <TableHeading name={'Pending '}  style={{color:'white'}}/>
                            {/* <h1 style="color:'white">Pending</h1> */}
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                    data={proposals_data.filter((item) => item.status == 'Pending')}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </>
                    )}

                    {proposals_data.filter((item) => item.status == 'modify').length > 0 && (
                        <>
                            <TableHeading name={'To modify '} />
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                    data={proposals_data.filter((item) => item.status == 'modify')}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </>
                    )}
                    {proposals_data.filter((item) => item.status == 'modified').length > 0 && (
                        <>
                            <TableHeading name={'Modified '} />
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                    data={proposals_data.filter((item) => item.status == 'modified')}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </>
                    )}

                    {proposals_data.filter((item) => item.status == 'rejected').length > 0 && (
                        <>
                            <TableHeading name={'Rejected '} />
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                    data={proposals_data.filter((item) => item.status == 'rejected')}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </>
                    )}
                    {proposals_data.filter((item) => item.status == 'approved').length > 0 && (
                        <>
                            <TableHeading name={'Accepted '} style={{color:'green'}}/>
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                    data={proposals_data.filter((item) => item.status == 'approved')}
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

export default MyProposal

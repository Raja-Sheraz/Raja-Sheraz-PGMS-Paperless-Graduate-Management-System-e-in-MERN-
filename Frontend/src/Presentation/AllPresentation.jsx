import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import MUIDataTable from 'mui-datatables'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Swal from 'sweetalert2'
import { RiPresentationFill } from 'react-icons/ri'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default function AllPresentation() {
    let [update, setupdate] = useState(false)
    const navigate = useNavigate()
    let [presentations, setpresentations] = useState([])

    let get_commetti_detail_with_commetti_id = async (id) => {
        const response = await axios.post('/get_commetti_detail_with_commetti_id', {
            commetti_id: id
        })
        return response.data[0].commetti_title
    }

    let upadateData = async () => {
        const _data = await Promise.all(
            presentations?.map(async (pres, index) => {
                // console.log(pres.presentation_commetti);
                let commetti_detail = await get_commetti_detail_with_commetti_id(pres.presentation_commetti)
                pres['commetti_title'] = commetti_detail
                return pres
            })
        )

        setpresentations(_data)
        setupdate(true)
    }

    let deletepresentation = async (id) => {
        const response = await axios.post('/delete_presentation', {
            _id: id
        })
        if (response.data.result == 'deleted') {
            get_all_presentations()
        } else {
            Swal.fire("Cann't delete!")
        }
    }
    let completepresentation = async (id) => {
        const response = await axios.post('/complete_presentation', {
            _id: id
        })
        if (response.data.result == 'Completed') {
            get_all_presentations()
        } else {
            Swal.fire('Error!')
        }
    }

    let get_all_presentations = async () => {
        const response = await axios.get('/get_all_presentations')
        setpresentations(response.data)
    }

    useEffect(() => {
        if (presentations.length > 0 && !update) {
            upadateData()
        } else if (!update) {
            get_all_presentations()
        }
    }, [presentations])

    const columns = [
        {
            name: 'presentation_description',
            label: 'Presentation',
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: 'commetti_title',
            label: 'Commetti'
        },
        {
            name: 'presentation_date',
            label: 'Date'
        },
        {
            name: 'presentation_time',
            label: 'Time'
        },
        {
            name: 'presentation_venue',
            label: 'Venue'
        },
        {
            name: 'presentation_status',
            label: 'Venue'
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
                        return (
                            <a
                                className="details-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    completepresentation(value)
                                }}
                            >
                                Complete
                            </a>
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
                        return (
                            <a
                                className="details-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    deletepresentation(value)
                                }}
                            >
                                <DeleteForeverIcon style={{ color: 'red' }} />
                                &nbsp; Delete
                            </a>
                        )
                    }
                }
            }
        }
    ]

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
                            fontFamily:'initial',
                            fontSize:'20px',
                            textAlign: 'center'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid #545B6A',
                            fontSize:'15px',
                            fontFamily:'sans-serif',
                          
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
            <div className="" style={{ width: '100%', marginLeft: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('/admin/admin/addpresentation')
                    }}
                    style={{
                        marginTop: '10px',
                        width: '400px',
                        height: '200px',
                        background: 'linear-gradient(45deg, #87a8d0 30%, #fc92e3 90%)', // Gradient colors here
                        borderRadius: '10px',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        color: '#0E1217',
                        fontSize: '25px',
                        fontWeight: 'bold'
                    }}
                >
                    <RiPresentationFill style={{ fontSize: '200px', color: '#f50057' }} />
                    Schedule Presentation
                </Button>
                <div
                    style={{
                        marginTop: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '20px',
                        color: '#0c0116'
                    }}
                >
                    <div className="">
                        <ThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable data={presentations} columns={columns} options={options} />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

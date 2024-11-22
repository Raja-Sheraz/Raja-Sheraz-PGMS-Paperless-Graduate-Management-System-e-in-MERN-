import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Input } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router'
import MUIDataTable from 'mui-datatables'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

function Addpresentation() {
    let [presentationdescription, setpresentationdescription] = useState('')
    let [selectedcommetti, setselectedcommetti] = useState(null)
    let [commettis, setcommetties] = useState(null)
    let [presentationdate, setpresentationdate] = useState(null)
    let [presentationtime, setpresentationtime] = useState(null)
    let [presentationvenue, setpresentationvenue] = useState(null)
    let navigate = useNavigate()

    let departments = ['CS', 'SE']

    useEffect(() => {
        get_all_commetties()
    }, [])

    let get_all_commetties = async () => {
        let response = await axios.get('/get_all_commetties')
        setcommetties(response.data)
    }

    let createpresentation = async () => {
        if (presentationdescription != '') {
            const response = await axios.post('/add_new_presentation', {
                presentationdate,
                presentationdescription,
                presentationtime,
                presentationvenue,
                presentationcommetti: selectedcommetti
            })
            console.log(response.data)
            if (response.status == 200) {
                navigate('/admin/admin/Presentation')
            } else {
                alert('Error occured!')
            }
        } else {
            alert('Enter title')
        }
    }

    return (
        <>
            <h1
                style={{
                    fontFamily: 'initial',
                    fontSize: '50px',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    // border: '1px solid #545B6A',
                    borderRadius: '10px',
                    color:'#7F3DD5',
                    marginLeft:'20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    
                }}
            >
                Secdule Presentaion
            </h1>
            <div
                className="d-flex col-12 "
                style={{
                    width: '80vw',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    // border: '1px solid #545B6A',
                    padding: '5px',
                    marginTop:'20px',
                    marginLeft:'20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="col-6" style={{ marginLeft: '300px' }}>
                    <div className="col-12">
                        <InputLabel className="col-12" id="title-label" style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                            Description
                        </InputLabel>
                        <Input
                            className="col-12"
                            labelId="title-label"
                            type="text"
                            value={presentationdescription}
                            onChange={(e) => setpresentationdescription(e.target.value)}
                            InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: 'black' } }} // Add border style
                            style={{color:'black'}}
                            />
                    </div>
                    <div className="col-12 mt-3">
                        <InputLabel className="col-12" id="title-label"style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                            Select Committee
                        </InputLabel>
                        <Select
                            labelId="supervisor-label"
                            id="supervisor-select"
                            label="Select Supervisor"
                            className="col-12"
                            onChange={(e) => setselectedcommetti(e.target.value)}
                            style={{color:'black'}}

                        >
                            {commettis &&
                                commettis.map((commetti, index) => (
                                    <MenuItem key={index} value={commetti._id}>
                                        {commetti.commetti_title}
                                    </MenuItem>
                                ))}
                        </Select>
                    </div>

                    <div className="col-12 mt-3">
                        <InputLabel className="col-12" id="title-label" style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                            Date
                        </InputLabel>
                        <input
                            onChange={(e) => setpresentationdate(e.target.value)}
                            type="date"
                            class="form-control"
                            style={{ backgroundColor: 'white',color:'black'}}
                        />
                    </div>
                    <div className="col-12 mt-3">
                        <InputLabel className="col-12" id="title-label" style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                            Time
                        </InputLabel>
                        <input
                            onChange={(e) => setpresentationtime(e.target.value)}
                            type="time"
                            class="form-control"
                            style={{ backgroundColor: 'white',color:'black' }}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <InputLabel className="col-12" id="title-label"style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                            Venue
                        </InputLabel>
                        <Select
                            labelId="supervisor-label"
                            id="supervisor-select"
                            label="Select Venue"
                            className="col-12"
                            onChange={(e) => setpresentationvenue(e.target.value)}
                            style={{color:'black'}}

                        >
                            <MenuItem value="Lab 8">Lab 8</MenuItem>
                            <MenuItem value="Meeting room">Meeting room</MenuItem>
                            <MenuItem value="Conference room">Conference room</MenuItem>
                            <MenuItem value="Discussion room">Discussion room</MenuItem>
                            <MenuItem value="Dhaba">Dhaba</MenuItem>
                        </Select>
                    </div>

                    <div>
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    createpresentation()
                                }}
                                style={{ marginTop: '15px' }}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addpresentation

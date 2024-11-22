// import React, { useState, useEffect, useContext } from 'react'
// import axios from 'axios'
// import { Button, Input } from '@mui/material'
// import { Navigate } from 'react-router-dom'
// import { useNavigate } from 'react-router'
// import MUIDataTable from 'mui-datatables'
// import { Typography } from '@mui/material'
// import { UserContext } from '../context/User'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import { useParams } from 'react-router-dom'
// import Sidebar from '../components/shared/Sidebar'
// import Header from '../components/shared/Header'


// function Addmeeting() {

//     const { user, setUser } = useContext(UserContext)
//     let { student_id } = useParams();

//     let [presentationdescription, setpresentationdescription] = useState('')
//     let [presentationdate, setpresentationdate] = useState(null)
//     let [presentationtime, setpresentationtime] = useState(null)
//     let [presentationvenue, setpresentationvenue] = useState(null)
//     let navigate = useNavigate()


//     let createpresentation = async () => {
//         if (presentationdescription != '') {
//             const response = await axios.post('/add_new_meeting', {
//                 presentationdate,
//                 presentationdescription,
//                 presentationtime,
//                 presentationvenue,
//                 student_id,
//                 supervisor_id: user._id
//             })
//             if (response.status == 200) {
//                 navigate('/students')
//             } else {
//                 alert('Error occured!')
//             }
//         } else {
//             alert('Enter title')
//         }
//     }

//     return (
//         <>
//             <div className="bg-neutral-100 overflow-hidden flex flex-row">
//                 <Sidebar />
//                 <div className="flex flex-col flex-1">
//                     <Header />
//                     <div className="flex-1 p-4 min-h-0 ">
//                         <div className="d-flex col-12 " style={{ width: '80vw' }}>
//                             <div className="m-3 col-6 ">
//                                 <div className="col-12">
//                                     <InputLabel className="col-12" id="title-label">
//                                         Description
//                                     </InputLabel>
//                                     <Input
//                                         className="col-12"
//                                         labelId="title-label"
//                                         type="text"
//                                         value={presentationdescription}
//                                         onChange={(e) => setpresentationdescription(e.target.value)}
//                                     />
//                                 </div>


//                                 <div className="col-12 mt-3">
//                                     <InputLabel className="col-12" id="title-label">
//                                         Date
//                                     </InputLabel>
//                                     <input onChange={(e) => setpresentationdate(e.target.value)} type="date" class="form-control" />
//                                 </div>
//                                 <div className="col-12 mt-3">
//                                     <InputLabel className="col-12" id="title-label">
//                                         Time
//                                     </InputLabel>
//                                     <input onChange={(e) => setpresentationtime(e.target.value)} type="time" class="form-control" />
//                                 </div>

//                                 <div className="col-12 mt-3">
//                                     <InputLabel className="col-12" id="title-label">
//                                         Venue
//                                     </InputLabel>
//                                     <Select
//                                         labelId="supervisor-label"
//                                         id="supervisor-select"
//                                         label="Select Venue"
//                                         className="col-12"
//                                         onChange={(e) => setpresentationvenue(e.target.value)}
//                                     >
//                                         <MenuItem value="Lab 8">Lab 8</MenuItem>
//                                         <MenuItem value="Meeting room">Meeting room</MenuItem>
//                                         <MenuItem value="Conference room">Conference room</MenuItem>
//                                         <MenuItem value="Discussion room">Discussion room</MenuItem>
//                                         <MenuItem value="Dhaba">Dhaba</MenuItem>
//                                     </Select>
//                                 </div>

//                                 <div>
//                                     <div>
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={() => {
//                                                 createpresentation()
//                                             }}
//                                             style={{ marginTop: '15px' }}
//                                         >
//                                             Create
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default Addmeeting
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Input, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import { toast } from 'react-toastify';

function Addmeeting() {
    const { user } = useContext(UserContext);
    let { student_id } = useParams();

    let [presentationdescription, setpresentationdescription] = useState('');
    let [presentationdate, setpresentationdate] = useState('');
    let [presentationtime, setpresentationtime] = useState('');
    let [presentationvenue, setpresentationvenue] = useState('');
    let navigate = useNavigate();

    let createpresentation = async () => {
        if (presentationdescription !== '') {
            try {
                const response = await axios.post('/add_new_meeting', {
                    presentationdate,
                    presentationdescription,
                    presentationtime,
                    presentationvenue,
                    student_id,
                    supervisor_id: user._id,
                });
                
                if (response.status === 200) {
                    toast.success('Meeting created successfully!');
                    navigate('/students');
                } else {
                    toast.error('Error occurred while creating the meeting!');
                }
            } catch (error) {
                console.error('Error creating meeting:', error);
                if (error.response) {
                    toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
                } else {
                    toast.error('Error occurred while creating the meeting!');
                }
            }
        } else {
            toast.error('Enter a description');
        }
    };

    return (
        <>
            <div className="bg-neutral-100 overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 min-h-0 ">
                        <div className="d-flex col-12 " style={{ width: '80vw' }}>
                            <div className="m-3 col-6 ">
                                <div className="col-12">
                                    <InputLabel className="col-12" id="description-label">
                                        Description
                                    </InputLabel>
                                    <Input
                                        className="col-12"
                                        labelId="description-label"
                                        type="text"
                                        value={presentationdescription}
                                        onChange={(e) => setpresentationdescription(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 mt-3">
                                    <InputLabel className="col-12" id="date-label">
                                        Date
                                    </InputLabel>
                                    <input onChange={(e) => setpresentationdate(e.target.value)} type="date" className="form-control" />
                                </div>
                                <div className="col-12 mt-3">
                                    <InputLabel className="col-12" id="time-label">
                                        Time
                                    </InputLabel>
                                    <input onChange={(e) => setpresentationtime(e.target.value)} type="time" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <InputLabel className="col-12" id="venue-label">
                                        Venue
                                    </InputLabel>
                                    <Select
                                        labelId="venue-label"
                                        id="venue-select"
                                        value={presentationvenue}
                                        className="col-12"
                                        onChange={(e) => setpresentationvenue(e.target.value)}
                                    >
                                        <MenuItem value="Lab 8">Lab 8</MenuItem>
                                        <MenuItem value="Meeting room">Meeting room</MenuItem>
                                        <MenuItem value="Conference room">Conference room</MenuItem>
                                        <MenuItem value="Discussion room">Discussion room</MenuItem>
                                        <MenuItem value="Dhaba">Dhaba</MenuItem>
                                    </Select>
                                </div>

                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={createpresentation}
                                        style={{ marginTop: '15px' }}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addmeeting;

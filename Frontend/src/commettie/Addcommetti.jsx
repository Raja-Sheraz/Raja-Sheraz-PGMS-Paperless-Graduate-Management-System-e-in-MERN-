// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Button, Input } from '@mui/material';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router'
// import MUIDataTable from 'mui-datatables'
// import { Typography } from '@mui/material';
// import { UserContext } from '../context/User';
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import CommettiTeacherCard from './CommettiTeacherCard';


// function Addcommetti() {


//     let [teachers, setteachers] = useState([]);
//     let [selectedteachers, setseletedteachers] = useState([]);
//     let [title, settitle] = useState('');
//     let [dep, setdep] = useState(null);
//     let [commettihead, setcommettihead] = useState(null);

//     let navigate = useNavigate();

//     let departments = [
//         'CS',
//         'SE'
//     ]

//     let createcommetti = async () => {
//         if (title != '') {
//             const response = await axios.post('/add_new_commetti', {
//                 'teachers': selectedteachers,
//                 'title': title,
//                 'department': dep,
//                 'commetti_head': commettihead
//             })
//             // console.log(response.data)
//             navigate('/admin/admin/Viewcommetties');
//         }
//         else {
//             alert('Enter title')
//         }
//     }

//     let handledepartmentchange = async (e) => {
//         setdep(e.target.value)
//         let response = await axios.get(`/get_commettie/${e.target.value}`)
//         setteachers(response.data);
//     }

//     return (
//         <>
//             <div style={{ width: '600px', margin: 10 }}>
//                 <FormControl
//                     style={{
//                         margin: 'auto',
//                         width: '50%',
//                     }}
//                 >
//                     <InputLabel id="supervisor-label">Select Department</InputLabel>
//                     <Select
//                         labelId="supervisor-label"
//                         id="supervisor-select"
//                         label="Select Supervisor"
//                         onChange={handledepartmentchange}
//                     >

//                         {departments.map((dep, index) => (
//                             <MenuItem key={index} value={dep}>
//                                 {dep}
//                             </MenuItem>
//                         ))}

//                     </Select>
//                 </FormControl>
//                 <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 5 }}>
//                     {
//                         teachers?.map((teacher) => {
//                             return <CommettiTeacherCard teacher={teacher} teachers={selectedteachers} setteachers={setseletedteachers} />
//                         })
//                     }
//                 </div>
//                 {

//                     selectedteachers.length > 0 &&
//                     <>
//                         <div>
//                             <InputLabel id="title-label">Name Commetti</InputLabel>
//                             <Input labelId="title-label" type='text' value={title} onChange={(e) => settitle(e.target.value)} />
//                         </div>

//                         <div>

//                             <FormControl
//                                 style={{
//                                     marginTop: '15px',
//                                     width: '50%',
//                                 }}
//                             >
//                                 <InputLabel id="supervisor-label">Select Commetti head</InputLabel>
//                                 <Select
//                                     labelId="supervisor-label"
//                                     id="supervisor-select"
//                                     label="Select Supervisor"
//                                     onChange={(e) => setcommettihead(e.target.value)}
//                                 >

//                                     {selectedteachers.map((dep, index) => (
//                                         <MenuItem key={index} value={dep.teacher_id}>
//                                             {dep.teacher_name}
//                                         </MenuItem>
//                                     ))}

//                                 </Select>
//                             </FormControl>
//                             <div>
//                                 <Button variant="contained" color="primary" onClick={() => { createcommetti() }} style={{ marginTop: '15px' }}>
//                                     Create
//                                 </Button>
//                             </div>
//                         </div>
//                     </>

//                 }

//             </div>

//         </>
//     )
// }

// export default Addcommetti
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
import CommettiTeacherCard from './CommettiTeacherCard'

function Addcommetti() {
    let [teachers, setteachers] = useState([])
    let [selectedteachers, setseletedteachers] = useState([])
    let [title, settitle] = useState('')
    let [dep, setdep] = useState(null)
    let [commettihead, setcommettihead] = useState(null)

    let navigate = useNavigate()

    let departments = ['CS', 'SE']

    let createcommetti = async () => {
        if (title !== '') {
            const response = await axios.post('/add_new_commetti', {
                teachers: selectedteachers,
                title: title,
                department: dep,
                commetti_head: commettihead
            })
            navigate('/admin/admin/Viewcommetties')
        } else {
            alert('Enter title')
        }
    }

    let handledepartmentchange = async (e) => {
        setdep(e.target.value)
        let response = await axios.get(`/get_commettie/${e.target.value}`)
        setteachers(response.data)
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
                    marginLeft:'90px',
                    width: '1000px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    
                }}
            >
                Secdule Presentaion
            </h1>
        <div
            style={{
                width: '1000px',
                margin: 10,
                background: 'white',
                // border: '1px solid #545B6A',
                padding: '20px',
                borderRadius: '10px',
                marginLeft: '90px',
                marginTop: '50px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <FormControl style={{ margin: 'auto', width: '50%' }}>
                <InputLabel id="supervisor-label" style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>Select Department</InputLabel>
                <Select
                    labelId="supervisor-label"
                    id="supervisor-select"
                    label="Select Supervisor"
                    onChange={handledepartmentchange}
                    style={{color:'black'}}
                >
                    {departments.map((dep, index) => (
                        <MenuItem key={index} value={dep}>
                            {dep}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 5, gap: '10px' }}>
                {teachers?.map((teacher) => (
                    <CommettiTeacherCard
                        key={teacher.id}
                        teacher={teacher}
                        teachers={selectedteachers}
                        setteachers={setseletedteachers}
                    />
                ))}
            </div>
            {selectedteachers.length > 0 && (
                <>
                    <div>
                        <InputLabel id="title-label" style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                            Committee Name
                        </InputLabel>
                        <Input
                            labelId="title-label"
                            type="text"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div>
                        <FormControl style={{ marginTop: '15px', width: '50%' }}>
                            <InputLabel id="supervisor-label" style={{color:'#7F3DD5',fontSize:'20px',fontFamily:'initial'}}>
                                Select Commetti head
                            </InputLabel>
                            <Select
                                labelId="supervisor-label"
                                id="supervisor-select"
                                label="Select Supervisor"
                                onChange={(e) => setcommettihead(e.target.value)}
                                style={{ color: 'black' }}
                            >
                                {selectedteachers.map((dep, index) => (
                                    <MenuItem key={index} value={dep.teacher_id}>
                                        {dep.teacher_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    createcommetti()
                                }}
                                style={{ marginTop: '15px', background: 'linear-gradient(to right, #ff9966, #ff5e62)' }}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
        
    )
}

export default Addcommetti

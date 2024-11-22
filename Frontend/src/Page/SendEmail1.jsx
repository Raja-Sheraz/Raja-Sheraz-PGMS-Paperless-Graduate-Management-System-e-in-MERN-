import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Container,
    Box,
    Select,
    MenuItem
} from '@material-ui/core'

export default function Second_Email() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [role, setRole] = useState([])
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios
            .get('/getUser1/' + id)
            .then((result) => {
                console.log(result)
                setRole(result.data.role)
                setEmail(result.data.email)
                setPassword(result.data.password)
            })
            .catch((err) => console.log(err))
    }, [id])

    const generateRandomPassword = () => {
        // Logic to generate a random password (customize this as needed)
        const randomPassword = Math.random().toString(36).slice(-8)
        return randomPassword
    }

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword()
        setPassword(newPassword)
        setShowPassword(true)
    }

    const SubmitData = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.put(`/updateUser1/${id}`, { role, password })
            console.log(result)
            alert('Update Data Successfully')
            navigate(`/admin/admin/teacherRegisterData/${id}`)
        } catch (err) {
            console.error(err)
        }
    }

    const SendEmail = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const res = await fetch('http://localhost:5000/emailsend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await res.json()

            if (data.status === 401 || !data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Error',
                    text: 'Please check your email.'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Send',
                    text: 'Email Send Successfully.'
                })

                // Wait for a short moment before updating to ensure the email is sent
                setTimeout(() => {
                    // Now, trigger the update operation
                    axios
                        .put('/updateUser1/' + id, { email, password, role })
                        .then((result) => {
                            console.log(result)
                            Swal.fire({
                                icon: 'success',
                                title: 'Add Role Successfully',
                                text: 'Role Add  Successfully.'
                            })
                            navigate('/admin/admin/teacherRegisterData')
                        })
                        .catch((err) => console.log(err))
                }, 1000) // You can adjust the delay based on your needs
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    let addtoRoles = (e) => {
        setRole((roles) => [...roles, e.target.value])
    }

    const handleRemoveRole = (roleToRemove) => {
        setRole(role.filter((role) => role !== roleToRemove))
    }

    return (
        <div
            style={{
                // border: '2px solid yellow',
                width: '1100px',
                // margin: '20px',
                height: '95vh',
                padding: '10px',
                backgroundColor: 'white',
                // border: '1px solid #545B6A',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    style={{ color: '#7F3DD5', fontFamily: 'initial' }}
                >
                    Add Role & Send Password
                </Typography>
                <form onSubmit={SubmitData}>
                <div className="inputFields">
                        <label style={{color:'#7F3DD5'}}>Provide Role:</label>
                        <br />
                        <select name="role" id="role" value={role} onChange={(e) => addtoRoles(e)}>
                            <option value=""></option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="CoordinateCommitte">Coordinate Committe</option>
                            <option value="DAC">DAC</option>
                            <option value="ExternalExaminer">External Examiner</option>
                        </select>
                        <div className="mt-2 mb-2">
                            {role?.length > 0 &&
                                role.map((item) => {
                                    return (
                                        <>
                                            <div className=" align-items-center col-8 d-flex border text-gray mb-1 rounded-3 border-dark " style={{height:'20px'}}>
                                                <Button
                                                    onClick={() => handleRemoveRole(item)}
                                                    // className="m-2 border rounded col-2"
                                                >
                                                    X
                                                </Button>
                                                <p>{item}</p>
                                            </div>
                                        </>
                                    )
                                })}
                        </div>
                    </div>
                    <div>
                        <label style={{ color: '#7F3DD5',fontSize:'20px' }}>Email:</label>
                        <br />
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter an Email"
                            required
                            fullWidth
                            style={{ marginBottom: '20px' }}
                            InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: 'black' } }}
                        />
                    </div>
                    <div>
                        <label style={{ color: '#7F3DD5',fontSize:'20px' }}>Password:</label>
                        <br />
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a password"
                            required
                            fullWidth
                            style={{ marginBottom: '20px' }}
                            InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: 'black' } }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            }
                            label="Show Password"
                            style={{ marginBottom: '20px',color: 'white' }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        // color="secondary"
                        onClick={handleGeneratePassword}
                        fullWidth
                        style={{ marginBottom: '20px' ,color:'white',backgroundColor:'#7F3DD5'}}
                    >
                        Generate Random Password
                    </Button>
                    <Button
                        type="submit"
                        onClick={(e) => {
                            SubmitData(e)
                            SendEmail(e)
                        }}
                        variant="contained"
                        // color="secondary"
                        fullWidth
                        disabled={loading}
                        style={{ marginBottom: '20px' ,backgroundColor:'#7F3DD5',color:'white'}}
                    >
                        {loading ? 'Sending...' : 'Provide Access'}
                    </Button>
                </form>
            </Container>
        </div>
    )
}

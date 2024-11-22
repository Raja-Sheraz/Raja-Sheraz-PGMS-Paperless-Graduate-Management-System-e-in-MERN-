// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'
// export default function SendEmail() {
//     const { id } = useParams()
//     const navigate = useNavigate()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('123')
//     const [showPassword, setShowPassword] = useState(false)
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         axios
//             .get('/getUser/' + id)
//             .then((result) => {
//                 console.log(result)
//                 setEmail(result.data.email)
//             })
//             .catch((err) => console.log(err))
//     }, [id])

//     const generateRandomPassword = () => {
//         // Logic to generate a random password (customize this as needed)
//         const randomPassword = Math.random().toString(36).slice(-8)
//         return randomPassword
//     }

//     const handleGeneratePassword = () => {
//         const newPassword = generateRandomPassword()
//         setPassword(newPassword)
//         setShowPassword(true)
//     }
//     const SubmitData = async (e) => {
//         e.preventDefault()
//         try {
//             const result = await axios.put(`/updateUser/${id}`, { email, password })
//             console.log(result)
//             alert('Update Data Successfully')
//             navigate(`/admin/admin/sendEmail/${id}`)
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     const SendEmail = async (e) => {
//         e.preventDefault()
//         try {
//             setLoading(true)

//             const res = await fetch('http://localhost:5000/emailsend', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password
//                 })
//             })

//             const data = await res.json()

//             if (data.status === 401 || !data) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Email Error',
//                     text: 'Please check your email.'
//                 })
//             } else {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Successfully Send',
//                     text: 'Email Send Successfully.'
//                 })
//                 navigate('/admin/admin/studentRegisterData')
//             }
//         } catch (error) {
//             console.error(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div>
//             <div className="title"> Send Password </div>
//             <div>
//                 <form onSubmit={SubmitData}>
//                     <div className="inputFields">
//                         <label>Email:</label>
//                         <br />
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter an Email"
//                             required
//                         />
//                         <br />
//                         <br />
//                     </div>
//                     <div className="inputFields">
//                         <label>Password:</label>
//                         <br />
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter a password"
//                             required
//                         />
//                         <br />
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={showPassword}
//                                 onChange={() => setShowPassword(!showPassword)}
//                                 style={{ height: '50px', width: '20px', textAlign: 'center' }}
//                             />
//                             Show Password
//                         </label>
//                         <br />
//                     </div>
//                     {/* <button type="submit" onClick={SendEmail} className="formBtn" disabled={loading}>
//                         {loading ? 'Sending...' : 'Provide Access'}
//                     </button> */}
//                     <button
//                         type="button" // Change to "button" to prevent form submission
//                         onClick={handleGeneratePassword}
//                         className="formBtn"
//                     >
//                         Generate Random Password
//                     </button>
//                     <button
//                         type="submit"
//                         onClick={(e) => {
//                             SubmitData(e)
//                            SendEmail(e)
//                         }}
//                         className="formBtn"
//                         disabled={loading}
//                     >
//                         {loading ? 'Sending...' : 'Provide Access'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Typography,
    Container,
    Box
} from '@material-ui/core'
import { SiWelcometothejungle } from 'react-icons/si'
import Swal from 'sweetalert2'

export default function SendEmail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('123')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios
            .get('/getUser/' + id)
            .then((result) => {
                console.log(result)
                setEmail(result.data.email)
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
            const result = await axios.put(`/updateUser/${id}`, { email, password })
            console.log(result)
            alert('Update Data Successfully')
            navigate(`/admin/admin/sendEmail/${id}`)
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
                navigate('/admin/admin/studentRegisterData')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
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
            <Container maxWidth="sm" style={{ padding: '20px', marginTop: '20px' }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    align="center"
                    style={{ color: '#7F3DD5', fontFamily: 'initial' }}
                >
                    Send Password
                </Typography>
                <form onSubmit={SubmitData}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter an Email"
                        fullWidth
                        style={{ marginBottom: '20px',color:'#7F3DD5' }} // Add margin-bottom style
                        required
                        InputProps={{
                            style: {
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                color: 'black',
                                // transition: '#f50057 0.2s ease'
                            }
                        }}
                        InputLabelProps={{ style: { color:'#7F3DD5', fontSize: '20px' } }}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a password"
                        fullWidth
                        style={{ marginBottom: '20px',  color:'#7F3DD5'}} // Add margin-bottom style
                        required
                        InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: 'black' } }} // Add border style
                        InputLabelProps={{ style: { color:'#7F3DD5', fontSize: '20px' } }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
                        label="Show Password"
                        style={{ marginBottom: '20px',color:'black' }} // Add margin-bottom style
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGeneratePassword}
                        fullWidth
                        style={{ marginBottom: '20px' }} // Add margin-bottom style
                    >
                        Generate Random Password
                    </Button>
                    <Button
                        type="submit"
                        onClick={(e) => {
                            SubmitData(e)
                           SendEmail(e)
                        }}
                        className="formBtn"
                        disabled={loading}
                         variant="contained"
                        color="primary"
                    >
                        {loading ? 'Sending...' : 'Provide Access'}
                    </Button>
                </form>
            </Container>
        </div>
    )
}

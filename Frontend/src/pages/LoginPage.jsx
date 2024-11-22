import React, { useState, useContext } from 'react'
import { UserContext } from '../context/User'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Register from './Register'
import TypingText from './TypingText'
import styled, { keyframes } from 'styled-components'

const span1 = keyframes`
  0% { top: -48%; left: -48%; }
  25% { top: -48%; left: 98%; }
  50% { top: 98%; left: 98%; }
  75% { top: 98%; left: -48%; }
  100% { top: -48%; left: -48%; }
`

const span2 = keyframes`
  0% { bottom: -48%; right: -48%; }
  25% { bottom: -48%; right: 98%; }
  50% { bottom: 98%; right: 98%; }
  75% { bottom: 98%; right: -48%; }
  100% { bottom: -48%; right: -48%; }
`

const span3 = keyframes`
  0% { top: -48%; left: -48%; }
  25% { top: -48%; left: 98%; }
  50% { top: 98%; left: 98%; }
  75% { top: 98%; left: -48%; }
  100% { top: -48%; left: -48%; }
`

const span4 = keyframes`
  0% { bottom: -48%; right: -48%; }
  25% { bottom: -48%; right: 98%; }
  50% { bottom: 98%; right: 98%; }
  75% { bottom: 98%; right: -48%; }
  100% { bottom: -48%; right: -48%; }
`

const Form = styled.div`
    position: relative;
    padding: 60px 15px;
    width: 400px;
    height: 500px;
    background: white;
    overflow: hidden;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);

    border-radius: 5px;
`

const FormInner = styled.div`
    position: absolute;
    height: 98%;
    width: 98%;
    top: 50%;
    left: 50%;
    background: white;
    transform: translate(-50%, -50%);
`

const Content = styled.div`
    height: 100%;
    width: 100%;
    padding: 25px;
`

const Title = styled.h2`
    font-size: 25px;
    color: #7F3DD5;
    text-align: center;
    padding-top: 35px;
`

const Input = styled.input`
    display: block;
    padding: 12px 15px;
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
    border: 1.5px solid rgb(109, 87, 121);
    outline: none;
    background: white;
    color: black;
`

const Button = styled.button`
    cursor: pointer;
    color: white;
    margin-top: 40px;
    width: 100%;
    padding: 12px;
    outline: none;
    background: #7F3DD5;
    border: none;
    font-size: 18px;
    border-radius: 10px;
    transition: 0.4s;

    &:hover {
        background: #7F3DD5;
    }
`

const Span = styled.span`
    position: absolute;
    height: 50%;
    width: 50%;
`

const Span1 = styled(Span)`
    background: #ffda05;
    top: 0;
    left: -48%;
    animation: ${span1} 5s infinite linear;
    animation-delay: 1s;
`

const Span2 = styled(Span)`
    background: #00a800;
    bottom: 0;
    right: -48%;
    animation: ${span2} 5s infinite linear;
`

const Span3 = styled(Span)`
    background: #800080;
    right: -48%;
    top: 0;
    animation: ${span3} 5s infinite linear;
`

const Span4 = styled(Span)`
    background: #ff0000;
    bottom: 0;
    right: -48%;
    animation: ${span4} 5s infinite linear;
    animation-delay: 1s;
`

const inputStyle = {
    display: 'block',
    padding: '12px 15px',
    width: '100%',
    borderRadius: '10px',
    marginTop: '20px',
    border: '1.5px solid rgb(109, 87, 121)',
    outline: 'none',
    background: 'white',
    color: 'black'
}


function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleRoleChange = (e) => setRole(e.target.value)
    const handleRememberMeChange = () => setRememberMe(!rememberMe)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide both email and password.'
            })
            return
        }

        const baseAxios = axios.create({
            baseURL: 'http://localhost:5000'
        })

        try {
            let loginData = { email, password }

            if (email === 'umarali031158@gmail.com' && password === '@Umarali104') {
                navigate('/admin/admin/dashboard')
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfully',
                    text: 'Welcome! Muhammad Umar',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                if (role) {
                    loginData = { ...loginData, role }
                }

                const response = await baseAxios.post(role ? '/login1' : '/login', loginData)

                if (response?.data?.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.error
                    })
                } else {
                    setUser(response.data)
                    sessionStorage.setItem('logged_user_role', role)
                    navigate('/dashboard')
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Some Thing Went Wrong'
            })
        }
    }
    const parentStyle = {
        display: 'flex'
    }

    const child1Style = {
        width: '40%',
        // backgroundColor: 'lightblue',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        height:'100vh',
        backgroundColor: '#F5F5F5',
        color:'#7F3DD5'
    }

    const child2Style = {
        width: '60%',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100vh',
    }

    return (
        // <div className="bg-gradient">
        //     <p
        //         className="mx-4 text-4xl mb-4 text-center font-extrabold text-white"
        //         style={{
        //             fontSize: '50px',
        //             fontFamily: 'Montserrat, sans-serif', // Change to a professional font
        //             textTransform: 'uppercase', // Uppercase for a more bold look
        //             letterSpacing: '5px',
        //             borderRadius: '10px',
        //             padding: '10px',
        //             position: 'absolute',
        //             top: '20px',
        //             left: '20px',
        //             background: 'linear-gradient(to right, #3498db, #2c3e50)', // Gradient background
        //             WebkitBackgroundClip: 'text', // Clip text to background
        //             color: 'transparent' // Make text transparent
        //         }}
        //     >
        //         PGMS
        //     </p>

        //     <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        //         <div className="md:w-1/3 max-w-sm">{/* Removed the image */}</div>
        //         <div className="md:w-1/3 max-w-sm">
        //             <div className="mb-4">
        //                 <p className="mx-4 text-2xl mb-4 text-center font-semibold text-blue-500">LOGIN</p>
        //             </div>

        //             <TextField
        //                 label="Email"
        //                 variant="outlined"
        //                 value={email}
        //                 onChange={handleEmailChange}
        //                 fullWidth
        //                 autoComplete="on"
        //                 inputProps={{ style: { fontSize: 16, color: 'black' } }}
        //                 InputLabelProps={{ style: { fontSize: 16, color: '#2c3e50' } }}
        //             />
        //             <TextField
        //                 style={{ marginTop: '20px' }}
        //                 label="Password"
        //                 variant="outlined"
        //                 value={password}
        //                 type="password"
        //                 onChange={handlePasswordChange}
        //                 fullWidth
        //                 autoComplete="on"
        //                 inputProps={{ style: { fontSize: 16, color: 'black' } }}
        //                 InputLabelProps={{ style: { fontSize: 16, color: '#2c3e50' } }}
        //             />

        //             <FormControl fullWidth style={{ marginTop: '20px' }}>
        //                 <InputLabel id="role-label" style={{ fontSize: 16, color: '#2c3e50' }}>
        //                     Role
        //                 </InputLabel>
        //                 <Select
        //                     style={{ color: 'black' }}
        //                     labelId="role-label"
        //                     id="role"
        //                     value={role}
        //                     label="Role"
        //                     onChange={handleRoleChange}
        //                 >
        //                     <MenuItem value="Supervisor">Supervisor</MenuItem>
        //                     <MenuItem value="CoordinateCommitte">Committee</MenuItem>
        //                     <MenuItem value="DAC">DAC</MenuItem>
        //                     <MenuItem value="External Examiner">External Examiner</MenuItem>
        //                     <MenuItem value="dean">Dean</MenuItem>
        //                 </Select>
        //                 <p
        //                     style={{
        //                         fontSize: '15px',
        //                         color: 'black',
        //                         marginTop: '4px'
        //                     }}
        //                 >
        //                     <span style={{ color: 'red', fontSize: '20px', marginRight: '2px', fontWeight: 'bold' }}>
        //                         *
        //                     </span>
        //                     Optional for students
        //                 </p>
        //             </FormControl>

        //             <div className="text-center md:text-left">
        //                 <button
        //                     className="mt-4 px-6 py-3 text-white uppercase rounded text-lg font-semibold transition duration-300 ease-in-out"
        //                     type="submit"
        //                     onClick={handleSubmit}
        //                     style={{
        //                         width: '100%',
        //                         background: 'linear-gradient(to right, #3498db, #2c3e50)' // Adjust the colors as needed
        //                     }}
        //                 >
        //                     Login
        //                 </button>
        //             </div>

        //             <div className="mt-4 font-semibold text-sm text-gray-600 text-center md:text-left">
        //                 <p style={{ color: 'black' }}>Don't have an account?</p>
        //                 <Link
        //                     className="text-red-600 hover:underline hover:underline-offset-4"
        //                     to="/studentRegistration"
        //                     style={{ letterSpacing: '1px' }}
        //                 >
        //                     Register as a Student
        //                 </Link>
        //                 <br />
        //                 <Link
        //                     className="text-red-600 hover:underline hover:underline-offset-4"
        //                     to="/teacherRegistration"
        //                     style={{ letterSpacing: '1px' }}
        //                 >
        //                     Register as a Teacher
        //                 </Link>
        //                 <br />
        //             </div>
        //         </div>
        //     </section>
        // </div>
        <div style={parentStyle}>
        <div style={child1Style}>
            <h1 style={{marginTop:'20px',marginLeft:'20px',fontSize:'50px',letterSpacing:'2px',fontWeight:'bold',fontFamily:'initial',color:'#7F3DD5'}}>PGMS</h1><br></br>
            <h1 style={{marginTop:'50px',marginLeft:'20px',fontSize:'20px'}}>Welcome To !</h1>
            <TypingText text="Paperless Graduate Research Management System." />
        </div>
        <div style={child2Style}>
            <Form>
                {/* <Span1 /> */}
                {/* <Span2 /> */}
                {/* <Span3 /> */}
                {/* <Span4 /> */}
                <FormInner>
                    <Title>LOGIN</Title>
                    <Content>
                        <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <select
                            style={{ ...inputStyle, appearance: 'none' }}
                            id="role-label"
                            value={role}
                            onChange={handleRoleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="CoordinateCommitte">Committe</option>
                            <option value="DAC">Dac</option>
                            <option value="dean">Deen</option>
                        </select>
                        <Button type="submit" onClick={handleSubmit}>
                            LOGIN
                        </Button>
                        <p style={{ color: 'gray',marginTop:'10px' }}>Don't have an account?</p>
                        <Link
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            to="/studentRegistration"
                            style={{ letterSpacing: '1px',marginTop:'15px' }}
                        >
                            Register as a Student{' '}
                        </Link>{' '}
                        <br />{' '}
                        <Link
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            to="/teacherRegistration"
                            style={{ letterSpacing: '1px' }}
                        >
                            {' '}
                            Register as a Teacher{' '}
                        </Link>
                    </Content>
                </FormInner>
            </Form>
        </div>
    </div>
    )
}

export default LoginPage
// import React, { useState, useContext } from 'react'
// import { UserContext } from '../context/User'
// import styled, { keyframes } from 'styled-components'
// import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { Height } from '@material-ui/icons'
// import TypingText from './TypingText'
// const span1 = keyframes`
//   0% { top: -48%; left: -48%; }
//   25% { top: -48%; left: 98%; }
//   50% { top: 98%; left: 98%; }
//   75% { top: 98%; left: -48%; }
//   100% { top: -48%; left: -48%; }
// `

// const span2 = keyframes`
//   0% { bottom: -48%; right: -48%; }
//   25% { bottom: -48%; right: 98%; }
//   50% { bottom: 98%; right: 98%; }
//   75% { bottom: 98%; right: -48%; }
//   100% { bottom: -48%; right: -48%; }
// `

// const span3 = keyframes`
//   0% { top: -48%; left: -48%; }
//   25% { top: -48%; left: 98%; }
//   50% { top: 98%; left: 98%; }
//   75% { top: 98%; left: -48%; }
//   100% { top: -48%; left: -48%; }
// `

// const span4 = keyframes`
//   0% { bottom: -48%; right: -48%; }
//   25% { bottom: -48%; right: 98%; }
//   50% { bottom: 98%; right: 98%; }
//   75% { bottom: 98%; right: -48%; }
//   100% { bottom: -48%; right: -48%; }
// `

// const Form = styled.div`
//     position: relative;
//     padding: 60px 15px;
//     width: 400px;
//     height: 500px;
//     background: #0c0116;
//     overflow: hidden;
//     box-shadow: 0px 0px 10px 0px rgb(116, 119, 114);
//     border-radius: 5px;
// `

// const FormInner = styled.div`
//     position: absolute;
//     height: 98%;
//     width: 98%;
//     top: 50%;
//     left: 50%;
//     background: #0c0116;
//     transform: translate(-50%, -50%);
// `

// const Content = styled.div`
//     height: 100%;
//     width: 100%;
//     padding: 25px;
// `

// const Title = styled.h2`
//     font-size: 25px;
//     color: #d7a3d7;
//     text-align: center;
//     padding-top: 35px;
// `

// const Input = styled.input`
//     display: block;
//     padding: 12px 15px;
//     width: 100%;
//     border-radius: 10px;
//     margin-top: 20px;
//     border: 1.5px solid rgb(109, 87, 121);
//     outline: none;
//     background: #19052c;
//     color: white;
// `

// const Button = styled.button`
//     cursor: pointer;
//     color: white;
//     margin-top: 40px;
//     width: 100%;
//     padding: 12px;
//     outline: none;
//     background: #800080;
//     border: none;
//     font-size: 18px;
//     border-radius: 10px;
//     transition: 0.4s;

//     &:hover {
//         background: #c907c9;
//     }
// `

// const Span = styled.span`
//     position: absolute;
//     height: 50%;
//     width: 50%;
// `

// const Span1 = styled(Span)`
//     background: #ffda05;
//     top: 0;
//     left: -48%;
//     animation: ${span1} 5s infinite linear;
//     animation-delay: 1s;
// `

// const Span2 = styled(Span)`
//     background: #00a800;
//     bottom: 0;
//     right: -48%;
//     animation: ${span2} 5s infinite linear;
// `

// const Span3 = styled(Span)`
//     background: #800080;
//     right: -48%;
//     top: 0;
//     animation: ${span3} 5s infinite linear;
// `

// const Span4 = styled(Span)`
//     background: #ff0000;
//     bottom: 0;
//     right: -48%;
//     animation: ${span4} 5s infinite linear;
//     animation-delay: 1s;
// `

// const inputStyle = {
//     display: 'block',
//     padding: '12px 15px',
//     width: '100%',
//     borderRadius: '10px',
//     marginTop: '20px',
//     border: '1.5px solid rgb(109, 87, 121)',
//     outline: 'none',
//     background: '#19052c',
//     color: 'white'
// }

// const LoginPage = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [role, setRole] = useState('')
//     const { setUser } = useContext(UserContext)
//     const navigate = useNavigate()

//     const handleEmailChange = (e) => setEmail(e.target.value)
//     const handlePasswordChange = (e) => setPassword(e.target.value)
//     const handleRoleChange = (e) => setRole(e.target.value)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (!email || !password) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Please provide both email and password.'
//             })
//             return
//         }

//         const baseAxios = axios.create({
//             baseURL: 'http://localhost:5000'
//         })

//         try {
//             let loginData = { email, password }

//             if (email === 'umarali031158@gmail.com' && password === '@Umarali104') {
//                 navigate('/admin/admin/dashboard')
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Login Successfully',
//                     text: 'Welcome! Muhammad Umar',
//                     showConfirmButton: false,
//                     timer: 3000
//                 })
//             } else {
//                 if (role) {
//                     loginData = { ...loginData, role }
//                 }

//                 const response = await baseAxios.post(role ? '/login1' : '/login', loginData)

//                 if (response?.data?.error) {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: response.data.error
//                     })
//                 } else {
//                     setUser(response.data)
//                     navigate('/dashboard')
//                 }
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Some Thing Went Wrong'
//             })
//         }
//     }

//     const parentStyle = {
//         display: 'flex'
//     }

//     const child1Style = {
//         width: '40%',
//         // backgroundColor: 'lightblue',
//         // display: 'flex',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//         height:'100vh',
//         backgroundColor: '#0c0116',
//         color:'#E0E0E0'
//     }

//     const child2Style = {
//         width: '60%',
//         backgroundColor: '#0c0116',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height:'100vh',
//     }
//     return (
//         <div style={parentStyle}>
//             <div style={child1Style}>
//                 <h1 style={{marginTop:'20px',marginLeft:'20px',fontSize:'50px',letterSpacing:'2px',fontWeight:'bold',fontFamily:'initial',color:'#C907C9'}}>PGMS</h1><br></br>
//                 <h1 style={{marginTop:'50px',marginLeft:'20px',fontSize:'20px'}}>Welcome To !</h1>
//                 <TypingText text="Paperless Graduate Research Management System." />
//             </div>
//             <div style={child2Style}>
//                 <Form>
//                     <Span1 />
//                     <Span2 />
//                     <Span3 />
//                     <Span4 />
//                     <FormInner>
//                         <Title>LOGIN</Title>
//                         <Content>
//                             <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
//                             <Input
//                                 type="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                             />
//                             <select
//                                 style={{ ...inputStyle, appearance: 'none' }}
//                                 id="role-label"
//                                 value={role}
//                                 onChange={handleRoleChange}
//                             >
//                                 <option value="">Select Role</option>
//                                 <option value="Supervisor">Supervisor</option>
//                                 <option value="CoordinateCommitte">Committe</option>
//                                 <option value="DAC">Dac</option>
//                                 <option value="dean">Deen</option>
//                             </select>
//                             <Button type="submit" onClick={handleSubmit}>
//                                 LOGIN
//                             </Button>
//                             <p style={{ color: 'gray',marginTop:'10px' }}>Don't have an account?</p>
//                             <Link
//                                 className="text-red-600 hover:underline hover:underline-offset-4"
//                                 to="/studentRegistration"
//                                 style={{ letterSpacing: '1px',marginTop:'15px' }}
//                             >
//                                 Register as a Student{' '}
//                             </Link>{' '}
//                             <br />{' '}
//                             <Link
//                                 className="text-red-600 hover:underline hover:underline-offset-4"
//                                 to="/teacherRegistration"
//                                 style={{ letterSpacing: '1px' }}
//                             >
//                                 {' '}
//                                 Register as a Teacher{' '}
//                             </Link>
//                         </Content>
//                     </FormInner>
//                 </Form>
//             </div>
//         </div>
//     )
// }

// export default LoginPage

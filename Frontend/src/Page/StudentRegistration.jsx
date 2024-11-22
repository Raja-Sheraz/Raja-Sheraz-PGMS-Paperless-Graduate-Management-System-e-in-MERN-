// import { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'

// const StudentRegistration = () => {
//     const [name, setName] = useState('')
//     const [cnic, setCnic] = useState('')
//     const [phone, setPhone] = useState('')
//     const [address, setAddress] = useState('')
//     const [email, setEmail] = useState('')
//     const [department, setDepartment] = useState('') // Added state for department
//     const [gender, setGender] = useState('')
//     const [password, setPassword] = useState('') // Added state for gender
//     const [regNo, setRegNo] = useState('')
//     const navigate = useNavigate()

//     const [errors, setErrors] = useState({
//         name: '',
//         cnic: '',
//         phone: ''
//         // Add similar error state variables for other fields
//     })

//     const validateForm = () => {
//         let isValid = true
//         const newErrors = {}

//         // Validation for name (only characters)
//         const nameRegex = /^[A-Za-z ]+$/
//         if (!nameRegex.test(name)) {
//             newErrors.name = 'Please enter a valid name with only characters.'
//             isValid = false
//         } else {
//             newErrors.name = ''
//         }

//         // Validation for CNIC (exactly 13 digits)
//         const cnicRegex = /^\d{13}$/
//         if (!cnicRegex.test(cnic)) {
//             newErrors.cnic = 'Please enter a valid CNIC with exactly 13 digits.'
//             isValid = false
//         } else {
//             newErrors.cnic = ''
//         }

//         // Validation for phone number (exactly 11 digits)
//         const phoneRegex = /^\d{11}$/
//         if (!phoneRegex.test(phone)) {
//             newErrors.phone = 'Please enter a valid phone number with exactly 11 digits.'
//             isValid = false
//         } else {
//             newErrors.phone = ''
//         }
//         // Set errors state with the new error messages
//         setErrors(newErrors)

//         return isValid
//     }

//     const handleInput = (e) => {
//         e.preventDefault()
//         if (!validateForm()) {
//             // Use SweetAlert2 to display an error message
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Validation Error',
//                 text: 'Please check your input and try again.'
//             })
//             return
//         }

//         axios
//             .post('/studentRegistration', {
//                 name,
//                 cnic,
//                 phone,
//                 address,
//                 email,
//                 department,
//                 gender,
//                 regNo,
//                 password
//             })
//             .then((result) => {
//                 console.log(result)
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Register Successfully',
//                     text: "After Further Investigation You will recieve you'r Password Via Email."
//                 })
//                 navigate('/login')
//             })
//             .catch((err) => console.log(err))
//         setName('')
//         setCnic('')
//         setPhone('')
//         setAddress('')
//         setEmail('')
//         setDepartment('') // Clear department state after submission
//         setGender('')
//         setPassword('')
//         setRegNo('')
//     }
//     const handleChange = (e) => {
//       const value = e.target.value.toUpperCase(); // Convert input to uppercase
//       console.log('Input value:', value); // Debugging: log the input value
//       const regex = /^FA\d{2}-SP\d{2}-[A-Z]{3}-\d{3}$/;
  
//       // Validate against the regex pattern
//       if (regex.test(value) || value === '') {
//         setRegNo(value);
//       }
//     };

//     return (
//         <div className="contain">
//             <div className="title1">Student Registration</div>
//             <div>
//                 <form onSubmit={handleInput}>
//                     <div className="studentForm1">
//                         <div className="inputFields1">
//                             <label>Name:</label>
//                             <br />

//                             <input
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 placeholder="Enter First Name"
//                                 required
//                             />
//                             <br />
//                             <div className="error-message" style={{ color: 'red' }}>
//                                 {errors.name}
//                             </div>
//                             <br />
//                         </div>
//                         <div className="inputFields1">
//                             <label>CNIC:</label>
//                             <br />
//                             <input
//                                 type="text"
//                                 value={cnic}
//                                 onChange={(e) => setCnic(e.target.value)}
//                                 placeholder="e.g 1310110873533"
//                                 required
//                             />
//                             <br />
//                             <div className="error-message" style={{ color: 'red' }}>
//                                 {errors.cnic}
//                             </div>
//                             <br />
//                         </div>
//                         <div className="inputFields1">
//                             <label>Department:</label>
//                             <br />
//                             <select
//                                 name="dept"
//                                 id="dept"
//                                 value={department}
//                                 onChange={(e) => setDepartment(e.target.value)}
//                                 required
//                             >
//                                 <option value=""></option>
//                                 <option value="CS">Computer Science</option>
//                                 <option value="SE">Software Engineering</option>
//                                 <option value="PHM">Pharmacy</option>
//                                 <option value="CVE">Civil Engineering</option>
//                             </select>
//                         </div>

//                         <div className="inputFields1">
//                             <label>Phone No:</label>
//                             <br />
//                             <input
//                                 type="text"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}
//                                 placeholder="+92311-------"
//                                 required
//                             />
//                             <br />
//                             <div className="error-message" style={{ color: 'red' }}>
//                                 {errors.phone}
//                             </div>
//                             <br />
//                         </div>
//                         <div className="inputFields1">
//                             <label>Email:</label>
//                             <br />
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Enter an Email"
//                                 required
//                             />
//                             <br />
//                             <br />
//                         </div>
//                         <div className="inputFields1">
//                             <label>Address:</label>
//                             <br />
//                             <input
//                                 type="text"
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                                 placeholder="e.g Orish Colony Nawasher"
//                                 required
//                             />
//                             <br />
//                             <br />
//                         </div>
//                         <div className="inputFields1">
//       <label>Reg No:</label>
//       <br />
//       <input
//         type="text"
//         value={regNo}
//         onChange={handleChange}
//         placeholder="e.g FA20-SP23-BCS-104"
//         required
//         style={{ borderColor: regNo === '' ? 'red' : 'initial' }} // Debugging style to see if it reacts to changes
//       />
//       <br />
//       <br />
//     </div>
//                         <div className="radioStyle1">
//                             <label>Gender:</label>
//                             <br />
//                             <div>
//                                 <input
//                                     type="radio"
//                                     id="male"
//                                     name="gender"
//                                     checked={gender === 'male'}
//                                     onChange={() => setGender('male')}
//                                 />
//                                 <label htmlFor="male">Male</label>
//                             </div>
//                             <div>
//                                 <input
//                                     type="radio"
//                                     id="female"
//                                     name="gender"
//                                     checked={gender === 'female'}
//                                     onChange={() => setGender('female')}
//                                 />
//                                 <label htmlFor="female">Female</label>
//                             </div>
//                         </div>
//                     </div>
//                     <button className="formBtn1" type="submit">
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default StudentRegistration
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const StudentRegistration = () => {
    const [name, setName] = useState('')
    const [cnic, setCnic] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('') 
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('') 
    const [regNo, setRegNo] = useState('')
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        name: '',
        cnic: '',
        phone: '',
        regNo: '' // Added error state for regNo
    })

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        const nameRegex = /^[A-Za-z ]+$/
        if (!nameRegex.test(name)) {
            newErrors.name = 'Please enter a valid name with only characters.'
            isValid = false
        } else {
            newErrors.name = ''
        }

        const cnicRegex = /^\d{13}$/
        if (!cnicRegex.test(cnic)) {
            newErrors.cnic = 'Please enter a valid CNIC with exactly 13 digits.'
            isValid = false
        } else {
            newErrors.cnic = ''
        }

        const phoneRegex = /^\d{11}$/
        if (!phoneRegex.test(phone)) {
            newErrors.phone = 'Please enter a valid phone number with exactly 11 digits.'
            isValid = false
        } else {
            newErrors.phone = ''
        }

        // Updated regex to match both formats
        const regNoRegex = /^(FA\d{2}-[A-Z]{3}-\d{3}|SP\d{2}-[A-Z]{3}-\d{3})$/
        if (!regNoRegex.test(regNo) && regNo !== '') {
            newErrors.regNo = 'Please enter a valid registration number in the format FA20-BCS-104 or SP20-BCE-014.'
            isValid = false
        } else {
            newErrors.regNo = ''
        }

        setErrors(newErrors)
        return isValid
    }

    const formatRegNo = (value) => {
        // Remove all non-alphanumeric characters
        value = value.replace(/[^A-Z0-9]/g, '')
        
        if (value.startsWith('FA') || value.startsWith('SP')) {
            // Format for FA or SP series
            if (value.length <= 4) {
                // Add dash after the first 4 characters
                return value.replace(/(.{4})/, '$1-')
            } else if (value.length <= 7) {
                // Add dash after the next 3 characters
                return value.replace(/(.{4})(.{3})/, '$1-$2-')
            } else {
                // Format the full value
                return value.replace(/(.{4})(.{3})(.{3})/, '$1-$2-$3')
            }
        } else {
            return value
        }
    }

    const handleInput = (e) => {
        e.preventDefault()
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please check your input and try again.'
            })
            return
        }

        axios
            .post('/studentRegistration', {
                name,
                cnic,
                phone,
                address,
                email,
                department,
                gender,
                regNo,
                password
            })
            .then((result) => {
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Register Successfully',
                    text: "After further investigation, you will receive your password via email."
                })
                navigate('/login')
            })
            .catch((err) => console.log(err))
        setName('')
        setCnic('')
        setPhone('')
        setAddress('')
        setEmail('')
        setDepartment('')
        setGender('')
        setPassword('')
        setRegNo('')
    }

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase()
        console.log('Input value:', value)
        setRegNo(formatRegNo(value))
    }

    return (
        <div className="contain">
            <div className="title1">Student Registration</div>
            <div>
                <form onSubmit={handleInput}>
                    <div className="studentForm1">
                        <div className="inputFields1">
                            <label>Name:</label>
                            <br />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter First Name"
                                required
                            />
                            <br />
                            <div className="error-message" style={{ color: 'red' }}>
                                {errors.name}
                            </div>
                            <br />
                        </div>
                        <div className="inputFields1">
                            <label>CNIC:</label>
                            <br />
                            <input
                                type="text"
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)}
                                placeholder="e.g 1310110873533"
                                required
                            />
                            <br />
                            <div className="error-message" style={{ color: 'red' }}>
                                {errors.cnic}
                            </div>
                            <br />
                        </div>
                        <div className="inputFields1">
                            <label>Department:</label>
                            <br />
                            <select
                                name="dept"
                                id="dept"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            >
                                <option value=""></option>
                                <option value="CS">Computer Science</option>
                                <option value="SE">Software Engineering</option>
                                <option value="PHM">Pharmacy</option>
                                <option value="CVE">Civil Engineering</option>
                            </select>
                        </div>

                        <div className="inputFields1">
                            <label>Phone No:</label>
                            <br />
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+92311-------"
                                required
                            />
                            <br />
                            <div className="error-message" style={{ color: 'red' }}>
                                {errors.phone}
                            </div>
                            <br />
                        </div>
                        <div className="inputFields1">
                            <label>Email:</label>
                            <br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter an Email"
                                required
                            />
                            <br />
                            <br />
                        </div>
                        <div className="inputFields1">
                            <label>Address:</label>
                            <br />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="e.g Orish Colony Nawasher"
                                required
                            />
                            <br />
                            <br />
                        </div>
                        <div className="inputFields1">
                            <label>Reg No:</label>
                            <br />
                            <input
                                type="text"
                                value={regNo}
                                onChange={handleChange}
                                placeholder="e.g FA20-BCS-104"
                                required
                                style={{ borderColor: errors.regNo ? 'red' : 'initial' }}
                            />
                            <br />
                            <div className="error-message" style={{ color: 'red' }}>
                                {errors.regNo}
                            </div>
                            <br />
                        </div>
                        <div className="radioStyle1">
                            <label>Gender:</label>
                            <br />
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    checked={gender === 'male'}
                                    onChange={() => setGender('male')}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    checked={gender === 'female'}
                                    onChange={() => setGender('female')}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <button className="formBtn1" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StudentRegistration

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const TeacherUpdate = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [cnic, setCnic] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [gender, setGender] = useState('')
    const [qualification, setQualification] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        axios
            .get('/getUser1/' + id)
            .then((result) => {
                console.log(result)
                setName(result.data.name)
                setCnic(result.data.cnic)
                setPhone(result.data.phone)
                setAddress(result.data.address)
                setEmail(result.data.email)
                setDepartment(result.data.department)
                setGender(result.data.gender)
                setQualification(result.data.qualification)
                setRole(result.data.role)
                // Ensure that the 'name' value is properly assigned
            })
            .catch((err) => console.log(err))
    }, [])
    const SubmitData = (e) => {
        e.preventDefault()
        axios
            .put('/updateTeacherData/' + id, {
                name,
                cnic,
                phone,
                address,
                email,
                department,
                gender,
                qualification,
                role
            })
            .then((result) => {
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successfully',
                    text: 'Students Record Updated'
                })
                navigate('/admin/admin/teacherRegisterData')
            })
            .catch((err) => console.log(err))
    }

    let addtoRoles = (e) => {
        setRole((roles) => [...roles, e.target.value])
    }

    const handleRemoveRole = (roleToRemove) => {
        setRole(role.filter((role) => role !== roleToRemove))
    }

    return (
        <>
            <div className="title">Update Teacher Data</div>
            <div>
                <form onSubmit={SubmitData}>
                    <div className="studentForm">
                        <div className="inputFields">
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

                            <br />
                        </div>
                        <div className="inputFields">
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
                            {/* <div className="error-message" style={{ color: "red" }}>
                {errors.cnic}
              </div> */}
                            <br />
                        </div>
                        <div className="inputFields">
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
                        <div className="inputFields">
                            <label>Qualification:</label>
                            <br></br>
                            <select
                                name="qualification"
                                id="qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                required
                            >
                                <option value=""></option>
                                <option value="Master">Master</option>
                                <option value="PHD">PHD</option>
                                <option value="Postdoctral">PostDoctral</option>
                            </select>
                        </div>
                        <div className="inputFields">
                            <label>Add Role:</label>
                            <br />
                            <select name="role" id="role" value={role} onChange={(e) => addtoRoles(e)}>
                                <option value=""></option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="CoordinateCommitte">Coordinate Committe</option>
                                <option value="DAC">DAC</option>
                                <option value="ExternalExaminer">External Examiner</option>
                                <option value="dean">Dean</option>
                            </select>
                            <div className="mt-2 mb-2">
                                {role?.length > 0 &&
                                    role.map((item) => {
                                        return (
                                            <>
                                                <div className=" align-items-center col-8 d-flex border text-gray mb-1 rounded-3 border-dark ">
                                                    <button
                                                        onClick={() => handleRemoveRole(item)}
                                                        className="m-2 border rounded col-2"
                                                    >
                                                        X
                                                    </button>
                                                    <p>{item}</p>
                                                </div>
                                            </>
                                        )
                                    })}
                            </div>
                        </div>

                        <div className="inputFields">
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
                            {/* <div className="error-message" style={{ color: "red" }}>
                {errors.phone}
              </div> */}
                            <br />
                        </div>
                        <div className="inputFields">
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
                        <div className="inputFields">
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
                        <div className="radioStyle">
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
                    <button className="formBtn" type="submit">
                        Update Data
                    </button>
                </form>
            </div>
        </>
    )
}

export default TeacherUpdate

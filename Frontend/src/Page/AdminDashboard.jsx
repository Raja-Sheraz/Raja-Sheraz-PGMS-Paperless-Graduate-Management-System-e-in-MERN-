// import { BsSearch } from 'react-icons/bs'
// import { FaUserGraduate, FaUserTie, FaUsers, FaChalkboardTeacher } from 'react-icons/fa'

// const AdminDashboard = () => {
//     const studentClick = () => {
//         alert('Student Div Click')
//     }
//     return (
//         <>
//             <div className="searchbar">
//                 <input type="text" placeholder="Search.." />
//                 <BsSearch className="search-icon" />
//             </div>
//             <div className="adminMain">
//                 <div onClick={studentClick} className="adminInner">
//                     <FaUserGraduate
//                         size="2em"
//                         style={{
//                             width: '150px',
//                             height: '150px'
//                         }}
//                     />
//                     <h1
//                         style={{
//                             fontSize: '30px',
//                             fontWeight: 'bold',
//                             color: 'white',
//                             letterSpacing: '2px'
//                         }}
//                     >
//                         Student
//                     </h1>
//                 </div>
//                 <div className="adminInner">
//                     <FaUserTie size="2em"
//                      style={{
//                       width: '150px',
//                       height: '150px'
//                   }}
//                    />
//                     <h1
//                       style={{
//                         fontSize: '30px',
//                         fontWeight: 'bold',
//                         color: 'white',
//                         letterSpacing: '2px'
//                     }}
//                     >Supervisor</h1>
//                 </div>
//                 <div className="adminInner">
//                     <FaUsers size="2em"
                    
//                     style={{
//                       width: '150px',
//                       height: '150px'
//                   }}
//                   />
//                     <h1
//                       style={{
//                         fontSize: '30px',
//                         fontWeight: 'bold',
//                         color: 'white',
//                         letterSpacing: '2px'
//                     }}
//                     >Committee</h1>
//                 </div>
//                 <div className="adminInner">
//                     <FaChalkboardTeacher size="2em" 
                    
//                     style={{
//                       width: '150px',
//                       height: '150px'
//                   }}
//                   />
//                     <h1
//                       style={{
//                         fontSize: '30px',
//                         fontWeight: 'bold',
//                         color: 'white',
//                         letterSpacing: '2px'
//                     }}
//                     >DAC</h1>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AdminDashboard
import { BsSearch } from 'react-icons/bs'
import { FaUserGraduate, FaUserTie, FaUsers, FaChalkboardTeacher } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { GiTeacher } from 'react-icons/gi'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { SiWelcometothejungle } from 'react-icons/si'
import pic1 from '../pictures/faiz gul.png';
import { Avatar, Typography } from '@mui/material';
import { style } from 'motion';

const AdminDashboard = () => {
    const navigate = useNavigate()
    const studentClick = () => {
        // alert('Student Div Click')
        navigate('/admin/admin/studentRegisterData')
    }
    const teacherClick = () => {
        navigate('/admin/admin/teacherRegisterData')
    }
    return (
        <>
            <div className="searchbar">
                <input type="text" placeholder="Search.." />
                <BsSearch className="search-icon" />
            </div>
            <div>
            <div className="welcomediv">
                <h1 className="welcomeh1">
                    <SiWelcometothejungle style={{ marginRight: '10px', color: 'green', fontSize: '80px' }} />
                    elcome! &nbsp;<span style={{color:'black',fontFamily:'initial',fontSize:'50px'}}>Admin</span>
                    <div style={{marginLeft:'550px'}}>
                        <Avatar alt="Profile Picture" src={pic1} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                </h1>
            </div>
        </div>

            <div className="adminMain">
                <div onClick={studentClick} className="adminInner">
                    <FaUserGraduate
                        size="2em"
                        style={{
                            width: '150px',
                            height: '150px',
                            color: 'white',
                        }}
                    />
                    <h1
                        style={{
                            fontSize: '40px',
                            fontWeight: 'bold',
                            color: 'white',
                            letterSpacing: '2px',
                            fontFamily:'initial'
                        }}
                    >
                        Students
                    </h1>
                </div>
                <div onClick={teacherClick} className="adminInner">
                    <LiaChalkboardTeacherSolid
                        size="2em"
                        style={{
                            width: '150px',
                            height: '150px',
                            color: 'white',
                        }}
                    />

                    <h1
                        style={{
                            fontSize: '40px',
                            fontWeight: 'bold',
                            color: 'white',
                            letterSpacing: '2px',
                            fontFamily:'initial'
                        }}
                    >
                        Teachers
                    </h1>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard

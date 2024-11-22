// import React, { useContext, useState, useEffect } from 'react'
// import classNames from 'classnames'
// import { UserContext } from '../../context/User'
// import { Link, useLocation } from 'react-router-dom'
// import { FcBullish } from 'react-icons/fc'
// import { HiOutlineLogout } from 'react-icons/hi'
// import { useNavigate } from 'react-router-dom'
// import {
//     DASHBOARD_SIDEBAR_LINKS_STUDENT,
//     DASHBOARD_SIDEBAR_LINKS_TEACHER,
//     DASHBOARD_SIDEBAR_LINKS_COMMETTI,
//     DASHBOARD_SIDEBAR_LINKS_DAC,
//     DASHBOARD_SIDEBAR_LINKS_DEAN
// } from '../../lib/constants'
// import AccountAvatar from '../Avatar'
// import { Avatar, Typography } from '@mui/material'

// const linkClass =
//     'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

// export default function Sidebar() {
//     const { user } = useContext(UserContext)
//     const [profileImage, setProfileImage] = useState(null)
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (user.image_name) {
//             fetch(`http://localhost:5000/user_images/${user.image_name}`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok')
//                     }
//                     return response.blob()
//                 })
//                 .then((blob) => {
//                     setProfileImage(URL.createObjectURL(blob))
//                 })
//                 .catch((error) => {
//                     console.error('There was a problem with the fetch operation:', error)
//                     // Handle error
//                 })
//         } else {
//             setProfileImage(user?.profileImage)
//         }
//     }, [user?.image_name, user?.profileImage])

//     let role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null
//     // console.log(role);
//     return (
//         <div style={{ minWidth: '200px' }} className="bg-neutral-900 w-60 p-3 flex flex-col overflow-y-auto">
//             <div className="flex items-center gap-2 px-1 py-3">
//                 <span className="text-neutral-200 text-2xl">PGMS</span>
//             </div>
//             <div style={{ width: '100%', margin: '0 auto' }}>
//                 {/* Profile Image Section */}
//                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <div>
//                         <Avatar
//                             src={profileImage}
//                             alt="Profile"
//                             className="profile-picture"
//                             style={{
//                                 width: '175px',
//                                 height: '175px',
//                                 objectFit: 'cover',
//                                 borderRadius: '50%',
//                                 margin: '0 auto 10px'
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <Typography sx={{ textAlign: 'center', color: 'white' }}>Welcome {user?.name}</Typography>
//             {role === 'CoordinateCommitte' && (
//                 <>
//                     <div className="py-8 flex flex-1 flex-col gap-0.5">
//                         {DASHBOARD_SIDEBAR_LINKS_COMMETTI.map((link) => (
//                             <SidebarLink key={link.key} link={link} />
//                         ))}
//                     </div>
//                 </>
//             )}
//             {role === 'Supervisor' && (
//                 <>
//                     <div className="py-8 flex flex-1 flex-col gap-0.5">
//                         {DASHBOARD_SIDEBAR_LINKS_TEACHER.map((link) => (
//                             <SidebarLink key={link.key} link={link} />
//                         ))}
//                     </div>
//                 </>
//             )}
//             {role === null && (
//                 <>
//                     <div className="py-8 flex flex-1 flex-col gap-0.5">
//                         {DASHBOARD_SIDEBAR_LINKS_STUDENT.map((link) => (
//                             <SidebarLink key={link.key} link={link} />
//                         ))}
//                     </div>
//                 </>
//             )}
//             {role === 'DAC' && (
//                 <>
//                     <div className="py-8 flex flex-1 flex-col gap-0.5">
//                         {DASHBOARD_SIDEBAR_LINKS_DAC.map((link) => (
//                             <SidebarLink key={link.key} link={link} />
//                         ))}
//                     </div>
//                 </>
//             )}

//             {role === 'dean' && (
//                 <>
//                     <div className="py-8 flex flex-1 flex-col gap-0.5">
//                         {DASHBOARD_SIDEBAR_LINKS_DEAN.map((link) => (
//                             <SidebarLink key={link.key} link={link} />
//                         ))}
//                     </div>
//                 </>
//             )}

//             <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
//                 <div
//                     className={classNames(linkClass, 'cursor-pointer text-red-500')}
//                     onClick={() => {
//                         navigate('/login')
//                     }}
//                 >
//                     <span className="text-xl">
//                         <HiOutlineLogout />
//                     </span>
//                     Logout
//                 </div>
//             </div>
//         </div>
//     )
// }

// function SidebarLink({ link }) {
//     const { pathname } = useLocation()

//     return (
//         <Link
//             to={link.path}
//             className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
//         >
//             <span className="text-xl">{link.icon}</span>
//             {link.label}
//         </Link>
//     )
// }
import React, { useContext, useState, useEffect } from 'react'
import classNames from 'classnames'
import { UserContext } from '../../context/User'
import { Link, useLocation } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
    DASHBOARD_SIDEBAR_LINKS_STUDENT,
    DASHBOARD_SIDEBAR_LINKS_TEACHER,
    DASHBOARD_SIDEBAR_LINKS_COMMETTI,
    DASHBOARD_SIDEBAR_LINKS_DAC,
    DASHBOARD_SIDEBAR_LINKS_DEAN
} from '../../lib/constants'
import { Avatar, Typography } from '@mui/material'
import { FaUserGraduate } from 'react-icons/fa6'

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#7344C3] hover:text-white hover:no-underline active:bg-[#7344C3] rounded-sm text-base'

export default function Sidebar() {
    const { user } = useContext(UserContext)
    const [profileImage, setProfileImage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.image_name) {
            fetch(`http://localhost:5000/user_images/${user.image_name}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.blob()
                })
                .then((blob) => {
                    setProfileImage(URL.createObjectURL(blob))
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error)
                })
        } else {
            setProfileImage(user?.profileImage)
        }
    }, [user?.image_name, user?.profileImage])

    let role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null

    return (
        <div
            style={{
                minWidth: '100px',
                overflowY: 'hidden',
                background: 'linear-gradient(to bottom, #925FE2, #AF72FF)',
                borderRadius: '20px',
                margin: '10px',
                marginLeft: '20px',
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                height: '95vh',
                width: '230px'
            }}
        >
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <span
                    className="text-2xl"
                    style={{
                        color: 'white',
                        fontSize: '40px',
                        fontFamily: 'Taviraj',
                        marginTop: '10px',
                        letterSpacing: '5px',
                        fontWeight: 'bold',
                        marginBottom: '10px'
                    }}
                >
                    PGMS
                </span>
                <FaUserGraduate style={{ width: '150px', height: '90px', borderRadius: '25px', color: 'white' }} />
            </div>
            <div className="flex-1">
                {role === 'CoordinateCommitte' && (
                    <div className="py-8 flex flex-1 flex-col gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS_COMMETTI.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                    </div>
                )}
                {role === 'Supervisor' && (
                    <div className="py-8 flex flex-1 flex-col gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS_TEACHER.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                    </div>
                )}
                {role === null && (
                    <div className="py-8 flex flex-1 flex-col gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS_STUDENT.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                    </div>
                )}
                {role === 'DAC' && (
                    <div className="py-8 flex flex-1 flex-col gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS_DAC.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                    </div>
                )}
                {role === 'dean' && (
                    <div className="py-8 flex flex-1 flex-col gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS_DEAN.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t flex-shrink-0">
                <div
                    className={classNames(linkClass, 'cursor-pointer text-red-500')}
                    onClick={() => {
                        navigate('/login')
                    }}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'text-white' : 'text-neutral-400', linkClass)}
            style={{ color: 'white', textAlign: 'center', marginLeft: '20px' }}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}

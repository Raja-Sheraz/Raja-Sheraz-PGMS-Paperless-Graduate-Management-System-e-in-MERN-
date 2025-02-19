// import { NavLink } from 'react-router-dom'
// import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaChalkboardTeacher } from 'react-icons/fa'
// import { PiStudentBold } from 'react-icons/pi'
// import { MdMessage } from 'react-icons/md'
// import { BiAnalyse, BiSearch, BiLogOutCircle } from 'react-icons/bi'
// import { BiCog } from 'react-icons/bi'
// import { AiFillHeart, AiTwotoneFileExclamation } from 'react-icons/ai'
// import { BsCartCheck } from 'react-icons/bs'
// import { GrUpdate } from 'react-icons/gr'
// import { TbPassword } from 'react-icons/tb'
// import { useState } from 'react'
// import { IoDocumentsSharp } from 'react-icons/io5'
// import { AnimatePresence, motion } from 'framer-motion'
// import SidebarMenu from './SidebarMenu'
// import { MdCloudUpload } from 'react-icons/md'

// const routes = [
//     {
//         path: 'admin/dashboard',
//         name: 'Dashboard',
//         icon: <FaHome />
//     },
//     {
//         path: 'admin/studentRegisterData',
//         name: 'Students Data',
//         icon: <PiStudentBold />
//     },
//     {
//         path: 'admin/teacherRegisterData',
//         name: 'Teachers Data',
//         icon: <FaChalkboardTeacher />
//     },

//     {
//         path: 'admin/send-documents',
//         name: 'Forward Documents',
//         icon: <IoDocumentsSharp />
//     },
//     {
//         path: 'admin/Presentation',
//         name: 'Presentation',
//         icon: <IoDocumentsSharp />
//     },
//     {
//         path: 'admin/Viewcommetties',
//         name: 'Commetties',
//         icon: <IoDocumentsSharp />
//     },
//     {
//         path: 'admin/Viewdac',
//         name: 'DAC',
//         icon: <IoDocumentsSharp />
//     },
//     {
//         path: 'admin/generateReport',
//         name: 'Generate Report',
//         icon: <IoDocumentsSharp />
//     },
//     {
//         path: 'admin/UploadTHesis',
//         name: 'Upload Thesis',
//         icon: <MdCloudUpload style={{ color: '#7F3DD5', fontSize: '25px' }} />
//     },
//     {
//         path: 'admin/settings',
//         name: 'Settings',
//         icon: <BiCog />,
//         exact: true,
//         subRoutes: [
//             {
//                 path: '/settings/change-password',
//                 name: 'Change Password',
//                 icon: <TbPassword />
//             }
//         ]
//     },
//     {
//         path: '/login',
//         name: 'Logout',
//         icon: <BiLogOutCircle />
//     }
// ]

// const SideBar = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(true)
//     const toggle = () => setIsOpen(!isOpen)
//     const inputAnimation = {
//         hidden: {
//             width: 0,
//             padding: 0,
//             transition: {
//                 duration: 0.2
//             }
//         },
//         show: {
//             width: '140px',
//             padding: '5px 15px',
//             transition: {
//                 duration: 0.2
//             }
//         }
//     }

//     const showAnimation = {
//         hidden: {
//             width: 0,
//             opacity: 0,
//             transition: {
//                 duration: 0.5
//             }
//         },
//         show: {
//             opacity: 1,
//             width: 'auto',
//             transition: {
//                 duration: 0.5
//             }
//         }
//     }

//     return (
//         <>
//             <div className="main-container">
//                 <motion.div
//                     animate={{
//                         width: isOpen ? '200px' : '45px',

//                         transition: {
//                             duration: 0.5,
//                             type: 'spring',
//                             damping: 10
//                         }
//                     }}
//                     className={`sidebar `}
//                 >
//                     <div className="top_section">
//                         <AnimatePresence>
//                             {isOpen && (
//                                 <motion.h1
//                                     variants={showAnimation}
//                                     initial="hidden"
//                                     animate="show"
//                                     exit="hidden"
//                                     className="logo"
//                                 >
//                                     <h1 className="lg1">PGMS</h1>
//                                 </motion.h1>
//                             )}
//                         </AnimatePresence>

//                         <div className="bars">
//                             <FaBars onClick={toggle} />
//                         </div>
//                     </div>
//                     {/* <div className="search">
//             <div className="search_icon">
//               <BiSearch />
//             </div>
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.input
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   variants={inputAnimation}
//                   type="text"
//                   placeholder="Search"
//                 />
//               )}
//             </AnimatePresence>
//           </div> */}
//                     <section className="routes">
//                         {routes.map((route, index) => {
//                             if (route.subRoutes) {
//                                 return (
//                                     <SidebarMenu
//                                         setIsOpen={setIsOpen}
//                                         route={route}
//                                         showAnimation={showAnimation}
//                                         isOpen={isOpen}
//                                     />
//                                 )
//                             }

//                             return (
//                                 <NavLink to={route.path} key={index} className="link" activeClassName="active">
//                                     <div className="icon">{route.icon}</div>
//                                     <AnimatePresence>
//                                         {isOpen && (
//                                             <motion.div
//                                                 variants={showAnimation}
//                                                 initial="hidden"
//                                                 animate="show"
//                                                 exit="hidden"
//                                                 className="link_text"
//                                             >
//                                                 {route.name}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </NavLink>
//                             )
//                         })}
//                     </section>
//                 </motion.div>

//                 <main>{children}</main>
//             </div>
//         </>
//     )
// }

// export default SideBar
import { NavLink } from 'react-router-dom'
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'
import { MdMessage } from 'react-icons/md'
import { BiAnalyse, BiSearch, BiLogOutCircle } from 'react-icons/bi'
import { BiCog } from 'react-icons/bi'
import { AiFillHeart, AiTwotoneFileExclamation } from 'react-icons/ai'
import { BsCartCheck } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { TbPassword } from 'react-icons/tb'
import { useState } from 'react'
import { IoDocumentsSharp } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import SidebarMenu from './SidebarMenu'
import { RiPresentationFill } from 'react-icons/ri'
import { MdGroups } from 'react-icons/md'
import { FaPeopleGroup } from 'react-icons/fa6'
import { MdCloudUpload } from 'react-icons/md'

const routes = [
    {
        path: 'admin/dashboard',
        name: 'Dashboard',
        icon: <FaHome style={{ color: 'white', fontSize: '25px' }} />
    },
    // {
    //   path: "admin/studentRegisterData",
    //   name: "Students Data",
    //   icon: <PiStudentBold />,
    // },
    // {
    //   path: "admin/teacherRegisterData",
    //   name: "Teachers Data",
    //   icon: <FaChalkboardTeacher />,
    // },
    // {
    //   path: "admin/secdulePresentaion",
    //   name: "Presentation",
    //   icon: <FaChalkboardTeacher />,
    // },

    {
        path: 'admin/send-documents',
        name: 'Documents',
        icon: <IoDocumentsSharp style={{color: 'white',fontSize: '25px' }} />
    },
    {
        path: 'admin/Presentation',
        name: 'Presentation',
        icon: <RiPresentationFill style={{color: 'white', fontSize: '25px' }} />
    },
    {
        path: 'admin/Viewcommetties',
        name: 'Commetties',
        icon: <MdGroups style={{color: 'white', fontSize: '25px' }} />
    },
    {
        path: 'admin/Viewdac',
        name: 'DAC',
        icon: <FaPeopleGroup style={{ color: 'white', fontSize: '25px' }} />
    },
    {
        path: 'admin/UploadTHesis',
        name: 'Upload Thesis',
        icon: <MdCloudUpload style={{ color: 'white', fontSize: '25px' }} />
    },
    {
        path: 'admin/generateReport',
        name: 'Generate Report',
        icon: <IoDocumentsSharp style={{ color: 'white', fontSize: '25px' }} />
    },
    {
        path: 'admin/settings',
        name: 'Settings',
        icon: <BiCog style={{ color: 'white',fontSize: '25px' }} />,
        exact: true,
        subRoutes: [
            {
                path: '/settings/change-password',
                name: 'Change Password',
                icon: <TbPassword style={{ color: '#7F3DD5', fontSize: '25px' }} />
            }
        ]
    },
    {
        path: '/login',
        name: 'Logout',
        icon: <BiLogOutCircle style={{ color: 'red', fontSize: '25px' }} />
    }
]

const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen)
    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.2
            }
        },
        show: {
            width: '140px',
            padding: '5px 15px',
            transition: {
                duration: 0.2
            }
        }
    }

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        },
        show: {
            opacity: 1,
            width: 'auto',
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? '200px' : '45px',

                        transition: {
                            duration: 0.5,
                            type: 'spring',
                            damping: 10
                        }
                    }}
                    className={`sidebar `}
                >
                    <div className="top_section">
                        <AnimatePresence>
                            {isOpen && (
                                <motion.h1
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="logo"
                                >
                                    <h1 className="lg1" >PGMS</h1>
                                </motion.h1>
                            )}
                        </AnimatePresence>

                        <div className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    <section className="routes">
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                    />
                                )
                            }

                            return (
                                <NavLink to={route.path} key={index} className="link" activeClassName="active">
                                    <div className="icon">{route.icon}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link_text"
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            )
                        })}
                    </section>
                </motion.div>

                <main>{children}</main>
            </div>
        </>
    )
}

export default SideBar

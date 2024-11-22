import React, { useContext, useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { PiStudentFill } from 'react-icons/pi'
import { MdOutlinePendingActions } from 'react-icons/md'
import { FaClipboardCheck } from 'react-icons/fa'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { GrCheckboxSelected } from 'react-icons/gr'
import { UserContext } from '../context/User'
import axios from 'axios'
import Progress from '../components/Dashboard/Progress'
import Welcome from '../Page/welcome'
import WelcomeSupervisor from '../Page/welcomesupervisor'
import CommitteWelcome from '../Page/CommitteWelcome'
import DACWelcome from '../Page/DACWelcome'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import { FaPeopleCarryBox } from "react-icons/fa6";

export default function DashboardStatsGrid() {
    const { user, setUser } = useContext(UserContext)
    const [pdf, setPdf] = useState(null)
    const [superVisor, setSuperVisor] = useState(null)
    const [presentations, setpresentations] = useState(null)
    let [update, setupdate] = useState(false)

    let [meetings, setmeetings] = useState(null)
    const [isHovered, setIsHovered] = useState(false)
    // const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null

    let get_commetti_detail_with_commetti_id = async (id) => {
        const response = await axios.post('/get_commetti_detail_with_commetti_id', {
            commetti_id: id
        })
        return response.data[0].commetti_title
    }

    let upadateData = async () => {
        const _data = await Promise.all(
            presentations?.map(async (pres, index) => {
                // console.log(pres.presentation_commetti);
                let commetti_detail = await get_commetti_detail_with_commetti_id(pres.presentation_commetti)
                pres['commetti_title'] = commetti_detail
                return pres
            })
        )
        setpresentations(_data)
        setupdate(true)
    }
    useEffect(() => {
        if (presentations && !update) {
            upadateData()
        } else if (!update) {
            get_presentation_schedules()
        }

        const fetchPdfContent = async (pdf) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pdf/${pdf}`)
                setPdf(response.data)
            } catch (error) {
                console.error('Error fetching PDF:', error)
            }
        }

        const getSupervisor = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/getUser1/${id}`)
                setSuperVisor(response.data)
            } catch (error) {
                console.error('Error fetching PDF:', error)
            }
        }

        if (user?.pdf) {
            fetchPdfContent(user.pdf)
        }
        if (user?.supervisor) {
            getSupervisor(user.supervisor)
        }
        if (role == 'Supervisor') {
            get_students_count_with_proposals()
        } else if (role == 'CoordinateCommitte') {
            get_students_count_with_papers()
        }
        getnotifications()
    }, [user, presentations])

    let [counts, setcounts] = useState(null)

    let get_students_count_with_proposals = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get_students_count_with_proposals/${user._id}`)
            console.log(response.data)
            setcounts(response.data)
        } catch (error) {
            // console.error(`Error fetching student data for ID ${id}:`, error)
            return null // or handle the error in an appropriate way
        }
    }

    let get_presentation_schedules = async () => {
        if (role === 'Supervisor' || role == null) {
            try {
                const response = await axios.post(`http://localhost:5000/get_presentation_schedules`, {
                    _id: user._id,
                    role: user.role
                })
                // console.log(response.data)
                setpresentations(response.data)
            } catch (error) {
                console.log(error)
                return null // or handle the error in an appropriate way
            }
        }
        if (role === 'Student' || role === 'Supervisor' || role === null) {
            try {
                let response = await axios.post(`http://localhost:5000/get_meetings`, {
                    _id: user._id,
                    role: user.role
                })
                setmeetings(response.data)
            } catch (error) {
                console.log(error)
                return null
            }
        }
    }

    let get_students_count_with_papers = async () => {
        let response = await axios.post('/get_students_count_with_papers', {
            _id: user._id
        })
        setcounts(response.data)
    }

    let [notifications, setnotifications] = useState([])
    const getnotifications = async () => {
        const response = await axios.post(`http://localhost:5000/get_notifications`, {
            user_id: user._id
        })
        console.log(response.data)
        setnotifications(response.data)
    }

    const markasread = async (id) => {
        const response = await axios.post(`http://localhost:5000/mark_notification_as_read`, {
            id: id
        })
        if (response.data.message == 'read') {
            setnotifications(notifications.filter((item) => item._id != response.data.notification_id))
        }
    }

    return (
        <>
            {role === 'Supervisor' && (
                <>
                    <WelcomeSupervisor />
                    <div className="col-12 flex-wrap d-flex justify-content-between" style={{ marginTop: '20px' }}>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper1>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                    <PiStudentFill className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">My Supervision</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">{counts?.mystudentscount}</span>
                                    </div>
                                </div>
                            </BoxWrapper1>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper1>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                    <MdOutlinePendingActions className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">Modified Request</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">{counts?.modified_students}</span>
                                    </div>
                                </div>
                            </BoxWrapper1>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper1>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                    <MdOutlinePendingActions className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">Pending Request</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">{counts?.pending_students}</span>
                                    </div>
                                </div>
                            </BoxWrapper1>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper1>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                                    <IoPeople className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">Total Request Handled</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">
                                            {counts?.pending_students +
                                                counts?.approved_students +
                                                counts?.rejected_students +
                                                counts?.tomodify_students +
                                                counts?.modified_students}
                                        </span>
                                    </div>
                                </div>
                            </BoxWrapper1>
                        </div>
                    </div>
                </>
            )}

            {role == null && (
                <>
                    <Welcome />
                    <div style={{ display: 'flex', marginTop: '50px' }}>
                        <div style={{ width: '70%', }}>
                            <div className="d-flex flex-column col-12 ">
                                <div className="col-12 flex-wrap d-flex justify-content-between mb-2">
                                    <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
                                        <BoxWrapper>
                                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                                <FaClipboardCheck className="text-2xl text-white" />
                                            </div>
                                            <div className="pl-4">
                                                <span className="text-sm text-gray-500 font-light">
                                                    Proposal Status
                                                </span>
                                                <div className="flex items-center">
                                                    {user?.proposal_status ? (
                                                        <span className="text-sm text-green-500">
                                                            {user?.proposal_status}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-red-500">-</span>
                                                    )}
                                                </div>
                                            </div>
                                        </BoxWrapper>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
                                        <BoxWrapper>
                                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                                <GrCheckboxSelected className="text-2xl text-white" />
                                            </div>
                                            <div className="pl-4">
                                                <span className="text-sm text-gray-500 font-light">
                                                    Supervisor Selected
                                                </span>
                                                <div className="flex items-center">
                                                    {user?.supervisor ? (
                                                        <span className="text-sm text-green-500">YES</span>
                                                    ) : (
                                                        <span className="text-sm text-red-500">NO</span>
                                                    )}
                                                </div>
                                            </div>
                                        </BoxWrapper>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3 flex-grow-1">
                                        <BoxWrapper>
                                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                                                <PiChalkboardTeacherFill className="text-2xl text-white" />
                                            </div>
                                            <div className="pl-4">
                                                <span className="text-sm text-gray-500 font-light">
                                                    Supervisor Name
                                                </span>
                                                <div className="flex items-center">
                                                    {user?.supervisor ? (
                                                        <span className="text-sm text-green-500">
                                                            {superVisor?.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-300">-</span>
                                                    )}
                                                </div>
                                            </div>
                                        </BoxWrapper>
                                    </div>
                                </div>
                            </div>
                            <p
                                // className="text-lg my-1"
                                style={{
                                    fontSize: '30px',
                                    fontFamily: 'initial',
                                    // letterSpacing: '2px',
                                    color: 'black'
                                    // marginTop: '35px',
                                    // fontWeight: 'bold',
                                }}
                            >
                                Committee Presentation Details!
                            </p>
                            {presentations && presentations.length > 0 ? (
                                <div>
                                    {presentations.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                // marginTop:'10px',
                                                width: '98%',
                                                height: '300px',
                                                background: 'white',
                                                // border: '1px solid #545B6A',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1),0 1px 3px rgba(0, 0, 0, 0.08)',
                                                border: isHovered ? '3px solid #7344C3' : 'none',
                                                transition: 'border 0.3s ease'
                                            }}
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            <div className="col-12 p-1 d-flex align-items-center p-2">
                                                <label
                                                    className="form-label col-2"
                                                    style={{
                                                        color: '#7344C3',
                                                        fontSize: '25px',
                                                        fontFamily: 'initial',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    Discription:
                                                    {/* <FaLocationDot style={{ marginLeft: '5px' }} /> */}
                                                </label>
                                                <br></br>
                                                <label className="form-control" style={{ color: 'black' ,width:'80%',marginLeft:'50px'}}>
                                                    {item.presentation_description}
                                                </label>
                                            </div>
                                            <div className="col-12 p-1 d-flex p-2 flex-wrap">
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label
                                                        className="form-label col-2"
                                                        style={{
                                                            color: '#7344C3',
                                                            fontSize: '25px',
                                                            fontFamily: 'initial',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        Committee
                                                        {/* <FaLocationDot style={{ marginLeft: '5px' }} /> */}
                                                    </label>
                                                    <label
                                                        className="form-control"
                                                        style={{
                                                            backgroundColor: 'white',
                                                            // border: '1px solid #1C1F26',
                                                            paddingLeft: 0,
                                                            fontSize: '20px',
                                                            color: 'black'
                                                        }}
                                                    >
                                                        {item.commetti_title}
                                                    </label>
                                                </div>
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label
                                                        className="form-label col-2"
                                                        style={{
                                                            color: '#7344C3',
                                                            fontSize: '25px',
                                                            fontFamily: 'initial',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        Venue
                                                        {/* <FaLocationDot style={{ marginLeft: '5px' }} /> */}
                                                    </label>
                                                    <label
                                                        className="form-control"
                                                        style={{
                                                            backgroundColor: 'white',
                                                            // border: '1px solid #1C1F26',
                                                            fontSize: '20px',
                                                            color: 'black',
                                                            paddingLeft: 0
                                                        }}
                                                    >
                                                        {item.presentation_venue}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12 p-1 d-flex align-items-center p-2 flex-wrap">
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label
                                                        className="form-label col-2"
                                                        style={{
                                                            color: '#7344C3',
                                                            fontSize: '25px',
                                                            fontFamily: 'initial',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        Date
                                                        {/* <BsFillCalendar2DateFill style={{ marginLeft: '5px' ,color:'black',width:'30px',height:'20px'}} /> */}
                                                    </label>
                                                    <label
                                                        className="form-control"
                                                        style={{
                                                            backgroundColor: 'white',
                                                            // border: '1px solid white',
                                                            paddingLeft: 0,
                                                            fontSize: '20px',
                                                            color: 'black'
                                                        }}
                                                    >
                                                        {item.presentation_date}
                                                    </label>
                                                </div>
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label
                                                        className="form-label col-2"
                                                        style={{
                                                            color: '#7344C3',
                                                            fontSize: '25px',
                                                            fontFamily: 'initial',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        Time
                                                        {/* <MdOutlineAccessTimeFilled style={{ marginLeft: '5px',color:'black',border:'2px solid black',width:'20px',height:'20px' }} /> */}
                                                    </label>
                                                    <label
                                                        className="form-control"
                                                        style={{
                                                            backgroundColor: 'white',
                                                            // border: '1px solid #1C1F26',
                                                            paddingLeft: 0,
                                                            fontSize: '20px',
                                                            color: 'black'
                                                        }}
                                                    >
                                                        {item.presentation_time}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: '98%',
                                        height: '300px',
                                        // background: '#1C1F26',
                                        background: 'white',
                                        // border: '1px solid #545B6A',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1),0 1px 3px rgba(0, 0, 0, 0.08)',
                                        border: isHovered ? '3px solid #7344C3' : 'none',
                                        transition: 'border 0.3s ease',
                                        textAlign: 'center'
                                        // marginTop:'10px'
                                    }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <h1
                                        style={{
                                            color: 'black',
                                            fontSize: '30px',
                                            fontFamily: 'initial',
                                            marginTop: '40px'
                                        }}
                                    >
                                        Currently No Presentations Arranged
                                    </h1>
                                    <br></br>
                                    <h1>
                                        <RxQuestionMarkCircled
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                color: 'red',
                                                textAlign: 'center',
                                                marginLeft: '300px'
                                            }}
                                        />
                                    </h1>
                                </div>
                            )}
                        </div>
                        <div style={{ width: '30%',}}>
                            <Progress />
                        </div>
                    </div>
                </>
            )}
            {role == 'CoordinateCommitte' && (
                <>
                    <CommitteWelcome />
                    <div className="col-12 flex-wrap d-flex justify-content-between">
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                    <PiStudentFill className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">To modify</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">{counts?.tomodify_students}</span>
                                    </div>
                                </div>
                            </BoxWrapper>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                    <MdOutlinePendingActions className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">Modified Request</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">{counts?.modified_students}</span>
                                    </div>
                                </div>
                            </BoxWrapper>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                    <MdOutlinePendingActions className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">Pending Request</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">{counts?.pending_students}</span>
                                    </div>
                                </div>
                            </BoxWrapper>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 ">
                            <BoxWrapper>
                                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                                    <IoPeople className="text-2xl text-white" />
                                </div>
                                <div className="pl-4">
                                    <span className="text-sm text-gray-500 font-light">Total Request Handled</span>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400">
                                            {counts?.pending_students +
                                                counts?.approved_students +
                                                counts?.rejected_students +
                                                counts?.tomodify_students +
                                                counts?.modified_students}
                                        </span>
                                    </div>
                                </div>
                            </BoxWrapper>
                        </div>
                    </div>
                </>
            )}
            {role == 'DAC' && (
                <>
                    <DACWelcome />
                </>
            )}
            {notifications.length > 0 &&
                notifications.map((item, index) => {
                    return (
                        <div class="alert alert-warning alert-dismissible  fade show" role="alert">
                            <div> {item.notification_text}</div>
                            <a class="cursor-pointer text-italic text-danger mt-2" onClick={() => markasread(item._id)}>
                                mark as read?
                            </a>
                        </div>
                    )
                })}

            {/* {presentations && (
                <div>
                    {presentations.length > 0 && (
                        <>
                            <p className="text-lg text-success my-1">Presentations Schedules</p>
                            {presentations.map((item, index) => {
                                return (
                                    <>
                                        <div
                                            key={index}
                                            className="col-12  rounded d-flex flex-column align-items-center border shadow p-3 mb-1 bg-white rounded flex-wrap"
                                        >
                                            <div className="col-12 p-1 d-flex align-items-center p-2">
                                                <label className="form-label  ">{item.presentation_description}</label>
                                            </div>
                                            <div className="col-12  p-1 d-flex p-2 flex-wrap">
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label className="form-label col-2">Commetti </label>
                                                    <label className="form-control">{item.commetti_title}</label>
                                                </div>
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label className="form-label col-2">Venue </label>
                                                    <label className="form-control">{item.presentation_venue}</label>
                                                </div>
                                            </div>
                                            <div className="col-12  p-1 d-flex align-items-center p-2 flex-wrap">
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label className="form-label col-2">Date </label>
                                                    <label className="form-control">
                                                        {item.presentation_date}
                                                    </label>{' '}
                                                </div>
                                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                                    <label className="form-label col-2">Time </label>
                                                    <label className="form-control">{item.presentation_time}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </>
                    )}
                </div>
            )} */}

            {meetings && meetings.length > 0 ? (
                <div>
                    <p className="text-lg my-1" style={{color:'#9964E9',fontSize:'30px',fontFamily:'initial'}}> Meeting Schedules</p>
                    {meetings.map((item, index) => (
                        <div
                            key={index}
                            className="col-12  rounded d-flex flex-column align-items-center border shadow p-3 mb-1  rounded flex-wrap"
                            style={{backgroundColor: '#9964E9'}}
                        >
                            <div className="col-12  p-1 d-flex p-2 flex-wrap">
                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                    <label className="form-label col-2" style={{color:'white',fontSize:'20px',fontFamily:'initial'}}>Discription </label>
                                    <label className="form-control">{item.presentation_description}</label>
                                </div>
                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                    <label className="form-label col-2"style={{color:'white',fontSize:'20px',fontFamily:'initial'}}>Venue </label>
                                    <label className="form-control">{item.presentation_venue}</label>
                                </div>
                            </div>
                            <div className="col-12  p-1 d-flex align-items-center p-2 flex-wrap">
                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                    <label className="form-label col-2"style={{color:'white',fontSize:'20px',fontFamily:'initial'}}>Date </label>
                                    <label className="form-control">{item.presentation_date}</label>{' '}
                                </div>
                                <div className="d-flex col-6 align-items-center p-2 flex-wrap">
                                    <label className="form-label col-2"style={{color:'white',fontSize:'20px',fontFamily:'initial'}}>Time </label>
                                    <label className="form-control">{item.presentation_time}</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="col-12 rounded border shadow p-3 mb-1 bg-white d-flex flex-column align-items-center"
                    style={{
                        width: '98%',
                        height: '200px', // Fixed height
                        overflow: 'auto', // Enables scrolling if content overflows
                        overflowWrap: 'break-word', // Ensures long words break and wrap to the next line
                        wordBreak: 'break-word', // Ensures long words break and wrap to the next line
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'border 0.3s ease', // Smooth transition for the border
                        border: '2px solid green', // Default border color
                        borderRadius: '10px'
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <h1
                        style={{
                            color: '#df3554',
                            fontSize: '30px',
                            fontFamily: 'initial'
                        }}
                    >
                        Currently No Meetings Arranged
                        <FaPeopleCarryBox  style={{width:'150px',height:'130px',marginLeft:'100px',color:'#7F3DD5'}}/>

                    </h1>
                </div>
            )}
        </>
    )
}

function BoxWrapper({ children }) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
            className="rounded-sm p-4 flex-1 flex items-center"
            style={{
                textAlign: 'center',
                background: 'white',
                borderRadius: '10px',
                width: '230px',
                height: '160px',
                color: 'black',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1),0 1px 3px rgba(0, 0, 0, 0.08)',
                border: isHovered ? '3px solid #7344C3' : 'none',
                transition: 'border 0.3s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    )
}
function BoxWrapper1({ children }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="rounded-sm p-4 flex-1  flex items-center"
            style={{
                textAlign: 'center',
                background: 'white',
                borderRadius: '10px',
                width: '230px',
                height: '160px',
                color: 'black',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1),0 1px 3px rgba(0, 0, 0, 0.08)',
                border: isHovered ? '3px solid #7344C3' : 'none',
                transition: 'border 0.3s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { SiWelcometothejungle } from 'react-icons/si'
import { Avatar, Typography } from '@mui/material'
import { UserContext } from '../context/User'
import pic1 from '../pictures/Profile.jpg'
import UploadProfile from '../components/Profile/UploadProfile'
import Supervisor from '../pictures/supervisor.png'

export default function WelcomeSupervisor() {
    const { user } = useContext(UserContext)
    const [profileImage, setProfileImage] = useState(null)
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        // Set profile image based on user data
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
                    // Handle error
                })
        } else {
            setProfileImage(user?.profileImage)
        }

        // Set current date in the format "September 4, 2023"
        const currentDateObj = new Date()
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        setCurrentDate(currentDateObj.toLocaleDateString('en-US', options))
    }, [user?.image_name, user?.profileImage])

    return (
        <div className="welcome-container">
            <h1 className="welcomeh12">
                <span style={{ fontSize: '20px', marginTop: '10px', fontWeight: 'normal' }}>{currentDate}</span>
                <br></br>
                Welcome back, <span style={{ color: 'white' }}>{user?.name}!</span>
                <br />
                <span style={{ fontSize: '20px', color: 'white', fontWeight: 'normal' }}>
                    Always stay updated in your Supervisor Portal
                </span>
            </h1>
            <div className="image-containers">
                <img src={Supervisor} alt="Student" className="student-images" />
            </div>
        </div>
    )
}

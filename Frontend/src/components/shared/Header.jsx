import React, { useContext, useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/User'
import { Avatar, Typography } from '@mui/material'
import UploadProfile from '../Profile/UploadProfile'

export default function Header() {
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
                    // Handle error
                })
        } else {
            setProfileImage(user?.profileImage)
        }
    }, [user?.image_name, user?.profileImage])

    return (
        <div
            className="h-16 px-4 flex items-center justify-between"
            style={{
                backgroundColor: 'white',
                marginTop: '20px',
                // border: '2px solid black',
                height: '100px',
                width: '95%',
                marginLeft: '20px',
                borderRadius:'20px',
                // boxShadow: '0 4px 8px rgba(0, 0.6, 0.2, 0.8)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Lighter shadow for white background


            }}
        >
            <div className="relative flex-1">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none w-full h-10 pl-11 pr-4 rounded-sm"
                    style={{
                        backgroundColor: 'white',
                        border: '2px solid #925FE2',
                        borderRadius: '20px',
                        width: '500px',
                        boxShadow: 'inherit'
                    }}
                />
            </div>
            <div className="flex items-center">
                <div className="flex flex-col items-center ml-2">
                    <Avatar
                        src={profileImage}
                        alt="Profile"
                        style={{
                            width: '60px', // smaller avatar size
                            height: '60px', // smaller avatar size
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }}
                    />
                    <UploadProfile />
                </div>
                {/* <Typography sx={{ textAlign: 'center', color: 'black', marginLeft: '10px' }}>
                    {user?.name}
                </Typography> */}
            </div>
        </div>
    )
}

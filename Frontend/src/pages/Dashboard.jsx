import React, { useContext, useEffect } from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import { UserContext } from '../context/User'
import Layout from '../components/shared/Layout'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import axios from 'axios'
import Welcome from '../Page/welcome'
import UserProfileDashboard from '../components/Profile/UserProfileDashBoard'
import Progress from '../components/Dashboard/Progress'

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext)
    const role = sessionStorage.getItem('logged_user_role') ? sessionStorage.getItem('logged_user_role') : null

    const getuserbyid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_user_by_id/${id}/student`)
            setUser(response.data[0])
        } catch (error) {
            console.error(`Error fetching `, error)
            return null
        }
    }

    // useEffect(() => {
    //     if (user) {
    //         getuserbyid(user?._id)
    //     }
    // }, [])

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-row" style={{ backgroundColor: '#F5F5F5' }}>
        <Sidebar style={{ width: '250px' }} /> {/* Fixed width for Sidebar */}
        <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 min-h-0 overflow-auto">
                        {/* <Welcome className="w-full"/> */}
                <div className="flex flex-col gap-4" style={{marginTop:'20px'}}>
                    <div className="flex flex-row gap-4 w-full">
                        {/* <UserProfileDashboard className="flex-1" /> */}
                    </div>
                    <DashboardStatsGrid />
                </div>
            </div>
        </div>
    </div>
    )
}

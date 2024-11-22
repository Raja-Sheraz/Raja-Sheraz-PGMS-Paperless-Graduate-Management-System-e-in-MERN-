import React, { useContext, useEffect, useState } from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import { UserContext } from '../context/User'
import Layout from '../components/shared/Layout'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import axios from 'axios'

import UserProfileDashboard from '../components/Profile/UserProfileDashBoard'
import Progress from '../components/Dashboard/Progress'
import { Typography } from '@mui/material'
import { Box, Card, CardContent, Divider, Grid, List, ListItem, Avatar } from '@mui/material'

export default function CommettiStudents() {
    const { user, setUser } = useContext(UserContext)

    let [students, setstudents] = useState([]);
    let [updated, setupdated] = useState(false);

    let get_studets_with_commetti_teacher_id = async () => {
        let response = await axios.post('/get_studets_with_commetti_teacher_id', {
            '_id': user._id
        });
        // console.log(response.data)
        setstudents(response.data);
        setupdated(true);

    }
    useEffect(() => {
        if (students.length == 0 && !updated) {
            get_studets_with_commetti_teacher_id();
        }
    }, [students])

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-row" style={{ backgroundColor: '#F5F5F5' }}>
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <div className="flex flex-col gap-4">

                        {updated &&
                            <>
                                {
                                    students?.length > 0 &&
                                    <>
                                        <h1 style={{ color: 'white', fontSize: '30px' }}>Students</h1>
                                        {
                                            students?.map((item) => {
                                                return <div>
                                                    <Card
                                                        variant="outlined"
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: '400px',
                                                            // backgroundColor: '#fff',
                                                            marginBottom: 1,
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            // border: '1px solid gray',
                                                            backgroundColor: '#1C1F26',
                                                            border: '1px solid #545B6A'
                                                        }}

                                                    >
                                                        <CardContent>

                                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>

                                                                <Avatar alt="User" src={"supervisor"} style={{
                                                                    background: '#1C1F26',
                                                                    border: '2px solid #545B6A',
                                                                    width: '70px',
                                                                    height: '70px',
                                                                    fontSize: '40px',
                                                                    color: 'greenyellow'
                                                                }} />

                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{ fontWeight: 'bold', marginLeft: '10px' }}
                                                                    style={{ color: 'orange', fontSize: '20px' }}
                                                                >
                                                                    {item.name} ({item?.reg_no})
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" sx={{ marginBottom: '10px', fontSize: '20px', marginLeft: '80px', color: 'white' }}>
                                                                {item.department}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            })
                                        }
                                    </>
                                }
                            </>}
                    </div>
                </div>
            </div>
        </div>

    )
}

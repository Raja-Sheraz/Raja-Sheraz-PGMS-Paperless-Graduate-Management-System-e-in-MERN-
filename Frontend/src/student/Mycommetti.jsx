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

export default function Mycommetti() {
    const { user, setUser } = useContext(UserContext)

    let [commetti, setcommetti] = useState([]);
    let [updated, setupdated] = useState(false);

    let get_studets_with_commetti_id = async () => {
        let response = await axios.post('/get_commetti_with_id', {
            '_id': user.commetti_id
        });
        setcommetti(response.data);
    }

    const getuserbyid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_user_by_id/${id}/teacher`);
            return response.data[0]
        } catch (error) {
            console.error(`Error fetching `, error)
            return null
        }
    }

    let get_all_teachers = async () => {

        const _data = await Promise.all(commetti[0]?.commetti_members?.map(async (item, index) => {
            let teacher = await getuserbyid(item);
            return teacher;
        }));

        commetti[0]['members_name'] = _data;

        setcommetti(...commetti);
        setupdated(true);
    }

    useEffect(() => {
        if (user.commetti_id && commetti.length == 0) {
            get_studets_with_commetti_id();
        }
        else if (commetti.length > 0 && !updated) {
            get_all_teachers();
        }
    }, [commetti])

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <div className="flex flex-col gap-4">

                        {updated &&
                            <>
                                {
                                    commetti?.members_name?.length > 0 &&
                                    <>
                                        <div className='d-flex justify-content-center ' style={{borderBottom:'1px solid gray'}}>
                                            <h1 className='display-6'>{commetti?.commetti_title}
                                            </h1>
                                        </div>
                                        <h1 className='mt-2 ' style={{fontSize:"20px",fontWeight:600}}>Your commetti Teachers</h1>
                                        {
                                            commetti?.members_name?.map((item) => {
                                                return <div>
                                                    <Card
                                                        variant="outlined"
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: '300px',
                                                            backgroundColor: '#fff',
                                                            marginBottom: 1,
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            border: '1px solid gray'
                                                        }}

                                                    >
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                                                <Avatar alt="User" src={"supervisor"} />
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{ fontWeight: 'bold', marginLeft: '10px' }}
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                                                {item.qualification}
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

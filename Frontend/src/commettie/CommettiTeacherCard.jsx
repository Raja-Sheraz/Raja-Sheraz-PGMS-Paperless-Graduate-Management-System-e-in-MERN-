import React, { useState, useContext, useEffect } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { UserContext } from '../context/User'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { uploadStudentPDF } from '../apis/UploadStudentPdf'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Box, Card, CardContent, Divider, Grid, List, ListItem, Avatar, Typography } from '@mui/material'

function CommettiTeacherCard({ teacher, teachers, setteachers }) {
    let [iselected, setiselected] = useState(false)

    let changecommetti = (teacher) => {
        setteachers((teachers) => {
            const index = teachers.findIndex((t) => t.teacher_id === teacher._id)
            if (index !== -1) {
                // Teacher already exists, remove it
                const updatedTeachers = [...teachers.slice(0, index), ...teachers.slice(index + 1)]
                return updatedTeachers
            } else {
                // Teacher doesn't exist, insert it
                return [...teachers, { teacher_id: teacher._id, teacher_name: teacher.name }]
            }
        })
    }

    return (
        <>
            <div
                onClick={() => {
                    setiselected(!iselected)
                    changecommetti(teacher)
                }}
            >
                <Grid xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Card
                        variant="outlined"
                        sx={{
                            width: '100%',
                            height: '100%',
                            // maxWidth: '300px',
                            // background: 'linear-gradient(to right, #1A1E46, #00073D)',
                            // background: 'linear-gradient(45deg, #87a8d0 30%, #fc92e3 90%)', // Gradient colors here
                            background: '#F5F5F5',
                            marginBottom: 1,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            border: iselected ? '2px solid green' : '1 px solid gray'
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                <Avatar
                                    alt="User"
                                    src={'supervisor'}
                                    style={{
                                        color: 'orange',
                                        border: '1px solid #545B6A',
                                        backgroundColor: 'gray',
                                        width: '60px',
                                        height: '60px'
                                    }}
                                />
                                <Typography variant="body1" sx={{ marginLeft: '10px' }} style={{ color: 'orange' }}>
                                    {teacher.name}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ marginBottom: '10px', color: 'black',textAlign:'center',fontSize:'15px' }}>
                                {teacher.qualification}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default CommettiTeacherCard

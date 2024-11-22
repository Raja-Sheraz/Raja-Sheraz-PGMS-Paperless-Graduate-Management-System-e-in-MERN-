import React, { useState, useContext } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'

export default function ApplicationFormSubmission({ onSelectSubmissionType, selected }) {
    const [submissionType, setSubmissionType] = useState('Proposal')
    const { user, setUser } = useContext(UserContext)
    const [selectApplicationForm, setSelectApplicationForm] = useState('')

    const handleApplicationFormChange = (event) => {
        setSelectApplicationForm(event.target.value)
        setUser((prevUser) => {
            return {
                ...prevUser,
                superVisor: event.target.value
            }
        })
    }

    const handleChange = (event) => {
        const selectedType = event.target.value
        setSubmissionType(selectedType)
        onSelectSubmissionType(event.target.value) // Callback function to send back the selected type
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {
                <Typography
                    variant="h5"
                    sx={{
                        width: '40%',
                        margin: '40px 0 20px',
                        fontWeight: 'bold'
                    }}
                >
                    Select Application Form
                </Typography>
            }
            <FormControl
                style={{
                    width: '40%',
                    margin: '0' // Adjusted margin
                }}
            >
                <InputLabel id="application-label">Select Application Form</InputLabel>
                <Select
                    labelId="application-label"
                    id="application-select"
                    label="Select Application Form"
                    value={selected}
                    onChange={handleChange}
                >
                    <MenuItem value="Application for leave of absence">Application for leave of absence</MenuItem>
                    <MenuItem value="Application for rejoining after leave">
                        Application for rejoining after leave
                    </MenuItem>
                    <MenuItem value="Appointment of Supervisor and Supervisory Committee">
                        Appointment of Supervisor and Supervisory Committee
                    </MenuItem>
                    <MenuItem value="Application for extension in duration of studies">
                        Application for extension in duration of studies
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

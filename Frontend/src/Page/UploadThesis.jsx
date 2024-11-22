import React, { useState } from 'react'
import axios from 'axios'
import { Container, TextField, Typography, Button, Card, CardContent, TextareaAutosize } from '@material-ui/core'

const UploadThesis = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile.type === 'application/pdf') {
            setFile(selectedFile)
        } else {
            alert('Please select a PDF file.')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('author', author)
        formData.append('file', file)

        try {
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert('File uploaded successfully!')
            setTitle('')
            setDescription('')
            setAuthor('')
            setFile('')
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Error uploading file. Please try again.')
        }
    }

    return (
        <Container
            // maxWidth="lg"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                marginLeft: '170px',
                width:'800px'
                // marginTop: 10,
                // width: '100%',
            }}
        >
            <Card
                style={{
                    margin: 'auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    
                    // border: '1px solid #545B6A'
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        style={{ color: '#7F3DD5', fontFamily: 'initial' ,fontWeight:'bold',fontSize:'35px'}}
                    >
                        Upload Thesis
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            style={{ color: 'black' }}
                            InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: 'black' } }}
                            InputLabelProps={{ style: { color: '#7F3DD5', fontSize: '20px' } }}
                        />
                        <TextareaAutosize
                            aria-label="minimum height"
                            rowsMin={3}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: '#7F3DD5' } }}
                            InputLabelProps={{ style: { color: 'white', fontSize: '20px' } }}
                            style={{
                                width: '100%',
                                marginBottom: '15px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #7F3DD5',
                                backgroundColor: 'white',
                                color: 'black'
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            InputProps={{ style: { border: '1px solid #ccc', borderRadius: '4px', color: 'black' } }}
                            InputLabelProps={{ style: { color: '#7F3DD5', fontSize: '20px' } }}
                        />
                        <input
                            accept=".pdf"
                            id="contained-button-file"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file" style={{ width: '100%' }}>
                            <Button
                                variant="contained"
                                component="span"
                                color="secondary"
                                style={{ marginTop: '20px', backgroundColor: '#7F3DD5', color: 'white' }}
                                fullWidth
                            >
                                Choose File
                            </Button>
                        </label>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            style={{ marginTop: '20px', backgroundColor: '#7F3DD5', color: 'white' }}
                        >
                            Upload Thesis
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default UploadThesis

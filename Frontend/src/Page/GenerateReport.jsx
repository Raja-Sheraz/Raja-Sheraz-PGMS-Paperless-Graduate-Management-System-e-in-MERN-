import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import MUIDataTable from 'mui-datatables'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Swal from 'sweetalert2'
import { jsPDF } from 'jspdf'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Profile from '../pictures/Comsat.jpg'
export default function GenerateReport() {
    let [update, setupdate] = useState(false)
    const navigate = useNavigate()
    let [students, setstudents] = useState([])

    let get_students = async () => {
        setstudentselected(false)
        setproposal(null)
        setproposalselected(null)
        setstudents(null)
        seterror('')
        if (student_name != '') {
            const response = await axios.post('/get_students_with_name', {
                student_name: student_name
            })
            setstudents(response.data)
            // console.log(response.data)
            if (response.data.length == 0) {
                seterror('No Record Found')
            }
        } else {
            alert('Enter Name ')
        }
    }
    let [student_name, setstudent_name] = useState('')
    let [student, setstudent] = useState(null)
    let [studentselected, setstudentselected] = useState(false)

    let [proposal, setproposal] = useState(null)
    let [proposalselected, setproposalselected] = useState(false)

    let [error, seterror] = useState('')

    const get_student_papers = async (id) => {
        const response = await axios.post('/get_student_proposals', {
            student_id: id
        })
        setproposal(response.data)
    }

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: 'department',
            label: 'Department'
        },
        {
            name: 'email',
            label: 'Email'
        },
        {
            name: 'cnic',
            label: 'CNIC'
        },
        {
            name: 'phone',
            label: 'Contact'
        },
        {
            name: '_id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <a
                                className="details-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setstudent(students.filter((item) => item._id == value))
                                    setstudentselected(true)
                                    get_student_papers(value)
                                }}
                            >
                                Select
                            </a>
                        )
                    }
                }
            }
        }
    ]
    const columns_two = [
        {
            name: 'name',
            label: 'Name',
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: 'department',
            label: 'Department'
        },
        {
            name: 'email',
            label: 'Email'
        },
        {
            name: 'cnic',
            label: 'CNIC'
        },
        {
            name: 'phone',
            label: 'Contact'
        }
    ]

    const options = {
        // filterType: "checkbox",
        // selecttablesRows: false,
        // selecttablesRows: false,
        // elevation: 0,
        // rowsPerPage: 5,
        // rowsPerPageOptions: [5, 10, 20, 30]
        filter: true,
        // filterType: 'checkbox',
        download: true,
        sort: false,
        responsive: 'vertical', // standard | vertical | simple
        // selectableRows: 'multiple',
        selectableRowsOnClick: false,
        print: true,
        viewColumns: false,
        searchOpen: false,
        search: true,
        page: 0,
        pageSize: 10,
        // rowsPerPage: 10,
        rowsPerPageOptions: [],
        // filterType: 'checkbox',
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30]
    }
    const getMuiTheme = () =>
        createTheme({
            typography: {
                fontFamily: 'sans-serif'
            },
            palette: {
                background: {
                    paper: 'white',
                    default: 'white'
                },
                mode: 'light'
            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: '10px 4px',
                            border: '1px solid #545B6A',
                            fontWeight: 'bold',
                            fontFamily: 'initial',
                            fontSize: '20px',
                            textAlign: 'center'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid #545B6A',
                            fontSize: '15px',
                            fontFamily: 'sans-serif'
                        },
                        footer: {
                            backgroundColor: 'white',
                            border: '1px solid #545B6A'
                        }
                    }
                }
            }
        })
    const options_two = {
        // filterType: "checkbox",
        // selecttablesRows: false,
        // selecttablesRows: false,
        // elevation: 0,
        // rowsPerPage: 5,
        // rowsPerPageOptions: [5, 10, 20, 30]
        filter: true,
        // filterType: 'checkbox',
        download: true,
        sort: false,
        responsive: 'vertical', // standard | vertical | simple
        // selectableRows: 'multiple',
        selectableRowsOnClick: false,
        print: true,
        viewColumns: false,
        searchOpen: false,
        search: true,
        page: 0,
        pageSize: 10,
        // rowsPerPage: 10,
        rowsPerPageOptions: [],
        // filterType: 'checkbox',
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30]
    }
    const getMuiTheme1 = () =>
        createTheme({
            typography: {
                fontFamily: 'sans-serif'
            },
            palette: {
                background: {
                    paper: 'white',
                    default: 'white'
                },
                mode: 'light'
            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: '10px 4px',
                            border: '1px solid #545B6A',
                            fontWeight: 'bold',
                            fontFamily: 'initial',
                            fontSize: '20px',
                            textAlign: 'center'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid #545B6A',
                            fontSize: '15px',
                            fontFamily: 'sans-serif'
                        },
                        footer: {
                            backgroundColor: 'white',
                            border: '1px solid #545B6A'
                        }
                    }
                }
            }
        })

    /////////////////////////////////////////////
    const columns_proposal = [
        {
            name: 'document_name',
            label: 'Document Name',
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: 'pdfName',
            label: 'Pdf Name'
        },
        {
            name: '_id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <a
                                className="details-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setproposal(proposal.filter((item) => item._id == value))
                                    setproposalselected(true)
                                }}
                            >
                                Select
                            </a>
                        )
                    }
                }
            }
        }
    ]

    const generate_Report = async () => {
        try {
            const response = await axios.post('/get_report', {
                report_identifier: proposal[0]?.report_identifier
            });
    
            const content = response.data[0].Content;
            const doc = new jsPDF();
            const maxLineWidth = 180; // Adjust this value to fit your layout
            const lineHeight = 12; // Adjust line height as needed
            const topMargin = 20; // Adjust top margin
            const leftMargin = 10;
            const pageHeight = doc.internal.pageSize.height;
            const lines = doc.splitTextToSize(content, maxLineWidth);
    
            let yPosition = topMargin;
    
            // Convert image to base64
            const imgData = await getImageData(Profile); // Function to convert image to base64
    
            // Center position for the circle containing the image
            const centerX = doc.internal.pageSize.width / 2;
            const centerY = yPosition + 30; // Adjust as needed
    
            // Draw a circle to contain the image
            const circleRadius = 25; // Adjust circle radius as needed
            doc.setDrawColor(0); // Set circle outline color to black
            doc.setFillColor(255, 255, 255); // Set circle fill color to white
            doc.circle(centerX, centerY, circleRadius, 'FD'); // 'FD' means fill and stroke
    
            // Clip the image within the circle
            doc.clip();
    
            // Add image inside the circle
            doc.addImage(imgData, 'JPEG', centerX - circleRadius, centerY - circleRadius, circleRadius * 2, circleRadius * 2);
    
            // Reset clipping
            doc.clip('reset');
    
            yPosition += 70; // Adjust yPosition to leave space after the image
    
            // Add header
            const header = 'PaperLess Graduate Research Management System Report';
            doc.setFont('helvetica', 'bold'); // Set font to Helvetica bold
            doc.setFontSize(20); // Set font size to 20
            const headerWidth = doc.getStringUnitWidth(header) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const x = (doc.internal.pageSize.width - headerWidth) / 2;
            doc.text(header, x, yPosition);
            yPosition += lineHeight + 10; // Add extra space after the header


            const txt = 'Report Title';
            doc.setFont('helvetica', 'bold'); // Set font to Helvetica bold
            doc.setFontSize(20); // Set font size to 20
            const headerWidt = doc.getStringUnitWidth(txt) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const x1 = (doc.internal.pageSize.width - headerWidt) / 2;
            doc.text(txt, x1, yPosition);
            yPosition += lineHeight + 10; 

            
            // Add title with styling

            const title = `Report of ${proposal[0]?.document_name}`;
            doc.setFont('helvetica', 'bold'); // Set font to Helvetica bold for the title
            doc.setFontSize(16); // Set font size to 16
            const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
            doc.text(title, titleX, yPosition);
            yPosition += lineHeight + 10; // Add extra space after the title
    
            // Add content with styling
            doc.setFont('times', 'normal'); // Set font to Times normal
            doc.setFontSize(12); // Set font size to 12
    
            // Loop through each line of text
            lines.forEach((line, index) => {
                // Check if adding this line will exceed the page height
                if (yPosition + lineHeight > pageHeight - topMargin) {
                    doc.addPage(); // Add new page if overflow
                    yPosition = topMargin; // Reset yPosition for new page
                }
                doc.text(line, leftMargin, yPosition); // Add text line
                yPosition += lineHeight; // Move yPosition to next line
            });
    
            doc.save(`Report_${proposal[0]?.document_name}.pdf`); // Save PDF
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate report. Please try again.');
        }
    };
    const getImageData = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                canvas.toBlob((blob) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(blob)
                    reader.onloadend = () => {
                        resolve(reader.result)
                    }
                }, 'image/jpeg')
            }
            img.onerror = reject
            img.src = url
        })
    }
    

    return (
        <>
            <div>
                <h1
                    style={{
                        fontFamily: 'initial',
                        fontSize: '50px',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        // border: '1px solid #545B6A',
                        borderRadius: '10px',
                        color: '#7F3DD5',
                        // marginLeft: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    Generate Report
                </h1>
            </div>

            <div className="" style={{ width: '100%', marginTop: '50px' }}>
                <div className="d-flex" style={{ width: '1100px', height: '50px' }}>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setstudent_name(e.target.value)}
                        placeholder="Search student name"
                    />
                    <button className="btn btn-primary" onClick={get_students}>
                        Search
                    </button>
                </div>
                {error != '' && <p className="text-warning">{error}</p>}
                <div>
                    {students && students.length > 0 && !studentselected && (
                        <div className="mt-5" style={{
                            marginTop: '20px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '20px',
                            color: '#0c0116'
                        }}>
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable data={students} columns={columns} options={options} />
                            </ThemeProvider>
                        </div>
                    )}
                </div>
                <div style={{marginTop:'40px'}}>
                    {students && students.length > 0 && studentselected && (
                        <div className="mt-5" style={{
                            marginTop: '20px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '20px',
                            color: '#0c0116'
                        }}>
                            <h1>Student</h1>
                            <ThemeProvider theme={getMuiTheme1()}>
                                <MUIDataTable data={student} columns={columns_two} options={options_two} />
                            </ThemeProvider>
                        </div>
                    )}
                </div>

                <div style={{marginTop:'60px'}}>
                    {proposal && proposal.length > 0 && !proposalselected && (
                        <div className="mt-1" style={{
                            marginTop: '20px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '20px',
                            color: '#0c0116'
                        }}>
                            <h6 className=" mt-1">Select Proposal</h6>
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable data={proposal} columns={columns_proposal} options={options} />
                            </ThemeProvider>
                        </div>
                    )}
                </div>
                <div>
                    {proposal && proposal?.length > 0 && proposalselected && (
                        <div className="mt-1" style={{
                            marginTop: '20px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '20px',
                            color: '#0c0116'
                        }}>
                            <p>Proposal</p>
                            <ThemeProvider theme={getMuiTheme1()}>
                                <MUIDataTable data={proposal} columns={columns_proposal} options={options_two} />
                            </ThemeProvider>
                            <button className="btn btn-primary m-2" onClick={generate_Report}>
                                Generate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

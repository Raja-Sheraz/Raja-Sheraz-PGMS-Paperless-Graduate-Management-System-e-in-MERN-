import React, { useState, useEffect, useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/User';
import { TableHeading } from '../components/tableHeading';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell'; // Import TableCell

import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';

const CommentsPage = () => {
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const get_comments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/students/get_comments/${user._id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching PDF:', error);
            toast.error('Failed to get comments');
        } finally {
            setupdated1(true);
            setLoading(false);
        }
    };

    const getuserbyid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_user_by_id/${id}/teacher`);
            return response.data[0];
        } catch (error) {
            console.error('Error fetching ', error);
            return null;
        }
    };

    const get_pdf_data_id = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_pdf_by_id/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ', error);
            return null;
        }
    };

    let [updated, setupdated] = useState(false);
    let [updated1, setupdated1] = useState(false);

    const updatedata = async () => {
        let _data = await Promise.all(
            comments?.map(async (comment) => {
                let teacher = await getuserbyid(comment.teacher_id);
                comment['teacher_name'] = teacher.name;
                return comment;
            })
        );

        const new_data = await Promise.all(
            _data?.map(async (comment) => {
                let pdf = await get_pdf_data_id(comment.pdf_id);
                comment['document_name'] = pdf.document_name;
                return comment;
            })
        );

        setComments(new_data);
        setupdated(true);
    };

    useEffect(() => {
        if (comments.length > 0 && !updated) {
            updatedata();
        } else if (!updated1) {
            get_comments();
        }
    }, [comments]);

    const columns = [
        {
            name: 'teacher_name',
            label: 'Teacher',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    const truncatedValue = value?.substring(0, 30);
                    return truncatedValue;
                }
            }
        },
        {
            name: 'teacher_role',
            label: 'Role',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    const truncatedValue = value?.substring(0, 10);
                    return truncatedValue;
                }
            }
        },
        {
            name: 'document_name',
            label: 'Document',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    return value;
                }
            }
        },
        {
            name: 'text',
            label: 'Comment',
            options: {
                sort: false,
                customBodyRender: (value) => {
                    const truncatedValue = value.substring(0, 100);
                    return truncatedValue.length < value.length ? truncatedValue + '...' : truncatedValue;
                }
            }
        }
    ];

    const options = {
        filter: true,
        download: true,
        sort: false,
        responsive: 'vertical',
        selectableRowsOnClick: false,
        print: true,
        viewColumns: false,
        searchOpen: false,
        search: true,
        page: 0,
        pageSize: 10,
        rowsPerPageOptions: [],
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30]
    };

    const getMuiTheme = () =>
        createTheme({
            typography: {
                fontFamily: 'sans-serif'
            },
            palette: {
                background: {
                    // paper: '#3F51B5',
                    // default: '#FFFFFF'
                },
                mode: 'light'
            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: '10px 4px',
                            // border: '1px solid #545B6A'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: '#212121',
                            backgroundColor: '#FAFAFA',
                            // border: '1px solid #BDBDBD'
                        },
                        footer: {
                            backgroundColor: 'white',
                            border: '1px solid #545B6A'
                        }
                    }
                }
            }
        });

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <div className="bg-neutral-100 overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 min-h-0 overflow-auto">
                        {loading ? (
                            <div>Add Loader</div>
                        ) : (
                            <>
                                {comments.length > 0 ? (
                                    <>
                                        {comments.filter((item) => item.teacher_role === 'Supervisor').length > 0 && (
                                            <>
                                                <TableHeading name={'Supervisor Comments'} />
                                                <MUIDataTable
                                                    data={comments.filter((item) => item.teacher_role === 'Supervisor')}
                                                    columns={columns}
                                                    options={options}
                                                />
                                            </>
                                        )}
                                        {comments.filter((item) => item.teacher_role === 'CoordinateCommitte').length >
                                            0 && (
                                            <>
                                                <TableHeading name={'Commetti Comments'} />
                                                <MUIDataTable
                                                    data={comments.filter(
                                                        (item) => item.teacher_role === 'CoordinateCommitte'
                                                    )}
                                                    columns={columns}
                                                    options={options}
                                                />
                                            </>
                                        )}
                                        {comments.filter((item) => item.teacher_role === 'DAC').length > 0 && (
                                            <>
                                                <TableHeading name={'DAC Comments'} />
                                                <MUIDataTable
                                                    data={comments.filter((item) => item.teacher_role === 'DAC')}
                                                    columns={columns}
                                                    options={options}
                                                />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <MUIDataTable
                                        data={[]}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CommentsPage;

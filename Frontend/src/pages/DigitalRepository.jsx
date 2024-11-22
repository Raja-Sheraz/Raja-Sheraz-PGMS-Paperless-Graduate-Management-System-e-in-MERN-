import React, { useState, useEffect } from 'react';
import Sidebar from '../components/shared/Sidebar';
import {
    TextField,
    IconButton,
    InputAdornment,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { FcReading } from 'react-icons/fc';
import { BsFillPencilFill } from 'react-icons/bs';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function DigitalRepository() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset search results when searchTerm changes
        setSearchResults([]);
    }, [searchTerm]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/search?term=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async (pdfPath) => {
        // Logic to download PDF
    };

    const handleReadPDF = (pdfPath) => {
        // setSelectedPdf('http://localhost:5000/' + pdfPath)
        let anchor = document.createElement('a')
        anchor.href = 'http://localhost:5000/' + pdfPath
        anchor.target = '_blank'
        anchor.click()
    }

    const highlightText = (text, highlight) => {
        if (!highlight) return text;

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: 'yellow', color: 'black' }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="bg-neutral-100 overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1" style={{ backgroundColor: '#F5F5F5' }}>
                <div style={{ padding: '16px' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ backgroundColor: 'white', border: '1px solid #545B6A', color: 'black' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch} size="large">
                                        <SearchIcon style={{ color: 'black' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: {
                                color: 'black'
                            }
                        }}
                    />
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <CircularProgress />
                    </div>
                ) : searchResults.length === 0 ? (
                    <Typography variant="h5" style={{ textAlign: 'center', marginTop: '20px' }}>
                        No results found
                    </Typography>
                ) : (
                    <Table style={{ marginLeft: '15px', width: '97%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: '#f50057', fontSize: '15px', fontWeight: 'bold' }}>
                                    Thesis Title
                                </TableCell>
                                <TableCell style={{ color: '#f50057', fontSize: '15px', fontWeight: 'bold' }}>
                                    Description
                                </TableCell>
                                <TableCell style={{ color: '#f50057', fontSize: '15px', fontWeight: 'bold' }}>
                                    Author Name
                                </TableCell>
                                <TableCell style={{ color: '#f50057', fontSize: '15px', fontWeight: 'bold' }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ color: 'white' }}>
                            {searchResults.map((result, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ color: 'orange', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                        {highlightText(result.title, searchTerm)}
                                    </TableCell>
                                    <TableCell style={{ color: '#cccccc' }}>
                                        {highlightText(result.description, searchTerm)}
                                    </TableCell>
                                    <TableCell style={{ color: '#cccccc' }}>
                                        <Button style={{ color: '#cccccc' }}>
                                            <BsFillPencilFill style={{ color: 'yellow', fontSize: '30px' }} />
                                            {highlightText(result.author, searchTerm)}
                                        </Button>
                                    </TableCell>
                                    <TableCell style={{ color: 'green' }}>
                                        <Button onClick={() => handleReadPDF(result.pdfPath)} style={{ color: 'green' }}>
                                            <FcReading style={{ fontSize: '50px', color: 'green' }} />
                                            Read PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}

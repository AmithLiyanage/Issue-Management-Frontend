import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AddIssue() {
    const paperStyle = { padding: '50px 20px', width: 'calc(100%-40px)', margin: "20px auto" }
    const [issueName, setIssueName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [issues, setIssues] = useState([])

    const handleClick = (e) => {
        e.preventDefault()
        const issue = { issueName, description, type }
        console.log(issue)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issue)
        };
        fetch("http://localhost:8080/issue/add", requestOptions)
            .then(() => {
                console.log("New Issue is Added")
            })
    }

    return (
        <Container>
            {/* <div class = "paper-arrange-horizontal"> */}
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add Issue</h1>
                <form style={{ margin: '10px 0px', padding: '10px 0' }} noValidate autoComplete="off">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '80%', margin: '10px 5px', padding: '10px' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            value={issueName}
                            onChange={(e) => setIssueName(e.target.value)}
                            label="Issue Name"
                            variant="outlined"
                            fullWidth
                            className='paper-inpt-fields'
                        />
                        <TextField
                            id="outlined-basic"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            className='paper-inpt-fields'
                        />
                        <FormControl fullWidth>
                            {/* // see: https://mui.com/system/the-sx-prop/ */}
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value={"BUG"}>Bug</MenuItem>
                                <MenuItem value={"QUESTION"}>Question</MenuItem>
                                <MenuItem value={"IMPROVEMENT"}>Improvement</MenuItem>
                            </Select>
                        </FormControl>
                        {/* default state need to set as OPEN */}
                        <Stack spacing={2} direction="rtl" style={{ margin: 'auto', direction: 'rtl' }}>
                            <Button variant="contained" color="primary" onClick={handleClick}>Create</Button>
                        </Stack>
                    </Box>
                </form>

                {/* <form style={{ margin: '10px 5px', padding: '10px' }} noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic"
                        value={issueName}
                        onChange={(e) => setIssueName(e.target.value)}
                        label="Issue Name"
                        variant="outlined"
                        fullWidth
                        className='paper-inpt-fields' />
                    <TextField
                        id="outlined-basic"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        className='paper-inpt-fields'
                    />
                    <FormControl variant="outlined" fullWidth className='paper-inpt-fields'>
                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                        
                        <Select

                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label="Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"BUG"}>Bug</MenuItem>
                            <MenuItem value={"QUESTION"}>Question</MenuItem>
                            <MenuItem value={"IMPROVEMENT"}>Improvement</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Button variant="contained" color="secondary" onClick={handleClick} style={{ margin: "24px 0" }} >
                        Create
                    </Button>
                </form> */}
            </Paper>
        </Container>
    );
}

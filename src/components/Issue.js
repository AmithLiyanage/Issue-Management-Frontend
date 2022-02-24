import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Container, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    default: {
        '& > *': {
            margin: '10px 5px'
        },
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width:'80%'
        },
    },
}));

export default function Issue() {
    const paperStyle = { padding: '50px 20px', width: 1000, margin: "20px auto" }
    const [issueName, setIssueName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault()
        const issue = { issueName, description, type }
        console.log(issue)

        // const requestO = {
        //     method: "POST",
        //     hearders: { "Content-Type": "application/json" },
        //     body: JSON.stringify(issue)
        // }
        // fetch("http://localhost:8080/issue/add", requestO)
        //     .then(() => {
        //         console.log("New Issue is Added")
        //     })


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
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add Issue</h1>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic"
                        value={issueName}
                        onChange={(e) => setIssueName(e.target.value)}
                        label="Issue Name"
                        variant="outlined"
                        fullWidth />
                    <TextField
                        id="outlined-basic"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Description"
                        variant="outlined"
                        fullWidth
                    />
                    {/* <TextField
                        id="outlined-multiline-static"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                    /> */}
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
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
                    {/* default state need to set as OPEN */}
                    <Button variant="contained" color="secondary" onClick={handleClick} style={{margin: "24px 0"}} className={classes.default} >
                        Create
                    </Button>
                </form>
                {issueName}
                {description}
                {type}
            </Paper>
        </Container>
    );
}

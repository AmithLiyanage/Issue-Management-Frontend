import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Container, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Issue() {
    const paperStyle={padding:'50px 20px', width:600 ,margin:"20px auto"}
    const classes = useStyles();

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Add Issue</h1>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Issue Name" variant="outlined" fullWidth/>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                        fullWidth
                    />
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //   value={type}
                            //   onChange={handleChange}
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
                    {/* default state sat as OPEN */}
                </form>
            </Paper>
        </Container>
    );
}

import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

export default function FormDialog({ ed_issueID }) {
    const [open, setOpen] = React.useState(opened);
    const [issueHistory, setRes] = useState([])
    var data = [];

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:8080/issue/getEventsByIssue/" + ed_issueID)
                .then(res => res.json())
                .then((result) => {
                    setRes(result);
                })
            // const data = await res.json()
            // const newStatus = data.map(obj => (obj.availableStatus))
            // const oldIssue = data.map(obj => (obj.count))
            // console.log("from bc : " + newStatus)
            // console.log("from bc : " + oldIssue)
            // setAvailabeStatus(newStatus)
            // setOldIssue(oldIssue)
        })()
        // console.log("from data" + data)
        setOpen(opened)
    }, [opened])


    React.useEffect(() => {
        console.log(ed_issueID)
    }, [ed_issueID])

    const handleClose = () => {
        setOpened(false)
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Issue</DialogTitle>
                <DialogContent>
                    <Container>
                        <Paper elevation={3} style={paperStyle}>
                            <EditDialog ed_issueID={ed_issueID} opened={opened} setOpened={setOpened} />
                            <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>All Issues</h2>
                            {issueHistory.map(issue => (
                                <Paper elevation={6} style={{ margin: "8px", textAlign: "left", display: 'flex' }} key={issue.issueId}>
                                    <div style={{ width: "100%" }}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: "50%", textAlign: "left", display: 'flex', padding: "8px" }}>
                                                <div style={{ padding: "inherit" }}>#{issue.issueId}</div>
                                                <div style={{ fontWeight: "bold", padding: "inherit" }}> {issue.issueName}</div>
                                            </div>
                                            <div style={{ width: "50%", display: 'flex', direction: "rtl", padding: "8px" }}>
                                                <div style={{ color: "blueviolet", textAlign: "end", fontWeight: "bold", padding: "inherit" }}>
                                                    {issue.state}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: "50%", textAlign: "left", display: 'flex', padding: "0 8px" }}>
                                                <div style={{ padding: "inherit" }}>{issue.type}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: "60%", textAlign: "left", display: 'flex', padding: "0 8px 8px 8px" }}>
                                                <div style={{ padding: "inherit" }}>{issue.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            ))}
                        </Paper>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

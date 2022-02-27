import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '@mui/material';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Issue() {
    const paperStyle = { padding: '24px 20px', width: 'calc(100%-40px)', margin: "20px auto" }
    const [issueName, setIssueName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [issues, setIssues] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/issue/getAllIssues")
            .then(res => res.json())
            .then((result) => {
                setIssues(result);
            })
    })

    const editIssse = (e) => {
        e.preventDefault()
        const issue = { issueName, description, type }
        console.log(issue)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issue)
        };
        fetch("http://localhost:8080/issue/addsg", requestOptions)
            .then(() => {
                console.log("New Issue is Added")
            })
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>All Issues</h2>
                {issues.map(issue => (
                    <Paper elevation={6} style={{ margin: "8px", padding: "16px", textAlign: "left", display: 'flex' }} key={issue.issueId}>
                        <div style={{ width: "80%" }}>
                            <div style={{ display: 'flex', margin: "5px 0" }}>
                                <div style={{ width: "60%", textAlign: "left", display: 'flex' }}>
                                    <div>#{issue.issueId}</div>
                                    <div style={{ fontWeight: "bold", marginLeft: "10px" }}> {issue.issueName}</div>
                                </div>
                                <div style={{ width: "40%", textAlign: "end", color: "blueviolet", fontWeight: "bold" }}>{issue.state}</div>
                            </div>
                            <div style={{ display: 'flex', margin: "5px 0" }}>
                                <div style={{ width: "60%", textAlign: "left" }}>{issue.type}</div>
                            </div>
                            <div style={{ display: 'flex', margin: "5px 0" }}>
                                <div style={{ width: "60%", textAlign: "left" }}>{issue.description}</div>
                            </div>
                        </div>
                        <div style={{ width: "20%", direction: "rtl", display: "inline-grid" }}>
                            <Button variant="contained" color="primary" direction="rtl" style={{ margin: '0 0 8px 16px', direction: 'rtl' }} onClick={editIssse}>Edit</Button>
                            <Button variant="outlined" color="primary" direction="rtl" style={{ margin: '0 0 8px 16px', direction: 'rtl' }} onClick={editIssse}>Delete</Button>
                        </div>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}

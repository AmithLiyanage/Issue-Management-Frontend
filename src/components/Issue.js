import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function Issue() {
    const paperStyle = { padding: '50px 20px', width: 'calc(100%-40px)', margin: "20px auto" }
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

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h2>All Issues</h2>
                {issues.map(issue => (
                    <Paper elevation={6} style={{ margin: "8px", padding: "15px", textAlign: "left" }} key={issue.issueId}>
                        <div style={{ display: 'flex', marginBottom: "10px" }}>
                            <div style={{ width: "50%", textAlign: "left" }}>#{issue.issueId}   {issue.issueName}</div>
                            <div style={{ width: "50%", textAlign: "end" }}>{issue.type}</div>
                        </div>
                        <div style={{ display: 'flex'}}>
                            <div style={{ width: "60%", textAlign: "left" }}>{issue.description}</div>
                            <div style={{ width: "40%", textAlign: "end" }}>{issue.state}</div>
                        </div>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}

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
            <h2>All Issues</h2>
            <Paper elevation={3} style={paperStyle}>
                {issues.map(issue => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={issue.issueId}>
                        issueId:{issue.issueId}<br/>
                        IssueName:{issue.issueName}<br/>
                        Description:{issue.description}<br/>
                        Type:{issue.type}<br/>
                        State:{issue.state}<br/>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}

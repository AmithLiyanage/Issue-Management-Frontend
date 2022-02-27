import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

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

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>All Issues</h2>
                {issues.map(issue => (
                    <Paper elevation={6} style={{ margin: "8px", padding: "16px", textAlign: "left" }} key={issue.issueId}>
                        <div style={{ display: 'flex', marginBottom: "10px" }}>
                            <div style={{ width: "50%", textAlign: "left" }}>#{issue.issueId}   {issue.issueName}</div>
                            <div style={{ width: "50%", textAlign: "end" }}>{issue.type}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: "60%", textAlign: "left" }}>{issue.description}</div>
                            <div style={{ width: "40%", textAlign: "end" }}>{issue.state}</div>
                        </div>
                    </Paper>
                ))}
            </Paper>
            {/* <Paper>
                <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </Paper> */}
        </Container>
    );
}

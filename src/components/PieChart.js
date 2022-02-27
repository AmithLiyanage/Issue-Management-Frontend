import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';


import Plot from 'react-plotly.js';

export default function PieChartFN() {
    const paperStyle2 = { padding: '50px 20px', width: 'calc(50% - 60px)', margin: "20px auto" }
    const paperStyle = { padding: '24px 20px', width: 'calc(100%-40px)', margin: "20px auto" }
    const [values, setValues] = useState([])
    const [labels, setLabels] = useState([])
    const [filteredIssues, setFilteredIssues] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:8080/issue/getStatusOfIssues")
            const data = await res.json()
            const names = data.map(obj => (obj.name))
            const count = data.map(obj => (obj.count))
            setValues(count)
            setLabels(names)
        })()
    }, [])

    const checkLabels = async label => {
        let res, response;
        switch (label) {
            case "OPEN":
                res = await fetch("http://localhost:8080/issue/getOpenIssues");
                response = await res.json()
                break;
            case "IN_PROGRESS":
                res = await fetch("http://localhost:8080/issue/getInProgressIssues");
                response = await res.json()

                break;
            case "WAITING_ON_CLIENT":
                res = await fetch("http://localhost:8080/issue/getWaitingOnClientIssues");
                response = await res.json()
                break;
            case "RESOLVED":
                res = await fetch("http://localhost:8080/issue/getResolvedIssues");
                response = await res.json()
                break;
            default:
                console.log("checkLabels : " + checkLabels)
                break;
        }
        console.log(response)
        setFilteredIssues(response)
    }

    return (
        <Container >
            <div className='paper-arrange-horizontal'>
                <Paper elevation={3} style={paperStyle2}>
                    <Plot
                        data={[
                            {
                                values: values,
                                labels: labels,
                                type: 'pie'
                            },
                        ]}
                        layout={{ width: 400, height: 300, title: 'Issue Pie Chart' }}

                        //onClick={(e) => console.log(e.points[0].label)}
                        onClick={async (e) => await checkLabels(e.points[0].label)}
                    />
                </Paper>

                <Paper elevation={3} style={paperStyle2}>
                    <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>Issues : </h2>
                    {filteredIssues.map(issue => (
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
            </div>
        </Container>
    );

}
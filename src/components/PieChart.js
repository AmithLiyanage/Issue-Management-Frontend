import * as React from 'react';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Paper from '@mui/material/Paper';

export default function PieChart() {
    const paperStyle2 = { padding: '50px 20px', width: 'calc(50% - 60px)', margin: "20px auto" }
    const chartData = [
        { country: 'Russia', area: 12 },
        { country: 'Canada', area: 7 },
        { country: 'USA', area: 7 },
        { country: 'China', area: 7 },
        { country: 'Brazil', area: 6 },
        { country: 'Australia', area: 5 },
        { country: 'India', area: 2 },
        { country: 'Others', area: 55 },
    ];

    const [issueState, setIssueState] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/issue/getIssuesByStatus")
            .then(res => res.json())
            .then((result) => {
                setIssueState(result);
            })
    })

    return (
        <Paper style={paperStyle2}>
            <Chart data={chartData} >
                <PieSeries  valueField="state" argumentField="country" />
                <Title text="Issue Status" />
                <Animation />
            </Chart>
            {/* <Chart data={chartData} >
                <PieSeries  valueField="area" argumentField="country" />
                <Title text="Issue Status" />
                <Animation />
            </Chart> */}
        </Paper>
    )

}
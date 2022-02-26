import './App.css';
import AppBar from './components/Appbar';
import Issue from './components/Issue';
import PieChart from './components/PieChart';
import AddIssue from './components/AddIssue';
import IssuePieChart from './components/IssuePieChart';

function App() {
    return (
        <div className="App" >
            <AppBar />
            {/* <PieChart /> */}
            <div style={{ margin: "8px", color: 'blueviolet', height: "400px" }}>
                <IssuePieChart />
            </div>
            <div id="pieChartContainer"></div>
            <div className='paper-arrange-horizontal'>
                <AddIssue />
                <Issue />
            </div>
        </div>);
}

export default App;
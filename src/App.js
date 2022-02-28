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
            <div className='paper-arrange-horizontal'><PieChart /></div>
            
            <div id="pieChartContainer"></div>
            <div className='paper-arrange-horizontal'>
                <AddIssue />
                <Issue />
            </div>
        </div>);
}

export default App;
import './App.css';
import AppBar from './components/Appbar';
import Issue from './components/Issue';
import PieChart from './components/PieChart';
import AddIssue from './components/AddIssue';

function App() {
    return (
        <div className="App" >
            <AppBar />
            <PieChart />
            <div className='paper-arrange-horizontal'>
                <AddIssue/>
                <Issue />
            </div>
        </div>);
}

export default App;
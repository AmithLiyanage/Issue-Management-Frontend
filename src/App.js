import './App.css';
import AppBar from './components/Appbar';
import Issue from './components/Issue';
import PieChart from './components/PieChart';

function App() {
    return ( 
    <div className = "App" >
        <AppBar/>
        <PieChart/>
        <Issue/>
        </div>);
    }

    export default App;
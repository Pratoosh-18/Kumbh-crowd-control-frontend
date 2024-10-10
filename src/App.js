import logo from './logo.svg';
import './App.css';
import CCTVDashboardLocal from './components/CCTVDashboardLocal/CCTVDashboardLocal';
import CCTVDashboardInputs from './components/CCTVDashboardInputs/CCTVDashboardInputs';

function App() {
  return (
    <>
    <h1>Live Camera Feeds</h1>
    {/* <CCTVDashboardInputs/> */}
    <CCTVDashboardLocal/>
    </>
  );
}

export default App;

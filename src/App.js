import logo from './logo.svg';
import './styles/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import LaunchDetails from './components/About.js';


function App() {
  return (
    <div className="App">
      <h4>Alexander Stasyna (N01627582) & Tanner Stephenson (N01286513)</h4>
      <h1>Pokemon Finder Application</h1>

      <Router>
        <Routes>
          <Route path='/' element={ <Home /> } />
          {/* Route About.js using some variable - pokemon id? */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

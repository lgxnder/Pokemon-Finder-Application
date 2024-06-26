import './styles/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import PokemonExt from './components/PokemonExt.js';


function App() {
  return (
    <div className="App">
      <h1>Pokemon Finder</h1>
      <h4>By Alexander Stasyna (N01627582) & Tanner Stephenson (N01286513)</h4>

      <Router>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path="/ext/:id" element={ <PokemonExt /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

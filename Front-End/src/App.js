import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Teams from './components/Teams';
import Position from './components/Position';
import Search from './components/Search';
import MatchPredictor from './components/MatchPredictor';
import TeamRoster from "./components/Teams/TeamRoster.js";
import PositionRoster from "./components/Position/PositionRoster.js";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Teams" element={<Teams />} />
          <Route path="/roster/:teamName" element={<TeamRoster />} />maps
          <Route path="/Position" element={<Position />} />
          <Route path="/positions/:positionName" element={<PositionRoster />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MatchPredictor" element={<MatchPredictor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
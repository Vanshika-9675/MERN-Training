import React from 'react';
import SignUp from './components/SignUp';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<SignUp/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
    </Router>
    </>
  )
}

export default App;

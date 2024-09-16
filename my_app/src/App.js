// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Import the Login page
import Signup from './pages/Signup'; // Import the Signup page
import './App.css'; // Assuming your App.css is in the src folder
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
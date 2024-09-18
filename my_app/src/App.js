// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Import the Login page
import Signup from './pages/Signup'; // Import the Signup page
import Home from './pages/Home'; // Import the Home page
import './App.css'; // Assuming your App.css is in the src folder
import LoadingScreen from './components/LoadingScreen'; // Import the Loading screen

function App() {
  const [loading, setLoading] = useState(true); // State to handle loading

  return (
    <Router>
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Default to login */}
            <Route path="/login" element={<Login />} /> {/* Explicit login route */}
            <Route path="/signup" element={<Signup />} /> {/* Signup route */}
            <Route path="/home" element={<Home />} /> {/* Home page route */}
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;

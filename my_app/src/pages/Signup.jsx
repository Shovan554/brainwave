// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Custom styles
import BrainwaveAnimation from '../components/BrainwaveAnimation';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username, email, password }),
      });
      const data = await response.json();

      if (data.success) {
        navigate('/login'); // Redirect to login after signup success
      } else {
        setError(data.message); // Show error from backend
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <BrainwaveAnimation />
        <div className="title-container">
          <span className="brain-text">Brain</span>
          <span className="wave-text">Wave</span>
        </div>
      </div>
      <div className="signup-form">
        <h2>Create a New Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <br />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

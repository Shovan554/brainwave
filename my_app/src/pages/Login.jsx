// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Custom styles
import BrainwaveAnimation from '../components/BrainwaveAnimation';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for login error
  const [isExiting, setIsExiting] = useState(false); // State for exit animation
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setIsExiting(true); // Trigger exit animation
    setTimeout(() => {
      navigate('/signup'); // Navigate to the signup page after animation
    }, 1000); // Match the animation duration (1s)
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to backend
      });

      const data = await response.json();

      if (data.success) {
        // Successful login, navigate to home
        navigate('/home');
      } else {
        // Show error from backend response
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <BrainwaveAnimation />
        <div className="title-container">
          <span className="brain-text">Brain</span>
          <span className="wave-text">Wave</span>
        </div>
      </div>
      <div className={`login-form ${isExiting ? 'login-form-exit' : ''}`}>
        <h2>WELCOME BACK!</h2>
        <form onSubmit={handleLogin}>
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
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <br />
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <p>
            Don't have an account?{' '}
            <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'blue' }}>
              Sign Up and get Learning
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

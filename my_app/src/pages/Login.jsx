// src/pages/Login.jsx
import React from 'react';
import '../styles/login.css'; // Custom styles
import BrainwaveAnimation from '../components/BrainwaveAnimation';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-header">
         <BrainwaveAnimation /> {/* Add the animation next to the title */}
        <div className ="title-container">
          <span className="brain-text">Brain</span>
          <span className="wave-text">Wave</span>
        </div>
       
      </div>
      <div className="login-form">
        <h2>WELCOME BACK!</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          
          <br></br>
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/signup">Sign Up and get Learning</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
// src/pages/Signup.jsx
import React, { useState } from 'react';
import '../styles/signup.css'; // Custom styles
import BrainwaveAnimation from '../components/BrainwaveAnimation';

const Signup = () => {
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

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
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type ="text" placeholder='UserName' required/>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
         

          <br />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <a href="/Login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
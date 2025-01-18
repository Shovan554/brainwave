// src/components/MainLogo.jsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/brain.json'; // Path to brain.json animation
import '../styles/mainLogo.css'; // Custom styles for the MainLogo

const MainLogo = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="main-logo-container">
      <div className="main-logo-animation">
        <Lottie options={defaultOptions} height={110} width={110} /> {/* Adjust size as needed */}
      </div>
      <div className="main-logo-title">
        <span className="main-logo-brain-text">Brain</span>
        <span className="main-logo-wave-text">Wave</span>
      </div>
    </div>
  );
};

export default MainLogo;
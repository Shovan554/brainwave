// src/components/BrainwaveAnimation.jsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/brain.json'; // Import your JSON file

const BrainwaveAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="brainwave-animation">
      <Lottie options={defaultOptions} height={250} width={250} /> {/* Increase size here */}
    </div>
  );
};

export default BrainwaveAnimation;
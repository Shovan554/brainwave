// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import BrainwaveAnimation from './BrainwaveAnimation'; // Import your animation
import '../styles/loadingScreen.css'; // Custom styles
import LoadingAnimation from './LoadingAnimation';
const LoadingScreen = ({ setLoading }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Set a timer to trigger the transition
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start the upward movement
      setTimeout(() => setLoading(false), 1500); // After transition, load the next screen
    }, 1000); // Wait 3 seconds before starting the transition

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className={`loading-screen ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="loading-header">
        <BrainwaveAnimation />
        <div className="title-container">
          <span className="loading-brain-text">Brain</span>
          <span className="loading-wave-text">Wave</span>
        </div>
        
        
      </div>
      
      <div className="Load-graphics">
          <LoadingAnimation />
        </div>
    </div>
  );
};

export default LoadingScreen;



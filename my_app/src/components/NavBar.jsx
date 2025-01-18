// src/components/NavBar.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/navBar.css';

const NavBar = () => {
  const navBarOptionsRef = useRef(null);

  const handleMouseEnter = (event) => {
    const option = event.target;
    const rect = option.getBoundingClientRect();
    const containerRect = navBarOptionsRef.current.getBoundingClientRect();
    const offsetLeft = rect.left - containerRect.left;
    const optionWidth = rect.width;

    // Set the --hover-position and --hover-width CSS variables
    navBarOptionsRef.current.style.setProperty('--hover-position', `${offsetLeft}px`);
    navBarOptionsRef.current.style.setProperty('--hover-width', `${optionWidth}px`);

    // Add the hover-active class to show the hover box
    navBarOptionsRef.current.classList.add('hover-active');
  };

  const handleMouseLeave = () => {
    // Remove the hover-active class to hide the hover box
    navBarOptionsRef.current.classList.remove('hover-active');
  };

  return (
    <div className="nav-bar-container">
      <div className="nav-bar-rect-container">
        <ul
          className="nav-bar-options"
          ref={navBarOptionsRef}
          onMouseLeave={handleMouseLeave} // Clear hover box when leaving NavBar
        >
          <li onMouseEnter={handleMouseEnter}>
            <Link to="/">Home</Link>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <Link to="/reels">Reels</Link>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <Link to="/create">Create</Link> 
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <Link to="/classroom">Classroom</Link>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <Link to="/messages">Messages</Link>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
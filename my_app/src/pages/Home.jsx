import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import NavBar from '../components/NavBar';
import MainLogo from '../components/MainLogo';
import SearchBar from '../components/SearchBar';
import Post from '../components/Post';
import '../styles/home.css';

const Home = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        console.log('Token from localStorage:', token);
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        setUserName(decodedToken.full_name);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Dummy data for Post
  const dummyPost = {
    userName: 'John Doe',
    userPic: 'https://via.placeholder.com/40', // Placeholder image for user
    content: 'This is a sample post content to demonstrate the Post component layout on the page.',
    media: '/post/sample-image.jpg', // Path to the image in the public folder
  };

  return (
    <div className="home-container">
      <div className="menu-logo-container">
        <MainLogo />
      </div>
      <div className="nav-bar-wrapper">
        <NavBar />
      </div>
      <div className="search-bar-wrapper">
        <SearchBar />
      </div>
      
      <div className="posts-section">
        <Post
          userName={dummyPost.userName}
          userPic={dummyPost.userPic}
          content={dummyPost.content}
          media={dummyPost.media}
        />
      </div>
    </div>
  );
};

export default Home;
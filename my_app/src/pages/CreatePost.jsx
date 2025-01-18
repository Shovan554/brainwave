import React, { useState } from 'react';
import '../styles/createPost.css';
import NavBar from '../components/NavBar';
import MainLogo from '../components/MainLogo';
import SearchBar from '../components/SearchBar';

const CreatePost = () => {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [caption, setCaption] = useState('');
  const [showPostButton, setShowPostButton] = useState(false);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;

      if (fileType.startsWith('image/')) {
        setMediaType('image');
      } else if (fileType.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType('unsupported');
      }

      setMedia(URL.createObjectURL(file));
    } else {
      setMedia(null);
      setMediaType('');
    }
  };

  const handleCaptionChange = (e) => {
    const newCaption = e.target.value;
    setCaption(newCaption);

    // Show Post button only if there is a caption and media
    if (newCaption.trim() && media) {
      setShowPostButton(true);
    } else {
      setShowPostButton(false);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaType('');
    setShowPostButton(false);
  };

  const handlePost = () => {
    if (!media || mediaType === 'unsupported') {
      alert('Please upload a valid image or video.');
      return;
    }

    console.log('Post submitted:', { media, mediaType, caption });
    alert('Post submitted successfully!');
    // Reset fields after posting
    setMedia(null);
    setMediaType('');
    setCaption('');
    setShowPostButton(false);
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
      <div className="create-post-container">
        {!media && (
          <div className="media-preview">
            <p>Add a media</p>
            <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
          </div>
        )}
        {media && (
          <div className="uploaded-media-preview">
            <button className="cross-button" onClick={removeMedia}>X</button>
            {mediaType === 'image' && <img src={media} alt="Uploaded media" />}
            {mediaType === 'video' && <video src={media} controls />}
          </div>
        )}
        <textarea
          className="caption-box"
          placeholder="Add a caption..."
          value={caption}
          onChange={handleCaptionChange}
        ></textarea>
        {showPostButton && (
          <button className="post-button slide-in" onClick={handlePost}>
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
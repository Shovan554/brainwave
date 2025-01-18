// src/components/Post.jsx
import React from 'react';
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import '../styles/post.css';

const Post = ({ userName, userPic, content, media }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <img src={userPic} alt={`${userName}'s profile`} className="post-user-pic" />
        <span className="post-user-name">{userName}</span>
      </div>
      {media && (
        <div className="post-media">
          {media.endsWith('.mp4') ? (
            <video src={media} controls className="post-media-content" />
          ) : (
            <img src={media} alt="Post media" className="post-media-content" />
          )}
        </div>
      )}
      <div className="post-content-box">
        
        <div className="post-content"><b>@{userName}</b>  {content}</div>
      </div>
      <div className="post-actions">
        <AiOutlineHeart className="post-icon" /> 
        <AiOutlineComment className="post-icon" /> 
        <AiOutlineShareAlt className="post-icon" /> 
      </div>
    </div>
  );
};

export default Post;
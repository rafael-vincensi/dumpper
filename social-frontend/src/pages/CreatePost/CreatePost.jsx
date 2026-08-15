import React, { useState } from 'react';
import './CreatePost.css';

export default function CreatePost({ onCancel, onSave }) {
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imagePosition, setImagePosition] = useState("center"); 
  
  const currentUser = {
    username: "juniormelansia",
    avatar: "https://loyolaphoenix.com/wp-content/uploads/2025/03/Courtesy-of-YZY.jpeg"
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!description && !imgUrl) return;

    const newPost = {
      id: Date.now(),
      avatar: currentUser.avatar,
      author: currentUser.username,
      description: description,
      tag: null,
      imgUrl: imgUrl || "https://i.pinimg.com/originals/05/b4/fb/05b4fbc3f169175e6deb97b3977175b6.jpg",
      imagePosition: imagePosition,
      likes: 0,
      time: "agora",
    };

    onSave(newPost);
  };

  return (
    <div className="create-post-layout">
      {/* Coluna Esquerda: Formulário */}
      <div className="create-form-section">
        <h2>new post</h2>

        <div className="create-form-group">
          <label>choose image (URL)</label>
          <input 
            type="text" 
            placeholder="Cole o link da imagem aqui..." 
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <div className="create-position-selector">
            <span>enquadramento:</span>
            <button type="button" onClick={() => setImagePosition("top")}>Topo</button>
            <button type="button" onClick={() => setImagePosition("center")}>Centro</button>
            <button type="button" onClick={() => setImagePosition("bottom")}>Baixo</button>
          </div>
        </div>

        <div className="create-form-group">
          <label>add description</label>
          <textarea 
            placeholder="your description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="create-form-actions">
          <button type="button" className="create-cancel-btn" onClick={onCancel}>cancel</button>
          <button type="button" className="create-publish-btn" onClick={handlePublish}>publish</button>
        </div>
      </div>

      {/* Coluna Direita: Preview em Tempo Real */}
      <div className="create-preview-section">
        <h3>preview</h3>
        <div className="create-post-card">
          <div className="create-post-header">
            <div className='create-post-profile'>
              <div className='create-post-avatar-wrapper'>
                <img src={currentUser.avatar} alt="Avatar" />
              </div>
              <span className="create-post-author">@{currentUser.username}</span>
              <p className='create-follow-profile'>follow</p>
            </div>
          </div>

          <div className='create-post-content'>
            <span className="create-post-author">@{currentUser.username}</span>
            <p className="create-post-text">{description}</p>
          </div>

          <div className='create-post-img'>
            <img 
              src={imgUrl || "https://i.pinimg.com/originals/05/b4/fb/05b4fbc3f169175e6deb97b3977175b6.jpg"} 
              alt="Preview" 
              style={{ objectPosition: imagePosition }}
            />
          </div>

          <div className="create-post-footer">
            <div className='create-like-container'>
              <span style={{ fontSize: '18px', marginRight: '4px' }}>❤️</span>
              <span>999</span>
            </div>
            <span className="create-post-time">1m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
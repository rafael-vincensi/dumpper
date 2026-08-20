import React, { useState } from 'react';
import './CreatePost.css';

export default function CreatePost({ onCancel, onSave }) {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // <-- Corrigido o nome da função
  const [imagePosition, setImagePosition] = useState("center"); 
  
  const currentUser = {
    username: "juniormelansia",
    avatar: "https://loyolaphoenix.com/wp-content/uploads/2025/03/Courtesy-of-YZY.jpeg"
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // <-- Usando a função correta
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!description && !imageUrl) return;

    // Enviando apenas o que o Back-end (PostModel) espera receber
    const newPost = {
      content: description,
      imageUrl: imageUrl
    };

    onSave(newPost);
  };

  return (
    <div className="create-post-layout">
      
      <div className="create-form-section">
        <h2>new post</h2>

        <div className="create-form-group">
          <label>choose image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
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
              src={imageUrl || "https://i.pinimg.com/originals/05/b4/fb/05b4fbc3f169175e6deb97b3977175b6.jpg"} 
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
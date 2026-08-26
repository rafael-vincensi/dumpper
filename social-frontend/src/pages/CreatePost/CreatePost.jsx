import React, { useState } from 'react';
import './CreatePost.css';
import defaultImage from '../../assets/default-image.jpg'
import previewImage from '../../assets/preview-image.jpg'
import likeFilled from '../../assets/liked-icon.svg';


export default function CreatePost({ onCancel, onSave }) {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePosition, setImagePosition] = useState("center"); 
  
  const usuarioLogadoString = localStorage.getItem("usuarioLogado");
  const usuarioLogado = usuarioLogadoString ? JSON.parse(usuarioLogadoString) : null;
  const usuarioLogadoId = usuarioLogado ? usuarioLogado.id : 1;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!description && !imageUrl) return;

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
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="create-position-selector">
            <span>enquadramento:</span>
            <button type="button" onClick={() => setImagePosition("top")}>Topo</button>
            <button type="button" onClick={() => setImagePosition("center")}>Centro</button>
            <button type="button" onClick={() => setImagePosition("bottom")}>Baixo</button>
          </div>
        </div>

        <div className="create-form-group">
          <label>add description</label>
          <textarea placeholder="your description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
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
                <img src={usuarioLogado?.profilePicture || defaultImage} alt="Avatar" />
              </div>
              <span className="create-post-author">@{usuarioLogado.username}</span>
              <p className='create-follow-profile'>follow</p>
            </div>
          </div>

          <div className='create-post-content'>
            <span className="create-post-author">@{usuarioLogado.username}</span>
            <p className="create-post-text">{description}</p>
          </div>

          <div className='create-post-img'>
            <img 
              src={imageUrl || previewImage} 
              alt="Preview" 
              style={{ objectPosition: imagePosition }}
            />
          </div>

          <div className="create-post-footer">
            <div className='create-like-container'>
              <img src={likeFilled} alt="Like" style={{ width: '18px', marginRight: '4px' }} />
                <span>999</span>
            </div>
            <span className="create-post-time">1m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
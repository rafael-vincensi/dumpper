import React, { useState } from 'react';
import './Sidebar.css';
import defaultImage from '../../assets/default-image.jpg';
import logo from '../../assets/logo.png'


export default function Sidebar({ user, onNavigateToEdit, onNavigateToProfile }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    window.location.reload();
  };

  return (
    <aside className="sidebar">
      
      <div className='sidebar-logo'>
        <a href="/">
        <img src={logo} height={50} />
        </a>
      </div>

      <nav className="menu-sidebar">
        <a href="/">home</a>
        <a href="/messages">messages</a>
        <a href="/notifications">notifications</a>
        <a href="/settings">settings</a>
      </nav>

      <div className="profile-sidebar">
        
        <div className="music-profile">
          {user?.isListening ? (
            <p>{user.currentSongTitle}</p>
          ) : (
            <p>nothing here</p>
          )}
        </div>

        <div className="profile-user" style={{ position: 'relative' }}>
          <div 
            onClick={onNavigateToProfile} 
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px', flex: 1 }}
          >
            <img 
              src={user?.profilePicture || defaultImage} 
              alt="Avatar" 
              className="user-avatar"
            />
            <span className="name-user">@{user?.username}</span>
          </div>
          
          <span 
            className="change-profile" 
            onClick={() => setShowMenu(!showMenu)} 
            style={{ cursor: 'pointer' }}
          >
            ...
          </span>

          {showMenu && (
            <div className="user-dropdown-menu">
              <button onClick={onNavigateToEdit} className="dropdown-item">
                edit profile
              </button>
              <button onClick={handleLogout} className="dropdown-item logout-text">
                logout
              </button>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}
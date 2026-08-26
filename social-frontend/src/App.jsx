import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Home from './pages/Feed/Feed';
import EditProfile from './pages/EditProfile/EditProfile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    return usuarioSalvo ? 'feed' : 'login';
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleNavigateToProfile = (userId) => {
    setSelectedUserId(userId);
    setCurrentScreen('profile');
  };

  return (
    <div>
      {currentScreen === 'login' && (
        <Login 
          onNavigateToRegister={() => setCurrentScreen('register')} 
          onLoginSuccess={() => setCurrentScreen('feed')} 
        />
      )}

      {currentScreen === 'register' && (
        <Register 
          onNavigateToLogin={() => setCurrentScreen('login')} 
        />
      )}

      {currentScreen === 'profile' && (
        <Profile 
          userId={selectedUserId} 
          onNavigateToProfile={handleNavigateToProfile} 
          onNavigateBack={() => setCurrentScreen('feed')}
          onNavigateToEdit={() => setCurrentScreen('editProfile')} 
        />
      )}

      {currentScreen === 'feed' && (
        <Home 
          onNavigateToProfile={handleNavigateToProfile} 
          onNavigateToEdit={() => setCurrentScreen('editProfile')} 
        />
      )}

      {currentScreen === 'editProfile' && (
        <EditProfile 
          onNavigateBack={() => setCurrentScreen('feed')} 
          onNavigateToProfile={handleNavigateToProfile}
        />
      )}
    </div>
  );
}
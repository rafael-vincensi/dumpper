import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Home from './pages/Feed/Feed';

function App() {
  const [currentScreen, setCurrentScreen] = useState('feed');
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
          onLoginSuccess={() => setCurrentScreen('profile')} 
        />
      )}

      {currentScreen === 'register' && (
        <Register 
          onNavigateToLogin={() => setCurrentScreen('login')} 
        />
      )}

      {currentScreen === 'profile' && (
        <Profile userId={selectedUserId} />
      )}

      {currentScreen === 'feed' && (
        <Home onNavigateToProfile={handleNavigateToProfile} />
      )}
    </div>
  );
}

export default App;
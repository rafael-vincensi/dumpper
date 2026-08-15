import React from 'react';
import './Login.css';

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="input-group">
          <input type="text" placeholder="email or @user..." className="login-input" />
        </div>

        <div className="input-group">
          <input type="password" placeholder="password..." className="login-input" />
        </div>

        <div className="login-links-center">
          {/* Clica aqui para ir para o cadastro */}
          <button onClick={onNavigateToRegister} className="link-text">
            dont have account?
          </button>
        </div>

        <div className="login-bottom-row">
          <button className="link-text">forgot password?</button>
          {/* Clica aqui para entrar e ir para o perfil/home */}
          <button onClick={onLoginSuccess} className="enter-btn">
            enter
          </button>
        </div>
      </div>
    </div>
  );
}
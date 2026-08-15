import React from 'react';
import './Register.css';

export default function Register({ onNavigateToLogin }) {
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="input-group">
          <input type="text" placeholder="@user..." className="register-input" />
          <span className="availability-text">@ Available: <span>yes</span></span>
        </div>

        <div className="input-group">
          <input type="email" placeholder="email..." className="register-input" />
        </div>

        <div className="input-group">
          <input type="password" placeholder="password..." className="register-input" />
        </div>

        <div className="register-bottom-row">
          {/* Clica em cancel para voltar para o login */}
          <button onClick={onNavigateToLogin} className="cancel-btn">
            cancel
          </button>
          <button className="register-btn">
            register
          </button>
        </div>
      </div>
    </div>
  );
}
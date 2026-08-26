import React, { useState } from 'react';
import { registerUser } from '../../services/api'; 
import './Register.css';

export default function Register({ onNavigateToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        name: name || username,
        username,
        email,
        password
      });

      alert("Conta criada com sucesso! Faça o login.");
      onNavigateToLogin();
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao criar conta.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-box">
        <div className="input-group">
          <input type="text" placeholder="@user..." className="register-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          <span className="availability-text">@ Available: <span>yes</span></span>
        </div>

        <div className="input-group">
          <input type="email" placeholder="email..." className="register-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="input-group">
          <input type="password" placeholder="password..." className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="register-bottom-row">
          <button type="button" onClick={onNavigateToLogin} className="cancel-btn">
            cancel
          </button>
          <button type="submit" className="register-btn">
            register
          </button>
        </div>
      </form>
      <div className='the-ceo'>
          <p>by Rafael Vincensi de Miranda</p>
        </div>
    </div>

    
  );
}
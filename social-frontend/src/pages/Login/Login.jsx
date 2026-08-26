import React, { useState } from 'react';
import { loginUser } from '../../services/api'; 
import './Login.css';

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usuario = await loginUser(email, password);
      if (usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        onLoginSuccess();
      } else {
        setErrorMessage("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <div className="input-group">
          <input type="text" placeholder="email..." className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <input type="password" placeholder="password..." className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {errorMessage && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{errorMessage}</p>}

        <div className="login-links-center">
          <button type="button" onClick={onNavigateToRegister} className="link-text">
            dont have account?
          </button>
        </div>

        <div className="login-bottom-row">
          <button type="button" className="link-text">forgot password?</button>
          <button type="submit" className="enter-btn">
            enter
          </button>
        </div>
      </form>

       <div className='the-ceo'>
          <p>by Rafael Vincensi de Miranda (juniormelansia)</p>
        </div>
    </div>
  );
}
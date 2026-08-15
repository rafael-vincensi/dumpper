import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import '../../components/Sidebar/Sidebar.css';
import './Profile.css';

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se não vier um ID (por segurança), usa o ID 1 provisoriamente
    const idParaBuscar = userId || 1;

    setLoading(true);
    fetch(`http://localhost:8080/users/${idParaBuscar}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar perfil:", err);
        setLoading(false);
      });
  }, [userId]); // Roda toda vez que o userId mudar

  if (loading) return <div className="loading">Carregando perfil...</div>;
  if (!user) return <div className="error">Usuário não encontrado.</div>;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="profile-content">
        {/* Restante do seu HTML do Profile que já estava pronto, 
            mas trocando user.name, user.bio, user.followers reais do banco! */}
        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar-column">
              <img
                src={user.profilePicture || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="profile-avatar"
              />
              <p className="current-song-text">{user.currentSongTitle || "nada no momento."}</p>
            </div>

            <div className="profile-info">
              <h1>{user.name}</h1>
              <p className="username">@{user.username}</p>
              <p className="user-bio">{user.bio}</p>
            </div>

            <div className='follows-info'>
              <p className='follow-user'>follow</p>
              <p className='followers'>followers {user.followers || 0}</p>
              <p className='following'>following {user.following || 0}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
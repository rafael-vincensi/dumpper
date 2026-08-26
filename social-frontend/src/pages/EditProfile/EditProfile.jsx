import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getUserById, updateUser } from '../../services/api';
import './EditProfile.css';
import defaultImage from '../../assets/default-image.jpg';

export default function EditProfile({ onNavigateBack, onNavigateToProfile }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const usuarioLogadoString = localStorage.getItem("usuarioLogado");
  const usuarioLogado = usuarioLogadoString ? JSON.parse(usuarioLogadoString) : null;
  const userId = usuarioLogado ? usuarioLogado.id : null;

  useEffect(() => {
    if (!userId) {
      if (onNavigateBack) onNavigateBack();
      return;
    }

    setLoading(true);
    getUserById(userId)
      .then(data => {
        setName(data.name || '');
        setUsername(data.username || '');
        setBio(data.bio || '');
        setProfilePicture(data.profilePicture || '');
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar dados para edição:", err);
        alert("Erro ao carregar dados do perfil.");
        setLoading(false);
      });
  }, [userId, onNavigateBack]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    const updatedUserData = { name, bio, profilePicture };

    try {
      const userSalvo = await updateUser(userId, updatedUserData);
      localStorage.setItem("usuarioLogado", JSON.stringify(userSalvo));
      
      alert("Perfil atualizado com sucesso!");
      if (onNavigateBack) onNavigateBack();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      const errorMsg = error.response?.data?.message || error.message || "Erro desconhecido";
      alert(`Erro ao atualizar perfil: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-screen">Carregando...</div>;

  return (
    <div className="app-layout">
      <Sidebar user={usuarioLogado} onNavigateToProfile={onNavigateToProfile} /> 
      
      <main className="edit-profile-content">
        <div className="edit-profile-container">
        
          <div className="edit-avatar-section">
            <img src={profilePicture || defaultImage} alt="Avatar" className="edit-avatar-large" />
            <label className="select-image-btn" style={{ cursor: 'pointer' }}>
                select image
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>

          <form onSubmit={handleSave} className="edit-profile-form">
            
            <div className="form-group-edit">
                <label>name</label>
                <input type="text" className="edit-input-field" value={name} onChange={(e) => setName(e.target.value)} required placeholder="your name here..." />
                <span className="current-value-hint">current name: {usuarioLogado?.name}</span>
            </div>

            <div className="form-group-edit">
                <label>bio</label>
                <textarea className="edit-textarea-field" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="about you..." />
                <span className="current-value-hint">current bio: {usuarioLogado?.bio || "nada no momento"}</span>
            </div>

            <div className="edit-form-actions">
              <button type="button" className="cancel-edit-btn" onClick={onNavigateBack} > cancel </button>
              <button type="submit" className="save-edit-btn" disabled={saving} > {saving ? "saving..." : "save"} </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}
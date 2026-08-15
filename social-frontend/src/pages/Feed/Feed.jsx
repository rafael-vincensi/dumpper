import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CreatePost from '../CreatePost/CreatePost';
import { getPosts, likePost } from '../../services/api';
import './Feed.css';

export default function Feed({ onNavigateToProfile }) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postsList, setPostsList] = useState([]);
  
  const usuarioLogadoId = 1;

  useEffect(() => {
    carregarPostsDoBackend();
  }, []);

  async function carregarPostsDoBackend() {
    try {
      const dados = await getPosts();
      setPostsList(dados);
    } catch (error) {
      console.error("Erro ao carregar posts do back-end:", error);
    }
  }

  async function handleCurtir(postId) {
    try {
      const postAtualizado = await likePost(postId);
      setPostsList(postsList.map(p => p.id === postId ? postAtualizado : p));
    } catch (error) {
      console.error("Erro ao curtir post:", error);
    }
  }

  const handleSaveNewPost = (newPost) => {
    setPostsList([newPost, ...postsList]);
    setIsCreatingPost(false);
  };
  
  const friendList = [
    // ... seus amigos continuam aqui igualzinho ...
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      {isCreatingPost ? (
        <CreatePost 
          onCancel={() => setIsCreatingPost(false)} 
          onSave={handleSaveNewPost} 
          userId={usuarioLogadoId}
        />
      ) : (
        <main className="feed-content">
          <div className="feed-container">
            {postsList.map((post) => (
              <div className="feed-post-card" key={post.id}>
                
                {/* Cabeçalho do Post (Avatar, Nome, Botão de Seguir e Opções) */}
                <div className="post-header">
                  <div className='post-profile'>
                    
                    <div 
                      className='post-avatar-wrapper'
                      onClick={() => post.user && onNavigateToProfile(post.user.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        className='img-user' 
                        src={post.user?.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Avatar" 
                      />
                    </div>

                    <span
                      className="post-author"
                      onClick={() => post.user && onNavigateToProfile(post.user.id)}
                      style={{ cursor: "pointer" }}
                    >
                      @{post.user?.username || "usuario"}
                    </span>

                    <p className='follow-profile'>follow</p>
                    <p className='options-post'>...</p>
                  </div>
                </div>
                
                {/* Conteúdo do Post (Texto) */}
                <div className='post-content'>
                  <p className="post-text">{post.content}</p>
                </div>

                {/* Mídia do Post (Imagem, se houver) */}
                {post.imageUrl && (
                  <div className='post-media'>
                    <img 
                      src={post.imageUrl} 
                      alt="Post media" 
                      style={{ objectPosition: 'center' }} 
                    />
                  </div>
                )}

                {/* Rodapé do Post (Curtidas e Tempo) */}
                <div className="post-footer">
                  <div className='like-container' onClick={() => handleCurtir(post.id)} style={{ cursor: 'pointer' }}>
                    <span style={{ fontSize: '18px', marginRight: '4px' }}>💙</span>
                    <span>{post.likesCount}</span>
                  </div>
                  <span className="post-time">Recent</span>
                </div>

              </div>
            ))}
          </div>

          {/* Barra de Pesquisa e Botão de Criar Post */}
          <div className='search-bar'>
            <button className="add-post-btn" onClick={() => setIsCreatingPost(true)}>+</button>
            <div className="search-box">
              <span className="search-symbol">@</span>
              <input type="text" className="search-input" />
            </div>
          </div>

          {/* Caixa de Amigos */}
          <div className="friends-box">
            <p>@friends</p>
            {friendList.map((item, index) => (
              <div className='friends-container' key={index}>
                <div className="friend-img">
                  <img src={item.avatar} alt="Friend Avatar" />
                </div>
                <div className="friend-content">
                  <p className='friend-username'>@{item.friend}</p>
                  <div className='friendlist-music'>
                    <p>{item.friendlistening} - {item.friendlisteningAlbum}</p>
                    <p>{item.friendlisteningArtist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
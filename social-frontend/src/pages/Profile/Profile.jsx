import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getPosts, likePost, checkUserLike, followUser, unfollowUser, checkIsFollowing } from '../../services/api';
import '../../components/Sidebar/Sidebar.css';
import './Profile.css';
import defaultImage from '../../assets/default-image.jpg';
import likeEmpty from '../../assets/like-icon.svg';
import likeFilled from '../../assets/liked-icon.svg';

export default function Profile({ userId, onNavigateToProfile, onNavigateToEdit }) {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null);

  const usuarioLogadoString = localStorage.getItem("usuarioLogado");
  const usuarioLogado = usuarioLogadoString ? JSON.parse(usuarioLogadoString) : null;
  const usuarioLogadoId = usuarioLogado ? usuarioLogado.id : 1;

  const [likedPosts, setLikedPosts] = useState({});

  const safeUserId = (typeof userId === 'object' || !userId) ? usuarioLogado?.id : userId;
  const idParaBuscar = safeUserId || 1;
  const isOwnProfile = Number(idParaBuscar) === Number(usuarioLogadoId);

  async function handleCurtir(postId) {
    try {
      const postAtualizado = await likePost(postId, usuarioLogadoId);
      setUserPosts(userPosts.map(p => p.id === postId ? postAtualizado : p));
      
      const jaCurtiu = await checkUserLike(usuarioLogadoId, postId);
      setLikedPosts(prev => ({
        ...prev,
        [postId]: jaCurtiu
      }));
    } catch (error) {
      console.error("Erro ao curtir post no perfil:", error);
    }
  }

 async function handleToggleFollow() {
    try {
      if (isFollowing) {
        await unfollowUser(usuarioLogadoId, idParaBuscar);
        setIsFollowing(false);
        
        setUser(prevUser => ({
          ...prevUser,
          followers: Math.max(0, (prevUser.followers || 0) - 1)
        }));
      } else {
        await followUser(usuarioLogadoId, idParaBuscar);
        setIsFollowing(true);
        
        setUser(prevUser => ({
          ...prevUser,
          followers: (prevUser.followers || 0) + 1
        }));
      }
    } catch (error) {
      console.error("Erro ao alterar status de follow no perfil:", error);
    }
  }

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:8080/users/${idParaBuscar}`).then(res => res.json()),
      getPosts().catch(() => []),
      !isOwnProfile ? checkIsFollowing(usuarioLogadoId, idParaBuscar).catch(() => false) : Promise.resolve(false)
    ])
      .then(async ([userData, allPosts, followStatus]) => {
        setUser(userData);
        setIsFollowing(followStatus);
        
        const postsDoUser = allPosts.filter(p => p.user && p.user.id === Number(idParaBuscar));
        setUserPosts(postsDoUser);

        const likesStatus = {};
        for (const post of postsDoUser) {
          const jaCurtiu = await checkUserLike(usuarioLogadoId, post.id);
          likesStatus[post.id] = jaCurtiu;
        }
        setLikedPosts(likesStatus);

        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar perfil:", err);
        setLoading(false);
      });
  }, [idParaBuscar, usuarioLogadoId, isOwnProfile]);

  useEffect(() => {
    if (selectedPostId) {
      const element = document.getElementById(`feed-post-${selectedPostId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [selectedPostId]);

  if (loading) return <div className="loading">loading profile...</div>;
  if (!user) return <div className="error">user not found.</div>;

  return (
    <div className="app-layout">
      <Sidebar 
        user={usuarioLogado} 
        onNavigateToProfile={onNavigateToProfile} 
        onNavigateToEdit={onNavigateToEdit} 
      />
      
      <main className="profile-content">
        <div className="profile-container">
          
          <div className="profile-header">
            <div className="avatar-column">
              <img src={user.profilePicture || defaultImage} alt="Foto de perfil" className="profile-avatar" />
              <p className="current-song-text">{user.currentSongTitle || "nothing here"}</p>
            </div>

            <div className="profile-info">
              <h1>{user.name}</h1>
              <p className="username">@{user.username}</p>
              <p className="user-bio">{user.bio}</p>
            </div>

            <div className='follows-info'>
              {!isOwnProfile && (
                <p className={`follow-user ${isFollowing ? 'is-following' : ''}`} onClick={handleToggleFollow} >
                  {isFollowing ? "following" : "follow"}
                </p>
              )}
              <p className='followers'>followers {user.followers || 0}</p>
              <p className='following'>following {user.following || 0}</p>
            </div>
          </div>

          {!selectedPostId ? (
            
            <div className="posts-grid-section">
              <div className="posts-grid">
                {userPosts.map((post) => (
                  <div className="post-card" key={post.id} onClick={() => setSelectedPostId(post.id)} style={{ cursor: 'pointer' }}>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt="Post media" />
                    ) : (
                      <div style={{ padding: '15px', fontSize: '13px', color: '#0511F2', height: '100%', overflow: 'hidden' }}>
                        {post.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          ) : (

            <div className="profile-detailed-feed">
              <button 
                onClick={() => setSelectedPostId(null)} className="back-to-grid-btn" > back to grid
              </button>

              <div className="feed-container">
                {userPosts.map((post) => (
                  <div className="feed-post-card" key={post.id} id={`feed-post-${post.id}`}>
                    
                    <div className="post-header">
                      <div className='post-profile'>
                        <div className='post-avatar-wrapper'>
                          <img className='img-user' src={user.profilePicture || defaultImage} alt="Avatar" />
                        </div>
                        <span className="post-author">@{user.username}</span>
                      </div>
                    </div>
                    
                    <div className='post-content'>
                      <p className="post-text"><span className='name-user-post'>@{user.username}</span> {post.content}</p>
                    </div>
                    {post.imageUrl && (
                      <div className='post-media'>
                        <img src={post.imageUrl} alt="Post media" style={{ objectPosition: 'center' }} />
                      </div>
                    )}
                    <div className="post-footer">
                      <div className='like-container' onClick={() => handleCurtir(post.id)} style={{ cursor: 'pointer' }}>
                        <img src={likedPosts[post.id] ? likeFilled : likeEmpty} alt="Like" style={{ width: '20px', height: '20px', marginRight: '4px' }} />
                      <span>{post.likesCount || 0}</span>
                    </div>  
                    <span className="post-time">Post</span>
                  </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
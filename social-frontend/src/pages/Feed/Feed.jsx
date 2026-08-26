import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CreatePost from '../CreatePost/CreatePost';
import { getPosts, likePost, createPost, getFriends, checkUserLike, followUser, unfollowUser } from '../../services/api';
import './Feed.css';
import defaultImage from '../../assets/default-image.jpg';
import likeEmpty from '../../assets/like-icon.svg';
import likeFilled from '../../assets/liked-icon.svg';


export default function Feed({ onNavigateToProfile, onNavigateToEdit }) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postsList, setPostsList] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [followingStatus, setFollowingStatus] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

  const usuarioLogadoString = localStorage.getItem("usuarioLogado");
  const usuarioLogado = usuarioLogadoString ? JSON.parse(usuarioLogadoString) : null;
  const usuarioLogadoId = usuarioLogado ? usuarioLogado.id : 1;

  useEffect(() => {
    carregarPostsDoBackend();
    carregarAmigosDoBackend();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetch(`http://localhost:8080/users/search?query=${searchTerm}`)
        .then(res => res.json())
        .then(data => setSearchResults(data))
        .catch(err => console.error("Erro ao buscar usuários:", err));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  async function carregarPostsDoBackend() {
    try {
      const dados = await getPosts();
      setPostsList(dados);

      const likesStatus = {};
      const followStatusMap = {};

      for (const post of dados) {
        const jaCurtiu = await checkUserLike(usuarioLogadoId, post.id);
        likesStatus[post.id] = jaCurtiu;

        if (post.user && post.user.id !== usuarioLogadoId) {
          try {
            const response = await fetch(`http://localhost:8080/follow/check?followerId=${usuarioLogadoId}&followingId=${post.user.id}`);
            const estaSeguindo = await response.json();
            followStatusMap[post.user.id] = estaSeguindo;
          } catch (e) {
            followStatusMap[post.user.id] = false;
          }
        }
      }

      setLikedPosts(likesStatus);
      setFollowingStatus(followStatusMap);

    } catch (error) {
      console.error("Erro ao carregar posts do back-end:", error);
    }
  }

  async function carregarAmigosDoBackend() {
    try {
      const amigos = await getFriends(usuarioLogadoId);
      setFriendList(amigos);
    } catch (error) {
      console.error("Erro ao carregar amigos:", error);
    }
  }

  async function handleToggleFollow(targetUserId) {
    try {
      const jaSegue = followingStatus[targetUserId];

      if (jaSegue) {
        await unfollowUser(usuarioLogadoId, targetUserId);
      } else {
        await followUser(usuarioLogadoId, targetUserId);
      }

      setFollowingStatus(prev => ({
        ...prev,
        [targetUserId]: !jaSegue
      }));

      carregarAmigosDoBackend();

    } catch (error) {
      console.error("Erro ao alterar status de follow:", error);
    }
  }

  async function handleCurtir(postId) {
    try {
      const postAtualizado = await likePost(postId, usuarioLogadoId);

      setPostsList(postsList.map(p => p.id === postId ? postAtualizado : p));
      setLikedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));

    } catch (error) {
      console.error("Erro ao curtir post:", error);
    }
  }

  const handleSaveNewPost = async (newPostData) => {
    try {
      const postSalvoNoBanco = await createPost(
        newPostData.content,
        newPostData.imageUrl,
        usuarioLogadoId
      );

      setPostsList([postSalvoNoBanco, ...postsList]);
      setIsCreatingPost(false);
    } catch (error) {
      console.error("Erro ao criar post no back-end:", error);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        user={usuarioLogado}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToEdit={onNavigateToEdit}
      />

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

                <div className="post-header">
                  <div className='post-profile'>

                    <div className='post-avatar-wrapper' onClick={() => post.user && onNavigateToProfile(post.user.id)} style={{ cursor: 'pointer' }} >
                      <img className='img-user' src={post.user?.profilePicture || defaultImage} alt="Avatar" />
                    </div>

                    <span className="post-author" onClick={() => post.user && onNavigateToProfile(post.user.id)} style={{ cursor: "pointer" }} >
                      @{post.user?.username || "user"}
                    </span>

                    {post.user && post.user.id !== usuarioLogadoId && (
                      <p className={`follow-profile ${followingStatus[post.user.id] ? 'is-following' : ''}`} onClick={() => handleToggleFollow(post.user.id)} style={{ cursor: 'pointer' }} >
                        {followingStatus[post.user.id] ? "following" : "follow"}
                      </p>
                    )}
                    <p className='options-post'>...</p>
                  </div>
                </div>

                <div className='post-content'>
                  <p className="post-text"><span className='name-user-post'>@{post.user?.username}</span> {post.content}</p>
                </div>

                {post.imageUrl && (
                  <div className='post-media'>
                    <img src={post.imageUrl} alt="Post media" style={{ objectPosition: 'center' }} />
                  </div>
                )}

                <div className="post-footer">
                  <div className='like-container' onClick={() => handleCurtir(post.id)} style={{ cursor: 'pointer' }}>
                    <img src={likedPosts[post.id] ? likeFilled : likeEmpty} alt="Like" style={{ width: '20px', height: '20px', marginRight: '4px' }} />
                    <span>{post.likesCount}</span>
                  </div>
                  <span className="post-time">Recent</span>
                </div>

              </div>
            ))}
          </div>

          <div className='search-bar'>
            <button className="add-post-btn" onClick={() => setIsCreatingPost(true)}>+</button>
            <div className="search-box">
              <span className="search-symbol">@</span>
              <input type="text" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="search..." />
            </div>

            {searchResults.length > 0 && (
              <div className="search-dropdown-results">
                {searchResults.map(user => (
                  <div key={user.id} className="search-result-item" onClick={() => {
                    onNavigateToProfile(user.id); setSearchTerm(''); setSearchResults([]);
                  }}>
                    <img src={user.profilePicture || defaultImage} alt="" className="search-result-avatar" />
                    <div>
                      <p className="search-result-name">{user.name}</p>
                      <p className="search-result-username">@{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="friends-box">
            <p className="friends-title">@friends</p>

            <div className="friends-list-scroll">
              {friendList.map((friend) => (
                <div className='friends-container' key={friend.id} onClick={() => onNavigateToProfile(friend.id)} style={{ cursor: 'pointer' }}>
                  <div className="friend-img">
                    <img src={friend.profilePicture || defaultImage} alt="Friend Avatar" />
                  </div>
                  <div className="friend-content">
                    <p className='friend-username'>@{friend.username}</p>
                    <div className='friendlist-music'>
                      <p>{friend.currentSongTitle || "nothing here"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
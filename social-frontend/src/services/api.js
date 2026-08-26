const API_URL = "http://localhost:8080";

export async function getPosts() {
  const response = await fetch(`${API_URL}/post`);
  if (!response.ok) throw new Error("Erro ao buscar posts");
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) return null;
  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Erro ao registrar usuário");
  return response.json();
}

export async function createPost(content, imageUrl, userId) {
  const response = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      imageUrl,
      user: { id: userId }
    }),
  });
  if (!response.ok) throw new Error("Erro ao criar post");
  return response.json();
}

export async function likePost(postId, userId) {
  const response = await fetch(`${API_URL}/likes/${userId}/${postId}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Erro ao curtir post");
  return response.json();
}

export async function getFriends(userId) {
  const response = await fetch(`${API_URL}/follow/${userId}/friends`);
  if (!response.ok) throw new Error("Erro ao buscar amigos");
  return response.json();
}

export async function getPostsByUser(userId) {
  const posts = await getPosts(); 
  return posts.filter(post => post.user && post.user.id === Number(userId)); 
}

export async function updateUser(userId, userData) {
  const response = await fetch(`${API_URL}/users/${userId}`, { 
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "Erro ao atualizar usuário");
  }
  
  return response.json(); 
}

export async function getUserById(userId) {
  const response = await fetch(`${API_URL}/users/${userId}`);
  if (!response.ok) throw new Error("Erro ao buscar usuário");
  return response.json();
}

export const searchUsers = async (query) => {
  if (!query.trim()) return [];
  const response = await fetch(`${API_URL}/users/search?query=${query}`);
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
};

export async function checkUserLike(userId, postId) {
  const response = await fetch(`${API_URL}/likes/check/${userId}/${postId}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro na rota /likes/check/${userId}/${postId}:`, errorText);
    throw new Error("Erro ao verificar curtida");
  }
  return response.json();
}

export async function followUser(followerId, followingId) {
  const response = await fetch(`${API_URL}/follow?followerId=${followerId}&followingId=${followingId}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Erro ao seguir usuário");
}

export async function unfollowUser(followerId, followingId) {
  const response = await fetch(`${API_URL}/follow?followerId=${followerId}&followingId=${followingId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deixar de seguir usuário");
}

export async function checkIsFollowing(followerId, followingId) {
  const response = await fetch(`${API_URL}/follow/check?followerId=${followerId}&followingId=${followingId}`);
  if (!response.ok) throw new Error("Erro ao verificar status de seguidor");
  return response.json();
}

export async function getFollowers(userId) {
  const response = await fetch(`${API_URL}/follow/followers/${userId}`);
  if (!response.ok) throw new Error("Erro ao buscar seguidores");
  return response.json();
}

export async function getFollowing(userId) {
  const response = await fetch(`${API_URL}/follow/following/${userId}`);
  if (!response.ok) throw new Error("Erro ao buscar quem você segue");
  return response.json();
}
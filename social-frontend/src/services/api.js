const API_URL = "http://localhost:8080";

export async function getPosts() {
  const response = await fetch(`${API_URL}/post`);
  if (!response.ok) throw new Error("Erro ao buscar posts");
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

export async function likePost(postId) {
  const response = await fetch(`${API_URL}/post/${postId}/like`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Erro ao curtir post");
  return response.json();
}
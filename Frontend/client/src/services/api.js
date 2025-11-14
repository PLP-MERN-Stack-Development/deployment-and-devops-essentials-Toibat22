import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const postService = {
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const response = await api.get(url);
    return response.data;
  },

  getPost: async (idOrSlug) => {
    const response = await api.get(`/posts/${idOrSlug}`);
    return response.data;
  },

  createPost: async (formData) => {
    const response = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updatePost: async (id, formData) => {
    const response = await api.put(`/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  addComment: async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },

  searchPosts: async (query) => {
    const response = await api.get(`/posts/search?q=${query}`);
    return response.data;
  },

  getMyPosts: async () => {
    const response = await api.get("/posts/my-posts");
    return response.data;
  },
};

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post("/categories", categoryData);
    return response.data;
  },
};

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);
    }
    return response.data;
  },

  logout: () => localStorage.clear(),

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default api;

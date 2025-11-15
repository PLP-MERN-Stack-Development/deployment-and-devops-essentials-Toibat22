import axios from "axios";

// Use environment variable for API URL; fallback to localhost for dev
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors globally
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

// POSTS API
export const postService = {
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const res = await api.get(url);
    return res.data;
  },

  getPost: async (idOrSlug) => {
    const res = await api.get(`/posts/${idOrSlug}`);
    return res.data;
  },

  createPost: async (formData) => {
    const res = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updatePost: async (id, formData) => {
    const res = await api.put(`/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deletePost: async (id) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },

  addComment: async (postId, commentData) => {
    const res = await api.post(`/posts/${postId}/comments`, commentData);
    return res.data;
  },

  searchPosts: async (query) => {
    const res = await api.get(`/posts/search?q=${query}`);
    return res.data;
  },

  getMyPosts: async () => {
    const res = await api.get("/posts/my-posts");
    return res.data;
  },
};

// CATEGORIES API
export const categoryService = {
  getAllCategories: async () => {
    const res = await api.get("/categories");
    return res.data;
  },

  createCategory: async (categoryData) => {
    const res = await api.post("/categories", categoryData);
    return res.data;
  },
};

// AUTH API
export const authService = {
  register: async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);

    if (res.data?.token && res.data?.user) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem(
        "userId",
        res.data.user.id || res.data.user._id || ""
      );
    }

    return res.data;
  },

  logout: () => localStorage.clear(),

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default api;

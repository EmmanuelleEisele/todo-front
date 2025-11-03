import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Client séparé pour les requêtes de refresh (sans interceptor pour éviter les boucles infinies)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter automatiquement le token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const is401 = error.response?.status === 401;
    const alreadyRetried = !!error.config._retry;
    if (!is401 || alreadyRetried) {
      return Promise.reject(error);
    }

    error.config._retry = true;
    try {
      // Utilise refreshClient pour éviter les boucles d'intercepteur
      const refreshResponse = await refreshClient.post("/auth/refresh", {}, { withCredentials: true });
      const newToken = refreshResponse.data.token || refreshResponse.data.accessToken;
      localStorage.setItem("authToken", newToken);
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient.request(error.config);
    } catch {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
);

export default apiClient;
export interface Task {
  _id: string; // MongoDB _id
  id?: string; // Fallback pour compatibilité
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  period: "day" | "week" | "month" | "year";
  status: "todo" | "done" | "cancelled" | "overdue" | "archived";
  isDone: boolean;
  isArchived: boolean;
  categoryId: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateTask {
  title: string;
  description?: string;
  status: "todo" | "done" | "cancelled" | "overdue" | "archived";
  deadline?: string;
}
export interface UpdateTask {
  title?: string;
  description?: string;
  status?: "todo" | "done" | "cancelled" | "overdue" | "archived";
  deadline?: string;
}
export interface DeleteTask {
  id: number;
}
export interface User {
  id: string; // MongoDB _id est un string
  pseudo?: string; // Optionnel car l'API ne le retourne pas toujours
  email: string;
}
export interface RegisterRequest {
  pseudo: string;
  email: string;
  password: string;
}
export interface RegisterForm {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
  refreshToken?: string; // Présent uniquement dans login
}
export interface Category {
  _id: string;
  name: "work" | "personal" | "shopping" | "health" | "finance" | "others";
}
// Intercepteur pour ajouter automatiquement le token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

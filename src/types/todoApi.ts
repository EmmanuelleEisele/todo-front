import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://todo-api-2ij6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter automatiquement le token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const refreshResponse = await apiClient.post('/auth/refresh', { refreshToken });
          const newToken = refreshResponse.data.token;
          localStorage.setItem('authToken', newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          // Rejoue la requête initiale avec le nouveau token
          return apiClient.request(error.config);
        } catch {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('currentUser');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export interface Task {
  id: string;  // MongoDB _id
  title: string;
  description?: string;
  status: "en cours" | "validé" | "annulé" | "en retard";
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateTask {
  title: string;
  description?: string;
  status: "en cours" | "validé" | "annulé" | "en retard";
  deadline?: string;
}
export interface UpdateTask {
  title?: string;
  description?: string;
  status?: "en cours" | "validé" | "annulé" | "en retard";
  deadline?: string;
}
export interface DeleteTask {
  id: number;
}
export interface User {
  id: string;  // MongoDB _id est un string
  pseudo?: string;  // Optionnel car l'API ne le retourne pas toujours
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

// Intercepteur pour ajouter automatiquement le token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
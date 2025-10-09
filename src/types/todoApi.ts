import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://todo-api-2ij6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

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
  firstname: string;
  lastname: string;
  email: string;
}
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface RegisterForm {
  firstname: string;
  lastname: string;
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

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
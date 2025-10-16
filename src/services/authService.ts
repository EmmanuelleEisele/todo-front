import apiClient from '../types/todoApi';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/todoApi.ts';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', credentials);
  // Auto-stocker après login réussi
  authService.setToken(response.data.token);
  authService.setUser(response.data.user);
  return response.data;
},

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    // Auto-stocker après l'inscription réussie
    authService.setToken(response.data.token);
    authService.setUser(response.data.user);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    return apiClient.post('/auth/logout');
  },

    // Récupérer le token
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

    // Stocker le token
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

    // Supprimer le token
   removeToken: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },
  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
  },
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },
  removeRefreshToken: () => {
    localStorage.removeItem('refreshToken');
  },
    // Vérifier si l'utilisateur est authentifié
   isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token; // Convertit en boolean
  },

    // Stocker les infos utilisateur
  setUser: (user: User) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

    // Récupérer l'utilisateur actuel
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
};
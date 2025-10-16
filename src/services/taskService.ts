import apiClient, { type CreateTask, type Task, type UpdateTask } from "../types/todoApi";

// Type pour les réponses de l'API qui ont le format { message: string, data: ... }
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    // L'API retourne { message: "...", data: [...] }
    return response.data.data;
  },
  
  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data;
  },
  
  createTask: async (taskData: CreateTask): Promise<Task> => {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', taskData);
    return response.data.data;
  },

  updateTask: async (id: string, taskData: UpdateTask): Promise<Task> => {
    const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, taskData);
    return response.data.data;
  },
  
  deleteTask: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/tasks/${id}`);
    return response.data;
  }, 
};
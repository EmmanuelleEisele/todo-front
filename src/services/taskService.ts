import apiClient, { type CreateTask, type Task, type UpdateTask } from "../types/todoApi";

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },
  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },
  createTask: async (taskData: CreateTask): Promise<Task> => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string, taskData: UpdateTask): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },
  deleteTask: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  }, 
};
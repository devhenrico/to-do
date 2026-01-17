import api from "./api";

export interface Task {
  id: number;
  title: string;
  description?: string;
  totalPomodori: number;
  pomodoroValue: number;
  completedPomodori: number;
  status?: string;
  taskDate?: string;
  dueDate?: string;
  assignedAt?: string;
  completedAt?: string;
  createdAt?: string;
}

export interface TaskResponse {
  success: boolean;
  message?: string;
  data: Task | Task[];
  errors?: string[];
}

export interface CreateTaskData {
  title: string;
  description?: string;
  totalPomodori: number;
  pomodoroValue: number;
  completedPomodori?: number;
  status?: string;
  taskDate?: string;
  dueDate?: string;
}

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<TaskResponse>("/tasks");
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  getById: async (id: number): Promise<Task> => {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data.data as Task;
  },

  create: async (data: CreateTaskData): Promise<TaskResponse> => {
    const response = await api.post<TaskResponse>("/tasks", data);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<CreateTaskData>,
  ): Promise<TaskResponse> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
  },

  patch: async (
    id: number,
    data: Partial<CreateTaskData>,
  ): Promise<TaskResponse> => {
    const response = await api.patch<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

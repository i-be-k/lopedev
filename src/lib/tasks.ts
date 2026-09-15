import { fetchWithAuth } from './api';
import { Task } from '@/types';

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

export const TaskApiClient = {
  /**
   * Hits the dynamic task controller to return roadmap tracks matching user's tier
   */
  async getTimelineTasks(): Promise<ApiResponse<Task[]>> {
    return fetchWithAuth('/tasks/timeline', {
      method: 'GET',
    });
  },

  /**
   * Pings the server to toggle the task status state indicator cleanly to 'in_progress'
   */
  async startTask(taskId: string): Promise<ApiResponse<any>> {
    return fetchWithAuth('/tasks/start', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  }
};

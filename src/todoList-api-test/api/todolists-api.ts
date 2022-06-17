import axios from 'axios';

const mainAPI = 'https://social-network.samuraijs.com/api/1.1/todo-lists';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '73298759-1bcc-4e14-8998-d86b90add1ac',
  },
};

export const todoListsAPI = {
  getTodolists() {
    return axios.get(`${mainAPI}`, settings);
  },
  postTodoList(payload: { title: string | null }) {
    return axios.post(`${mainAPI}`, payload, settings);
  },
  deleteTodoList(todoListId: string) {
    return axios.delete(`${mainAPI}/${todoListId}`, settings);
  },
  updateTodoList(todoListId: string, payload: { title: string | null }) {
    return axios.put(`${mainAPI}/${todoListId}`, payload, settings);
  },
  getTasks(todoListId: string) {
    return axios.get(`${mainAPI}/${todoListId}/tasks`, settings);
  },
  postTask(todoListId: string, payload: { title: string | null }) {
    return axios.post(`${mainAPI}/${todoListId}/tasks`, payload, settings);
  },
  deleteTask(todoListId: string, taskId: string) {
    return axios.delete(`${mainAPI}/${todoListId}/tasks/${taskId}`, settings);
  },
  updateTask(todoListId: string, taskId: string, payload: { title: string | null }) {
    return axios.put(`${mainAPI}/${todoListId}/tasks/${taskId}`, payload, settings);
  },
};

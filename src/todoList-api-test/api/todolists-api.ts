import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '73298759-1bcc-4e14-8998-d86b90add1ac',
  },
};

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

export const todoListsAPI = {
  getTodolists() {
    return instance.get('todo-lists')
  },
  postTodoList(payload: { title: string | null }) {
    return instance.post('todo-lists', payload)
  },
  deleteTodoList(todoListId: string) {
    return instance.delete(`todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, payload: { title: string | null }) {
    return instance.put(`todo-lists/${todoListId}`, payload)
  },
  getTasks(todoListId: string) {
    return instance.get(`todo-lists/${todoListId}/tasks`)
  },
  postTask(todoListId: string, payload: { title: string | null }) {
    return instance.post(`todo-lists//${todoListId}/tasks`, payload)
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete(`todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, payload: { title: string | null }) {
    return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, payload)
  },
};
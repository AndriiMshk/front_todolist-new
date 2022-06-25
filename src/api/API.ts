import axios from 'axios';
import { TasksType, TaskTypeAPI, TaskTypeStatus } from './TypesAPI';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'abb3a345-b7d8-4f0f-8c61-af2582f7869f',
  },
};

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

export const todoListsApi = {
  getTodolists() {
    return instance.get('todo-lists')
  },
  postTodoList(payload: { title: string}) {
    return instance.post('todo-lists', payload)
  },
  deleteTodoList(todoListId: string) {
    return instance.delete(`todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, payload: { title: string}) {
    return instance.put(`todo-lists/${todoListId}`, payload)
  },
  getTasks(todoListId: string) {
    return instance.get(`todo-lists/${todoListId}/tasks`)
  },
  postTask(todoListId: string, payload: { title: string}) {
    return instance.post(`todo-lists//${todoListId}/tasks`, payload)
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete(`todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, payload: { title: string}) {
    return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, payload)
  },
  changeTaskStatus(todoListId: string, taskId: string, payload: TaskTypeAPI) {
    return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, payload)
  }
};
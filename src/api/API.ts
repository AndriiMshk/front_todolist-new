import axios, { AxiosResponse } from 'axios';
import { UpdateTaskModelType } from '../components/todolists/tasks/bll/tasks-reducer';
import { GetTasksResponse, LoginParamsType, ResponseType, TaskTypeAPI, TodoListType } from './typesAPI';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'abb3a345-b7d8-4f0f-8c61-af2582f7869f',
  },
});

export const todoListsApi = {
  getTodolists() {
    return instance.get<TodoListType[]>('todo-lists');
  },
  postTodoList(payload: { title: string }) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListType }>>>
    ('todo-lists', payload);
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
  },
  updateTodoList(todoListId: string, payload: { title: string }) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}`, payload);
  },
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`);
  },
  postTask(todoListId: string, payload: { title: string }) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskTypeAPI }>>>
    (`todo-lists//${todoListId}/tasks`, payload);
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
  updateTask(todoListId: string, taskId: string, payload: UpdateTaskModelType) {
    return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskTypeAPI }>>>(
      `todo-lists/${todoListId}/tasks/${taskId}`, payload);
  },
};

export const authApi = {
  authMe() {
    return instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me');
  },
  login(params: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('/auth/login', params);
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login');
  },
};
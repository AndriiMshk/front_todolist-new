import { AddTodoListACType, RemoveTodoListACType, SetTodoListsACType } from '../todoList-reducer';
import { AppStatusType, TasksType, TaskTypeAPI, TaskTypePriority, TaskTypeStatus } from '../../../api/TypesAPI';
import { todoListsApi } from '../../../api/API';
import { RootType, ThunkTypes } from '../../../app/store';
import { setAppStatusAC } from '../../../app/app-reducer';
import { handleAppError, handleNetworkError } from '../../../helpers/error-utils';
import axios from 'axios';

export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodoListACType
  | RemoveTodoListACType
  | SetTodoListsACType

export type UpdateTaskModelType = {
  title?: string
  deadline?: string
  startDate?: string
  description?: string
  priority?: TaskTypePriority
  status?: TaskTypeStatus
  isDisabled?: boolean
}

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case 'TASK/DELETE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId),
      };
    case 'TASK/ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [{ ...action.task, isDisabled: false }, ...state[action.task.todoListId]],
      };
    case 'TASK/UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, ...action.taskModel }
          : el),
      };
    case 'TODOLIST/ADD-TODOLIST':
      return { ...state, [action.todoList.id]: [] };
    case 'TODOLIST/REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.todoListId];
      return copyState;
    }
    case 'TODOLIST/SET-TODOLISTS': {
      const copyState = { ...state };
      action.payload.forEach(el => {copyState[el.id] = [];});
      return copyState;
    }
    case 'TASK/SET-TASKS':
      return { ...state, [action.todoListId]: action.tasks };

    default:
      return state;
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => (
  { type: 'TASK/DELETE-TASK', todoListId, taskId } as const);
export const addTaskAC = (task: TaskTypeAPI) => ({ type: 'TASK/ADD-TASK', task } as const);
export const setTasksAC = (todoListId: string, tasks: any) => ({ type: 'TASK/SET-TASKS', todoListId, tasks } as const);
export const updateTaskAC = (todoListId: string, taskId: string, taskModel: UpdateTaskModelType) => (
  { type: 'TASK/UPDATE-TASK', todoListId, taskId, taskModel } as const);

export const setTasksTC = (todoListId: string): ThunkTypes => (
  async(dispatch) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.getTasks(todoListId);
      dispatch(setTasksAC(todoListId, res.data.items));
      dispatch(setAppStatusAC(AppStatusType.succeeded));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);
export const removeTaskTC = (todoListId: string, taskId: string): ThunkTypes => (
  async(dispatch) => {
    dispatch(updateTaskAC(todoListId, taskId, { isDisabled: true }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.deleteTask(todoListId, taskId);
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todoListId, taskId));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err?.message, dispatch);
      }
    }
    dispatch(updateTaskAC(todoListId, taskId, { isDisabled: false }));
  }
);
export const addTaskTC = (todoListId: string, title: string): ThunkTypes => (
  async(dispatch) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.postTask(todoListId, { title });
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);
export const updateTaskTC = (todoListId: string, taskId: string, taskModel: UpdateTaskModelType): ThunkTypes => (
  (async(dispatch, getState: () => RootType) => {
    dispatch(updateTaskAC(todoListId, taskId, { isDisabled: true }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    const task = getState().tasks[todoListId].find(el => el.id === taskId);
    if (task) {
      try {
        const res = await todoListsApi.updateTask(todoListId, taskId, { ...task, ...taskModel });
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todoListId, taskId, taskModel));
          dispatch(setAppStatusAC(AppStatusType.succeeded));
        } else {
          handleAppError(res.data, dispatch);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          handleNetworkError(err.message, dispatch);
        }
      }
    }
    dispatch(updateTaskAC(todoListId, taskId, { isDisabled: false }));
  })
);




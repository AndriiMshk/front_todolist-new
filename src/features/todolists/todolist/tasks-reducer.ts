import { AddTodoListACType, RemoveTodoListACType, SetTodoListsACType } from '../todoList-reducer';
import { TasksType, TaskTypeAPI, TaskTypePriority, TaskTypeStatus } from '../../../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../../../api/API';
import { RootType } from '../../../app/store';
import { AppStatusType, setAppStatusAC, SetErrorACType, SetStatusACType } from '../../../app/app-reducer';
import { handleAppError, handleNetworkError } from '../../../helpers/error-utils';

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodoListACType
  | RemoveTodoListACType
  | SetTodoListsACType

export type updateTaskModelType = {
  title?: string
  deadline?: string
  startDate?: string
  description?: string
  priority?: TaskTypePriority
  status?: TaskTypeStatus
}

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId),
      };
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, ...action.taskModel }
          : el),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todoList.id]: [] };
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.todoListId];
      return copyState;
    }
    case 'SET-TODOLISTS': {
      const copyState = { ...state };
      action.payload.forEach(el => {copyState[el.id] = [];});
      return copyState;
    }
    case 'SET-TASKS':
      return { ...state, [action.todoListId]: action.tasks };

    default:
      return state;
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => (
  { type: 'DELETE-TASK', todoListId, taskId } as const);
export const addTaskAC = (task: TaskTypeAPI) => ({ type: 'ADD-TASK', task } as const);
export const setTasksAC = (todoListId: string, tasks: any) => ({ type: 'SET-TASKS', todoListId, tasks } as const);
export const updateTaskAC = (todoListId: string, taskId: string, taskModel: updateTaskModelType) => (
  { type: 'UPDATE-TASK', todoListId, taskId, taskModel } as const);

export const setTasksTC = (todoListId: string) => (
  (dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.getTasks(todoListId)
      .then(res => {
        dispatch(setTasksAC(todoListId, res.data.items));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      })
      .catch(err => handleNetworkError(err, dispatch));
  });
export const removeTaskTC = (todoListId: string, taskId: string) => (
  (dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.deleteTask(todoListId, taskId)
      .then(() => {
        dispatch(removeTaskAC(todoListId, taskId));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      })
      .catch(err => handleNetworkError(err, dispatch));
  });
export const addTaskTC = (todoListId: string, title: string) => (
  (dispatch: Dispatch<ActionsType | SetErrorACType | SetStatusACType>) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.postTask(todoListId, { title })
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatusAC(AppStatusType.succeeded));
        } else {
          handleAppError(res.data, dispatch);
        }
      })
      .catch(err => handleNetworkError(err, dispatch));
  });
export const updateTaskTC = (todoListId: string, taskId: string, taskModel: updateTaskModelType) => (
  ((dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>, getState: () => RootType) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    const task = getState().tasks[todoListId].find(el => el.id === taskId);
    if (task) {
      todoListsApi.updateTask(todoListId, taskId, { ...task, ...taskModel })
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(todoListId, taskId, taskModel));
            dispatch(setAppStatusAC(AppStatusType.succeeded));
          } else {
            handleAppError(res.data, dispatch);
          }
        })
        .catch(err => handleNetworkError(err, dispatch));
    }
  }));




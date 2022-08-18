import { RootStateType, ThunkTypes } from '../../../../app/store';
import { AppStatusType } from '../../../../api/typesAPI';
import { todoListsApi } from '../../../../api/API';
import axios from 'axios';
import { handleAppError, handleNetworkError } from '../../../../helpers/error-utils';
import { tasksActions, UpdateTaskModelType } from './tasks-reducer';
import { appActions } from '../../../../app';

const { setTasksAC, addTaskAC, removeTaskAC, updateTaskAC } = tasksActions;
const { setAppStatusAC } = appActions;

const setTasks = (todoListId: string): ThunkTypes => (
  async dispatch => {
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

const addTask = (todoListId: string, title: string): ThunkTypes => (
  async dispatch => {
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

const removeTask = (todoListId: string, taskId: string): ThunkTypes => (
  async dispatch => {
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
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTaskAC(todoListId, taskId, { isDisabled: false }));
  }
);

const updateTask = (todoListId: string, taskId: string, taskModel: UpdateTaskModelType): ThunkTypes => (
  (async(dispatch, getState: () => RootStateType) => {
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

export const tasksAsyncActions = {
  setTasks,
  addTask,
  removeTask,
  updateTask,
};
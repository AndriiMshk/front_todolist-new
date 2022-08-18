import { ThunkTypes } from '../../../app/store';
import { AppStatusType } from '../../../api/typesAPI';
import { todoListsApi } from '../../../api/API';
import axios from 'axios';
import { handleAppError, handleNetworkError } from '../../../helpers/error-utils';
import { appActions } from '../../../app';
import { todoListActions } from './todoList-reducer';

const { setTodoListsAC, addTodoListAC, updateTodoListAC, removeTodoListAC } = todoListActions;
const { setAppStatusAC } = appActions;

const setTodoLists = (): ThunkTypes => (
  async dispatch => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.getTodolists();
      dispatch(setTodoListsAC(res.data));
      dispatch(setAppStatusAC(AppStatusType.succeeded));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);

const addTodoList = (title: string): ThunkTypes => (
  async dispatch => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.postTodoList({ title });
      if (res.data.resultCode === 0) {
        dispatch(addTodoListAC(res.data.data.item));
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

const removeTodoList = (todoListId: string): ThunkTypes => (
  async dispatch => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    dispatch(updateTodoListAC(todoListId, { isDisabled: true }));
    try {
      const res = await todoListsApi.deleteTodoList(todoListId);
      if (res.data.resultCode === 0) {
        dispatch(removeTodoListAC(todoListId));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTodoListAC(todoListId, { isDisabled: false }));
  }
);

const updateTodoList = (todoListId: string, title: string): ThunkTypes => (
  async dispatch => {
    dispatch(updateTodoListAC(todoListId, { isDisabled: true }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.updateTodoList(todoListId, { title });
      if (res.data.resultCode === 0) {
        dispatch(updateTodoListAC(todoListId, { title }));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTodoListAC(todoListId, { isDisabled: false }));
  }
);

export const todoListAsyncActions = {
  setTodoLists,
  addTodoList,
  removeTodoList,
  updateTodoList,
};
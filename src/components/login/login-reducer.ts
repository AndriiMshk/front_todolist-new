import { ThunkTypes } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppStatusType, LoginParamsType } from '../../api/TypesAPI';
import { authApi } from '../../api/API';
import axios from 'axios';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';

export type LoginReducerStateType = {
  isLogin: boolean
  name: string
}

export type LoginActionsType =
  | loginACType
  | logoutACType

const initialState: LoginReducerStateType = {
  isLogin: false,
  name: '',
};

export const loginReducer = (state: LoginReducerStateType = initialState, action: LoginActionsType):
  LoginReducerStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGIN':
    case 'LOGIN/SET-IS-LOGOUT':
      return { ...state, isLogin: action.isLogin, name: action.name };
    default:
      return state;
  }
};

export const loginAC = (isLogin: boolean, name: string) =>
  ({ type: 'LOGIN/SET-IS-LOGIN', isLogin, name } as const);
export const logoutAC = (isLogin: boolean, name: string) =>
  ({ type: 'LOGIN/SET-IS-LOGOUT', isLogin, name } as const);

export type loginACType = ReturnType<typeof loginAC>
export type logoutACType = ReturnType<typeof logoutAC>

export const loginTC = (params: LoginParamsType): ThunkTypes => (
  async(dispatch) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await authApi.login(params);
      if (res.data.resultCode === 0) {
        dispatch(loginAC(true, params.email));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
        dispatch(setAppStatusAC(AppStatusType.failed));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
        dispatch(setAppStatusAC(AppStatusType.failed));
      }
    }
  }
);

export const logoutTC = (isLogin: boolean): ThunkTypes => (
  async(dispatch) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      await authApi.logout();
      dispatch(logoutAC(isLogin, ''));
      dispatch(setAppStatusAC(AppStatusType.succeeded));

    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
        dispatch(setAppStatusAC(AppStatusType.failed));
      }
    }
  }
);
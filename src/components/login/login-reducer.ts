import { ThunkTypes } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppStatusType, LoginParamsType } from '../../api/typesAPI';
import { authApi } from '../../api/API';
import axios from 'axios';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';

const initialState: LoginReducerStateType = {
  isLogin: false,
  name: '',
};

export const loginReducer = (state: LoginReducerStateType = initialState, action: LoginActionsType):
  LoginReducerStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGIN':
      return { ...state, isLogin: action.isLogin, name: action.name };
    default:
      return state;
  }
};

export const login = (isLogin: boolean, name: string) => ({ type: 'LOGIN/SET-IS-LOGIN', isLogin, name } as const);

export const loginTC = (params: LoginParamsType): ThunkTypes => (
  async dispatch => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await authApi.login(params);
      if (res.data.resultCode === 0) {
        dispatch(login(true, params.email));
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

export const logoutTC = (isLogin: boolean): ThunkTypes => (
  async dispatch => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      await authApi.logout();
      dispatch(login(isLogin, ''));
      dispatch(setAppStatusAC(AppStatusType.succeeded));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);

export type LoginReducerStateType = {
  isLogin: boolean
  name: string
}

export type loginType = ReturnType<typeof login>

export type LoginActionsType = loginType


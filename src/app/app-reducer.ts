import { AppStatusType } from '../api/typesAPI';
import { ThunkTypes } from './store';
import { authApi } from '../api/API';
import { login } from '../components/login/login-reducer';
import { handleAppError, handleNetworkError } from '../helpers/error-utils';
import axios from 'axios';

const initialState: AppReducerStateType = {
  status: AppStatusType.idle,
  error: null,
  isInitialized: false,
};

export const appReducer = (state: AppReducerStateType = initialState, action: AppActionsType): AppReducerStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS' :
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: AppStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
export const setAppInitializedAC = (isInitialized: boolean) => ({
  type: 'APP/SET-INITIALIZED',
  isInitialized,
} as const);

export const setAppInitializedTC = (): ThunkTypes => (
  async dispatch => {
    try {
      const res = await authApi.authMe();
      if (res.data.resultCode === 0) {
        dispatch(login(true, res.data.data.email));
      } else {
        dispatch(login(false, ''));
        handleAppError(res.data, dispatch);
      }
      dispatch(setAppInitializedAC(true));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);

export type AppReducerStateType = {
  status: AppStatusType
  error: string | null
  isInitialized: boolean
}

export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export type SetStatusACType = ReturnType<typeof setAppStatusAC>
export type SetInitializedACType = ReturnType<typeof setAppInitializedAC>

export type AppActionsType =
  | SetErrorACType
  | SetStatusACType
  | SetInitializedACType


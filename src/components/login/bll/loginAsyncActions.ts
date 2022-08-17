import { appActions } from '../../../app';
import { AppStatusType, LoginParamsType } from '../../../api/typesAPI';
import { ThunkTypes } from '../../../app/store';
import { authApi } from '../../../api/API';
import { handleAppError, handleNetworkError } from '../../../helpers/error-utils';
import axios from 'axios';
import { loginActions } from './login-reducer';

const login = (params: LoginParamsType): ThunkTypes => (
  async dispatch => {
    dispatch(appActions.setAppStatusAC(AppStatusType.loading));
    try {
      const res = await authApi.login(params);
      if (res.data.resultCode === 0) {
        dispatch(loginActions.loginAC(true, params.email));
        dispatch(appActions.setAppStatusAC(AppStatusType.succeeded));
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

const logout = (isLogin: boolean): ThunkTypes => (
  async dispatch => {
    dispatch(appActions.setAppStatusAC(AppStatusType.loading));
    try {
      await authApi.logout();
      dispatch(loginActions.loginAC(isLogin, ''));
      dispatch(appActions.setAppStatusAC(AppStatusType.succeeded));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);

export const loginAsyncActions = {
  login,
  logout
}
import { ThunkTypes } from '../store';
import { authApi } from '../../api/API';
import { loginActions } from '../../components/login';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';
import axios from 'axios';
import { appActions } from '../index';

const setAppInitialized = (): ThunkTypes => (
  async dispatch => {
    try {
      const res = await authApi.authMe();
      if (res.data.resultCode === 0) {
        dispatch(loginActions.loginAC(true, res.data.data.email));
      } else {
        dispatch(loginActions.loginAC(false, ''));
        handleAppError(res.data, dispatch);
      }
      dispatch(appActions.setAppInitializedAC(true));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);

export const appAsyncActions = {
  setAppInitialized,
};
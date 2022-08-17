import { loginActions as actions } from './bll/login-reducer';
import { loginAsyncActions } from './bll/loginAsyncActions';

export const loginActions = {
  ...actions,
  ...loginAsyncActions,
};
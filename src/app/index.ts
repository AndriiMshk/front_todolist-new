import { appAsyncActions } from './bll/appAsyncActions';
import { appActions as actions } from './bll/app-reducer';

export const appActions = {
  // ...appAsyncActions,
  ...actions,
};
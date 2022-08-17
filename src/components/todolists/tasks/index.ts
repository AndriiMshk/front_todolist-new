import { tasksActions as actions } from './bll/tasks-reducer';
import { tasksAsyncActions } from './bll/tasksAsyncActions';

export const tasksActions = {
  ...actions,
  ...tasksAsyncActions,
};
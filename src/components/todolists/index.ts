import {todoListActions as actions} from './bll/todoList-reducer'
import {todoListAsyncActions} from './bll/todoListAsyncActions'

export const todoListActions = {
  ...actions,
  ...todoListAsyncActions
}
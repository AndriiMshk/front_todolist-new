import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { TasksActionsType, tasksReducer } from '../features/todolists/todolist/tasks-reducer';
import { todoListReducer, TodoListsActionsType } from '../features/todolists/todoList-reducer';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AppActionsType, appReducer } from './app-reducer';

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
  },
);

export type ThunkTypes<ReturnType = void> = ThunkAction<ReturnType, RootType, unknown, ActionTypes>
export type DispatchType = ThunkDispatch<RootType, unknown, ActionTypes>
export const useAppDispatch = () => useDispatch<DispatchType>();

export type RootType = ReturnType<typeof rootReducer>
export type ActionTypes =
  | AppActionsType
  | TodoListsActionsType
  | TasksActionsType

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;


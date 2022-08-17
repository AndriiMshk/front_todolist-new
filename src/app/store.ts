import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { TasksActionsType, tasksReducer } from '../components/todolists/tasks/bll/tasks-reducer';
import { todoListReducer, TodoListsActionsType } from '../components/todolists/bll/todoList-reducer';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppActionsType, appReducer } from './bll/app-reducer';
import { LoginActionsType, loginReducer } from '../components/login/bll/login-reducer';

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
  },
);

export type ThunkTypes<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionTypes>
export type DispatchType = ThunkDispatch<RootStateType, unknown, RootActionTypes>
export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export type RootStateType = ReturnType<typeof rootReducer>
export type RootActionTypes =
  | AppActionsType
  | TodoListsActionsType
  | TasksActionsType
  | LoginActionsType

export const store = createStore(rootReducer, applyMiddleware(thunk));


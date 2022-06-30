import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { tasksReducer } from '../features/todolists/todolist/tasks-reducer';
import { todoListReducer } from '../features/todolists/todoList-reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { appReducer } from './app-reducer';

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
  },
);

export type DispatchType = ThunkDispatch<RootType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>();
///  ОЧЕНЬ СУКА ВАЖНАЯ ШТУКА В 18 РЕАКТЕ ДЛЯ ТИПИЗАЦИИ САНОК
// вместо юс диспатч использовать useAppDispatch

export type RootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;


import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todoListReducer } from './todoList-reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
  },
);

export type DispatchType  = ThunkDispatch<RootType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>()
///  ОЧЕНЬ СУКА ВАЖНАЯ ШТУКА В 18 РЕАКТЕ ДЛЯ ТИПИЗАЦИИ САНОК
// вместо юс диспатч использовать useAppDispatch

export type RootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;


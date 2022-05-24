import { combineReducers, legacy_createStore as createStore } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todoListReducer } from './todoList-reducer';

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
  },
);

export type RootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;


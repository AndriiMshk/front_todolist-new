import { Provider } from 'react-redux';
import React from 'react';
import { v1 } from 'uuid';
import { combineReducers, legacy_createStore as createStore } from 'redux';
import { tasksReducer } from '../state/tasks-reducer';
import { todoListReducer } from '../state/todoList-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer,
});

const initialState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    ['todolistId1']: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    ['todolistId2']: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'React Book', isDone: true },
    ],
  },
};

type initialStateType = typeof initialState

export const storyBookStore = createStore(rootReducer, initialState as initialStateType);

// do not work with initial state

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={storyBookStore}> {story()} </Provider>;
};
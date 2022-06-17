import React from 'react';
import { TestTodoListComponentPropsType } from './types';
import { TestTasksComponent } from './Tasks-api';

export const TestTodoListComponent: React.FC<TestTodoListComponentPropsType> = ({ todoList, deleteTodoList, updateTodoList }) => {
  return (
    <div key={todoList.id}>
      <div style={{ margin: '10px' }}>
        <span>{todoList.title}</span>
        <button
          onClick={() => deleteTodoList(todoList.id, todoList.title)}
        >delete
        </button>
        <button
          onClick={() => updateTodoList(todoList.id, todoList.title)}
        >change
        </button>
      </div>
      <div>
        <TestTasksComponent todoListId={todoList.id} />
      </div>
    </div>
  );
};
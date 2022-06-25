import React from 'react';
import { TestTodoListComponentPropsType } from './TestTypes';
import { TestTasksComponent } from './TestTasks';

export const TestTodoListComponent: React.FC<TestTodoListComponentPropsType> = React.memo((
  { todoList, deleteTodoList, updateTodoList }) => {
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
})
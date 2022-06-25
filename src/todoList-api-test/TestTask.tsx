import React from 'react';
import { TestTaskComponentPropsType } from './TestTypes';

export const TestTaskComponent: React.FC<TestTaskComponentPropsType> = ({ task, deleteTask, updateTask }) => {
  return (
    <div>
      <span>{task.status === 0 ? '-' : '+'}</span>
      <span>{task.title}</span>
      <button onClick={() => deleteTask(task.id, task.title)}>delete</button>
      <button onClick={() => updateTask(task.id, task.title)}>change</button>
    </div>
  );
};
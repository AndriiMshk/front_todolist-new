import React, { useCallback } from 'react';
import { FilterValuesType, TaskType } from './App';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from './state/store';
import { addTaskAC, changeTaskCheckboxAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { Task } from './Task';

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: string
  deleteTodoList: (todolistId: string) => void
  changeFilterHandler: (filter: FilterValuesType) => void
  changeTodoListTitle: (title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((
  {
    todolistId,
    title,
    filter,
    deleteTodoList,
    changeFilterHandler,
    changeTodoListTitle,
  },
  ) => {

    console.log(`todolist: ${title} render`);

    const dispatch = useDispatch();

    const tasks = useSelector<RootType, TaskType[]>(state => state.tasks[todolistId]);

    let currentTasks = tasks;
    if (filter === 'active') {
      currentTasks = tasks.filter(task => !task.isDone);
    }
    if (filter === 'completed') {
      currentTasks = tasks.filter(task => task.isDone);
    }

    const addTaskHandler = useCallback((newTitle: string) => dispatch(addTaskAC(todolistId, newTitle)),
      [todolistId]);

    const onChangeTaskStatus = useCallback(
      (todolistId: string, taskId: string, isCheck: boolean) => dispatch(
        changeTaskCheckboxAC(todolistId, taskId, isCheck)), []);

    const changeTaskTitle = useCallback(
      (todolistId: string, taskId: string, title: string) => dispatch(changeTaskTitleAC(todolistId, taskId, title)),
      [todolistId]);

    const removeTask = useCallback(
      (todolistId: string, taskId: string) => dispatch(removeTaskAC(todolistId, taskId)), [todolistId]);

    return (
      <div>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '200px',
            alignItems: 'center',
            padding: '20px',
          }}>
            <EditableSpan title={title} refactor={(title) => changeTodoListTitle(title)} />
            <IconButton onClick={() => deleteTodoList(todolistId)}>
              <Delete />
            </IconButton>
          </div>
        </div>
        <AddItemForm onClick={addTaskHandler} />
        <ul style={{ padding: '0 20px' }}>
          {currentTasks.map(el =>
            <Task
              key={el.id}
              title={el.title}
              isDone={el.isDone}
              changeTaskTitle={(title: string) => changeTaskTitle(todolistId, el.id, title)}
              onChangeTaskStatus={(isCheck) => onChangeTaskStatus(todolistId, el.id, isCheck)}
              removeTask={() => removeTask(todolistId, el.id)}
            />)}
        </ul>
        <div>
          <Button
            color={'primary'}
            variant={filter === 'all' ? 'contained' : 'text'}
            onClick={() => changeFilterHandler('all')}
          >ALL
          </Button>
          <Button
            color={'secondary'}
            variant={filter === 'completed' ? 'contained' : 'text'}
            onClick={() => changeFilterHandler('completed')}
          >CHECKED
          </Button>
          <Button
            color={'secondary'}
            variant={filter === 'active' ? 'contained' : 'text'}
            onClick={() => changeFilterHandler('active')}
          >UNCHECKED
          </Button>
        </div>
      </div>
    );
  },
);





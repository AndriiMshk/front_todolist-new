import React from 'react';
import { FilterValuesType, TasksType, TaskType } from './App';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from './state/store';
import { addTaskAC, changeTaskCheckboxAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';

type TodolistPropsType = {
  todolistID: string
  title: string
  filter: string
  deleteTodoList: (todolistID: string) => void
  changeFilter: (filter: FilterValuesType) => void
  changeTodoListTitle: (title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
  {
    todolistID,
    title,
    filter,
    deleteTodoList,
    changeFilter,
    changeTodoListTitle,
  },
) => {
  const dispatch = useDispatch();

  const tasks = useSelector<RootType, TaskType[]>(state => state.tasks[todolistID]);

  let currentTasks = tasks;
  if (filter === 'active') {
    currentTasks = tasks.filter(task => !task.isDone);
  }
  if (filter === 'completed') {
    currentTasks = tasks.filter(task => task.isDone);
  }

  return (
    <div>
      <div>
        <h4><EditableSpan title={title} refactor={(title) => changeTodoListTitle(title)} />
          <IconButton onClick={() => deleteTodoList(todolistID)}>
            <Delete />
          </IconButton>
        </h4>
      </div>
      <AddItemForm onClick={(newTitle) => dispatch(addTaskAC(todolistID, newTitle))}/>
      <ul>
        {currentTasks.map(el => {
          return (
            <div key={el.id}>
              <Checkbox
                checked={el.isDone}
                onChange={(event) => dispatch(changeTaskCheckboxAC(todolistID, el.id, event.target.checked))}
              />
              <EditableSpan
                title={el.title}
                refactor={(title) => dispatch(changeTaskTitleAC(todolistID, el.id, title))}
              />
              <IconButton onClick={() => dispatch(removeTaskAC(todolistID, el.id))}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </ul>
      <div>
        <Button
          color={'primary'}
          variant={filter === 'all' ? 'contained' : 'text'}
          onClick={() => changeFilter( 'all')}
        >ALL
        </Button>
        <Button
          color={'secondary'}
          variant={filter === 'completed' ? 'contained' : 'text'}
          onClick={() => changeFilter( 'completed')}
        >CHECKED
        </Button>
        <Button
          color={'secondary'}
          variant={filter === 'active' ? 'contained' : 'text'}
          onClick={() => changeFilter( 'active')}
        >UNCHECKED
        </Button>
      </div>
    </div>
  );
};


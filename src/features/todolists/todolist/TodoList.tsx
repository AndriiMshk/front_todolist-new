import React, { useCallback, useEffect } from 'react';
import { EditableSpan } from '../../../components/EditableSpan';
import { AddItemForm } from '../../../components/AddItemForm';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootType, useAppDispatch } from '../../../app/store';
import { addTaskTC, removeTaskTC, setTasksTC, updateTaskTC } from './tasks-reducer';
import { Task } from './task/Task';
import { FilterValuesType, TaskTypeAPI, TaskTypeStatus } from '../../../api/TypesAPI';

type TodoListPropsType = {
  todoListId: string
  title: string
  filter: FilterValuesType
  deleteTodoList: (todoListId: string) => void
  changeFilterHandler: (filter: FilterValuesType) => void
  changeTodoListTitle: (title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = React.memo((
  {
    todoListId,
    title,
    filter,
    deleteTodoList,
    changeFilterHandler,
    changeTodoListTitle,
  },
  ) => {

    const dispatch = useAppDispatch();

    const tasks = useSelector<RootType, TaskTypeAPI[]>(state => {
      return (state.tasks[todoListId]);
    });

    useEffect(() => dispatch(setTasksTC(todoListId)), []);

    let currentTasks = tasks;
    if (filter === 'active') {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.New);
    }
    if (filter === 'completed') {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.Completed);
    }

    const addTaskHandler = useCallback((newTitle: string) =>
        dispatch(addTaskTC(todoListId, newTitle)), [todoListId]);

    const onChangeTaskStatus = useCallback(
      (todoListId: string, taskId: string, isCheck: boolean) => {
        let status = TaskTypeStatus.New;
        if (isCheck) {status = TaskTypeStatus.Completed;}
        // временная мера по замене статуса таски
        return (dispatch(updateTaskTC(todoListId, taskId, { status })) )
      }, [todoListId, tasks]);

    const changeTaskTitle = useCallback(
      (todoListId: string, taskId: string, title: string) =>
        dispatch(updateTaskTC(todoListId, taskId, { title })),
      [todoListId]);

    const removeTask = useCallback((todoListId: string, taskId: string) =>
        dispatch(removeTaskTC(todoListId, taskId)), [todoListId]);

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
            <IconButton onClick={() => deleteTodoList(todoListId)}>
              <Delete />
            </IconButton>
          </div>
        </div>
        <AddItemForm onClick={addTaskHandler} />
        <ul style={{ padding: '0 20px' }}>
          {currentTasks && currentTasks.map(el => <Task
            key={el.id}
            title={el.title}
            status={el.status}
            changeTaskTitle={(title: string) => changeTaskTitle(todoListId, el.id, title)}
            onChangeTaskStatus={(isCheck) => onChangeTaskStatus(todoListId, el.id, isCheck)}
            removeTask={() => removeTask(todoListId, el.id)}
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

export default TodoList;





import React, { useCallback, useEffect } from 'react';
import { FilterValuesType, TasksTypeAPI, TaskType } from './App';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from './state/store';
import { addTaskAC, changeTaskCheckboxAC, changeTaskTitleAC, getTasksAC, removeTaskAC } from './state/tasks-reducer';
import { Task } from './Task';
import { todoListsAPI } from './todoList-api-test/api/todolists-api';
import { getTodoListsAC } from './state/todoList-reducer';

type TodolistPropsType = {
  todolistId: string
  title: string
  // filter: string
  deleteTodoList: (todolistId: string) => void
  // changeFilterHandler: (filter: FilterValuesType) => void
  changeTodoListTitle: (title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((
  {
    todolistId,
    title,
    // filter,
    deleteTodoList,
    // changeFilterHandler,
    changeTodoListTitle,
  },
  ) => {

    console.log(`todolist: ${title} render`);

    const dispatch = useDispatch();

    const tasks = useSelector<RootType, TasksTypeAPI[]>(state => state.tasks[todolistId]);

  useEffect(()=> {
    todoListsAPI.getTasks(todolistId)
      .then((res) => {
        dispatch(getTasksAC(todolistId, res.data.items))
      })
  }, [])

    let currentTasks = tasks;
    // if (filter === 'active') {
    //   currentTasks = tasks.filter(task => !task.isDone);
    // }
    // if (filter === 'completed') {
    //   currentTasks = tasks.filter(task => task.isDone);
    // }
  console.log(currentTasks);

    const addTaskHandler = useCallback(async (newTitle: string) => {
      await todoListsAPI.postTask(todolistId, {title: newTitle})
      dispatch(addTaskAC(todolistId, newTitle));
      },
      [todolistId]);

    const onChangeTaskStatus = useCallback(
      (todolistId: string, taskId: string, isCheck: boolean) => dispatch(
        changeTaskCheckboxAC(todolistId, taskId, isCheck)), []);

    const changeTaskTitle = useCallback(
      async (todolistId: string, taskId: string, title: string) => {
        // @ts-ignore
        await todoListsAPI.updateTask(todolistId, taskId, { title: title })
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
      },
      [todolistId]);

    const removeTask = useCallback(
      async (todolistId: string, taskId: string) => {
        await todoListsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(todolistId, taskId))
      }, [todolistId]);

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
          {
            currentTasks &&
            currentTasks.map(el =>
            <Task
              key={el.id}
              title={el.title}
              // isDone={el.isDone}
              changeTaskTitle={(title: string) => changeTaskTitle(todolistId, el.id, title)}
              // onChangeTaskStatus={(isCheck) => onChangeTaskStatus(todolistId, el.id, isCheck)}
              removeTask={() => removeTask(todolistId, el.id)}
            />)
          }
        </ul>
        {/*<div>*/}
        {/*  <Button*/}
        {/*    color={'primary'}*/}
        {/*    variant={filter === 'all' ? 'contained' : 'text'}*/}
        {/*    onClick={() => changeFilterHandler('all')}*/}
        {/*  >ALL*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    color={'secondary'}*/}
        {/*    variant={filter === 'completed' ? 'contained' : 'text'}*/}
        {/*    onClick={() => changeFilterHandler('completed')}*/}
        {/*  >CHECKED*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    color={'secondary'}*/}
        {/*    variant={filter === 'active' ? 'contained' : 'text'}*/}
        {/*    onClick={() => changeFilterHandler('active')}*/}
        {/*  >UNCHECKED*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
    );
  },
);





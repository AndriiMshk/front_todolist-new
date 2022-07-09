import React, { useCallback, useEffect } from 'react';
import { EditableSpan } from '../../../components/EditableSpan';
import { AddItemForm } from '../../../components/AddItemForm';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addTaskTC, removeTaskTC, setTasksTC, updateTaskTC } from './tasks-reducer';
import { Task } from './task/Task';
import { AppStatusType, FilterValuesType, TaskTypeStatus, TodoListType } from '../../../api/TypesAPI';

type TodoListPropsType = {
  todoList: TodoListType
  deleteTodoList: (todoListId: string) => void
  changeFilterHandler: (filter: FilterValuesType) => void
  changeTodoListTitle: (title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = React.memo((
  {
    todoList,
    deleteTodoList,
    changeFilterHandler,
    changeTodoListTitle,
  },
  ) => {

    const dispatch = useAppDispatch();

    const tasks = useAppSelector(state => (state.tasks[todoList.id]));
    useEffect(() => {dispatch(setTasksTC(todoList.id));}, []);

    let currentTasks = tasks;
    if (todoList.filter === 'active') {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.New);
    }
    if (todoList.filter === 'completed') {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.Completed);
    }

    const addTaskHandler = useCallback((newTitle: string) =>
      dispatch(addTaskTC(todoList.id, newTitle)), [todoList.id]);

    const onChangeTaskStatus = useCallback(
      (todoListId: string, taskId: string, isCheck: boolean) => {
        let status = TaskTypeStatus.New;
        if (isCheck) {status = TaskTypeStatus.Completed;}
        return (dispatch(updateTaskTC(todoListId, taskId, { status })));
      }, [todoList.id, tasks]);

    const changeTaskTitle = useCallback(
      (todoListId: string, taskId: string, title: string) => {
        const currentTask = tasks.find(el => el.id === taskId);
        if (title !== currentTask?.title) {
          dispatch(updateTaskTC(todoListId, taskId, { title }));
        }
      }, [tasks]);

    const removeTask = useCallback((todoListId: string, taskId: string) =>
      (window.confirm('Are you sure?') && dispatch(removeTaskTC(todoListId, taskId))), [todoList.id]);

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
            <EditableSpan
              disabled={todoList.status === AppStatusType.loading}
              title={todoList.title}
              refactor={(title) => changeTodoListTitle(title)}
            />
            <IconButton
              onClick={() => deleteTodoList(todoList.id)}
              disabled={todoList.status === AppStatusType.loading}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <AddItemForm
          disabled={todoList.status === AppStatusType.loading}
          onClick={addTaskHandler} />
        <ul style={{ padding: '0 20px' }}>
          {currentTasks && currentTasks.map(el => <Task
            key={el.id}
            title={el.title}
            status={el.status}
            isDisabled={el.isDisabled}
            changeTaskTitle={(title: string) => changeTaskTitle(todoList.id, el.id, title)}
            onChangeTaskStatus={(isCheck) => onChangeTaskStatus(todoList.id, el.id, isCheck)}
            removeTask={() => removeTask(todoList.id, el.id)}
          />)}
        </ul>
        <div>
          <Button
            color={'primary'}
            variant={todoList.filter === 'all' ? 'contained' : 'text'}
            onClick={() => changeFilterHandler(FilterValuesType.all)}
          >ALL
          </Button>
          <Button
            color={'secondary'}
            variant={todoList.filter === 'completed' ? 'contained' : 'text'}
            onClick={() => changeFilterHandler(FilterValuesType.completed)}
          >CHECKED
          </Button>
          <Button
            color={'secondary'}
            variant={todoList.filter === 'active' ? 'contained' : 'text'}
            onClick={() => changeFilterHandler(FilterValuesType.active)}
          >UNCHECKED
          </Button>
        </div>
      </div>
    );
  },
);

export default TodoList;





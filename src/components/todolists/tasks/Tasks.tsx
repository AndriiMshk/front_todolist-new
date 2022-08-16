import React, { useCallback, useEffect, useState } from 'react';
import { EditableSpan } from '../../common/EditableSpan';
import { AddItemForm } from '../../common/AddItemForm';
import { Button, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addTaskTC, removeTaskTC, setTasksTC, updateTaskTC } from './tasks-reducer';
import { Task } from './task/Task';
import { FilterValuesType, TaskTypeStatus, TodoListType } from '../../../api/typesAPI';
import { Confirm } from '../../common/Confirm';

export const Tasks: React.FC<TasksPropsType> = React.memo((
  {
    todoList,
    deleteTodoList,
    changeFilterHandler,
    changeTodoListTitle,
  },
  ) => {

    const dispatch = useAppDispatch();

    const [openConfirm, setOpenConfirm] = useState(false);

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

    const onChangeTaskStatus = useCallback((todoListId: string, taskId: string, isCheck: boolean) => {
      let status = TaskTypeStatus.New;
      if (isCheck) {status = TaskTypeStatus.Completed;}
      return (dispatch(updateTaskTC(todoListId, taskId, { status })));
    }, [todoList.id, tasks]);

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
      const currentTask = tasks.find(el => el.id === taskId);
      if (title !== currentTask?.title) {
        dispatch(updateTaskTC(todoListId, taskId, { title }));
      }
    }, [tasks]);

    const removeTask = useCallback((todoListId: string, taskId: string) =>
      (dispatch(removeTaskTC(todoListId, taskId))), [todoList.id]);

    return (
      <>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '240px',
            alignItems: 'center',
            padding: '20px 0',
          }}>
            <EditableSpan
              isDisabled={todoList.isDisabled}
              title={todoList.title}
              refactor={title => changeTodoListTitle(title)}
            />
            <IconButton
              onClick={() => setOpenConfirm(!openConfirm)}
              disabled={todoList.isDisabled}
            >
              <Confirm
                isOpen={openConfirm}
                setOpen={setOpenConfirm}
                confirm={() => deleteTodoList(todoList.id)}
              />
            </IconButton>
          </div>
          <AddItemForm
            isDisabled={todoList.isDisabled}
            onClick={addTaskHandler} />
          <ul style={{ margin: '0', padding: '0' }}>
            {currentTasks && currentTasks.map(el => <Task
              key={el.id}
              title={el.title}
              status={el.status}
              isDisabled={el.isDisabled}
              changeTaskTitle={title => changeTaskTitle(todoList.id, el.id, title)}
              onChangeTaskStatus={isCheck => onChangeTaskStatus(todoList.id, el.id, isCheck)}
              removeTask={() => removeTask(todoList.id, el.id)}
            />)}
          </ul>
        </div>
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
      </>
    );
  },
);

type TasksPropsType = {
  todoList: TodoListType
  deleteTodoList: (todoListId: string) => void
  changeFilterHandler: (filter: FilterValuesType) => void
  changeTodoListTitle: (title: string) => void
}





import React, { useCallback, useEffect, useState } from 'react';
import { tasksActions } from './';
import { todoListActions } from '../';
import { useAppSelector } from '../../../app/store';
import { FilterValuesType, TaskTypeStatus, TodoListType } from '../../../api/typesAPI';
import { Task } from './task/Task';
import { Confirm } from '../../common/components/Confirm';
import { useActions } from '../../common/hooks/useActions';
import { FilterPanel } from './filterPanel/FilterPanel';
import { AddItemForm } from '../../common/components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan';
import { IconButton, Paper } from '@mui/material';
import style from './tasks.module.scss';

export const Tasks: React.FC<TasksPropsType> = React.memo(({ todoList }) => {

    const { setTasks, addTask } = useActions(tasksActions);
    const { removeTodoList, updateTodoList } = useActions(todoListActions);

    const [openConfirm, setOpenConfirm] = useState(false);

    const tasks = useAppSelector(state => (state.tasks[todoList.id]));

    const deleteTodoListHandler = useCallback(() =>
      removeTodoList(todoList.id), [todoList]);

    const changeTodoListTitleHandler = useCallback((todoListId: string, title: string) =>
      updateTodoList(todoListId, title), [todoList]);

    const addTaskHandler = useCallback((newTitle: string) =>
      addTask(todoList.id, newTitle), [todoList.id]);

    let currentTasks = tasks;
    if (todoList.filter === FilterValuesType.active) {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.New);
    }
    if (todoList.filter === FilterValuesType.completed) {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.Completed);
    }

    useEffect(() => {setTasks(todoList.id);}, []);

    return (
      <Paper className={style.main}>
        <div className={style.title}>
          <EditableSpan
            isDisabled={todoList.isDisabled}
            title={todoList.title}
            refactor={title => changeTodoListTitleHandler(todoList.id, title)}
          />
          <IconButton onClick={() => setOpenConfirm(!openConfirm)} disabled={todoList.isDisabled} size="small">
            <Confirm isOpen={openConfirm} setOpen={setOpenConfirm} confirm={deleteTodoListHandler} />
          </IconButton>
        </div>
        <AddItemForm isDisabled={todoList.isDisabled} onClick={addTaskHandler} />
        {currentTasks.length
          ? <ul>{currentTasks && currentTasks.map(el => <Task key={el.id} task={el} />)}</ul>
          : <div className={style.empty}>List is empty</div>}
        <FilterPanel filter={todoList.filter} todoListId={todoList.id} />
      </Paper>
    );
  },
);

type TasksPropsType = {
  todoList: TodoListType
}





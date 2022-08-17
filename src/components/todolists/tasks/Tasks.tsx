import React, { useCallback, useEffect, useState } from 'react';
import { tasksActions } from './';
import { todoListActions } from '../';
import { useAppSelector } from '../../../app/store';
import { FilterValuesType, TaskTypeStatus, TodoListType } from '../../../api/typesAPI';
import { Task } from './task/Task';
import { Confirm } from '../../common/components/Confirm';
import { useActions } from '../../common/hooks/useActions';
import { AddItemForm } from '../../common/components/AddItemForm';
import { EditableSpan } from '../../common/components/EditableSpan';
import { Grid, IconButton, Paper } from '@mui/material';
import { FilterPanel } from './filterPanel/FilterPanel';

export const Tasks: React.FC<TasksPropsType> = React.memo(({ todoList }) => {

    const { setTasks, addTask } = useActions(tasksActions);
    const { removeTodoList, updateTodoList } = useActions(todoListActions);

    const [openConfirm, setOpenConfirm] = useState(false);

    const tasks = useAppSelector(state => (state.tasks[todoList.id]));

    useEffect(() => {setTasks(todoList.id);}, []);

    const deleteTodoListHandler = useCallback(() =>
      removeTodoList(todoList.id), [todoList]);

    const changeTodoListTitleHandler = useCallback((todoListId: string, title: string) =>
      updateTodoList(todoListId, title), [todoList]);

    let currentTasks = tasks;
    if (todoList.filter === FilterValuesType.active) {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.New);
    }
    if (todoList.filter === FilterValuesType.completed) {
      currentTasks = tasks.filter(task => task.status === TaskTypeStatus.Completed);
    }

    const addTaskHandler = useCallback((newTitle: string) =>
      addTask(todoList.id, newTitle), [todoList.id]);

    return (
      <Grid item>
        <Paper>
          {currentTasks.length
            ? <div>
              <div>
                <EditableSpan
                  isDisabled={todoList.isDisabled}
                  title={todoList.title}
                  refactor={title => changeTodoListTitleHandler(todoList.id, title)}
                />
                <IconButton onClick={() => setOpenConfirm(!openConfirm)} disabled={todoList.isDisabled}>
                  <Confirm isOpen={openConfirm} setOpen={setOpenConfirm} confirm={deleteTodoListHandler} />
                </IconButton>
              </div>
              <AddItemForm isDisabled={todoList.isDisabled} onClick={addTaskHandler} />
              <ul>{currentTasks && currentTasks.map(el => <Task key={el.id} task={el} />)}</ul>
            </div>
            : <div>List is empty</div>}
          <FilterPanel filter={todoList.filter} todoListId={todoList.id} />
        </Paper>
      </Grid>
    );
  },
);

type TasksPropsType = {
  todoList: TodoListType
}





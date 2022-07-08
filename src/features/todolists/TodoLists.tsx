import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { FilterValuesType } from '../../api/TypesAPI';
import {
  addTodoListTC,
  removeTodoListTC,
  setTodoListsTC,
  updateTodoListAC,
  updateTodoListTC,
} from './todoList-reducer';
import { Grid, Paper } from '@mui/material';
import { AddItemForm } from '../../components/AddItemForm';
import TodoList from './todolist/TodoList';
import { Navigate } from 'react-router-dom';

export const TodoLists: React.FC = () => {

  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(state => state.todoLists);
  const isLogin = useAppSelector(state => state.login.isLogin);

  useEffect(() => {
    if (isLogin) {
      dispatch(setTodoListsTC());
    }
  }, []);

  const addTodoListHandler = useCallback((newTodoList: string) =>
    dispatch(addTodoListTC(newTodoList)), []);

  const deleteTodoListHandler = useCallback((todoListId: string) =>
    dispatch(removeTodoListTC(todoListId)), []);

  const changeFilterHandler = useCallback(
    (todoListId: string, filter: FilterValuesType) =>
      dispatch(updateTodoListAC(todoListId, { filter })), []);

  const changeTodoListTitleHandler = useCallback(
    (todoListId: string, title: string) => {
      const currentTodoList = todoLists.find(el => el.id === todoListId);
      if (title !== currentTodoList?.title) {
        dispatch(updateTodoListTC(todoListId, title));
      }
    }, [todoLists]);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm
          onClick={addTodoListHandler}
        />
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map(el => {
          return (
            <Grid
              item
              key={el.id}
            >
              <Paper
                style={{ padding: '10px' }}
              >
                <TodoList
                  todoList={el}
                  deleteTodoList={() => deleteTodoListHandler(el.id)}
                  changeFilterHandler={(filter: FilterValuesType) => changeFilterHandler(el.id, filter)}
                  changeTodoListTitle={(title) => changeTodoListTitleHandler(el.id, title)}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
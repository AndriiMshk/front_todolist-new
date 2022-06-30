import React, { useCallback, useEffect } from 'react';
import { RootType, useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { FilterValuesType, TodoListType } from '../../api/TypesAPI';
import {
  addTodoListTC,
  changeFilterTodoListAC,
  changeTitleTodoListTC,
  removeTodoListTC,
  setTodoListsTC,
} from './todoList-reducer';
import { Grid, Paper } from '@mui/material';
import { AddItemForm } from '../../components/AddItemForm';
import TodoList from './todolist/TodoList';

export const TodoLists: React.FC = () => {

  const dispatch = useAppDispatch();  // ЕБАНУТЬСЯ МОЖНОООООООО

  const todoLists = useSelector<RootType, TodoListType[]>(state => state.todoLists);

  useEffect(() => dispatch(setTodoListsTC()), []);

  const addTodoListHandler = useCallback((newTodoList: string) =>
    dispatch(addTodoListTC(newTodoList)), []);

  const deleteTodoListHandler = useCallback((todoListId: string) =>
    dispatch(removeTodoListTC(todoListId)), []);

  const changeFilterHandler = useCallback(
    (todoListId: string, filter: FilterValuesType) =>
      dispatch(changeFilterTodoListAC(todoListId, filter)), []);

  const changeTodoListTitleHandler = useCallback(
    (todoListId: string, title: string) =>
      dispatch(changeTitleTodoListTC(todoListId, title)), []);

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
                  todoListId={el.id}
                  title={el.title}
                  filter={el.filter}
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
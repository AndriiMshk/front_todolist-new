import React, { useCallback } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from '@mui/material';
import {
  addTodoLIstAC,
  changeFilterTodoLIstAC,
  changeTitleTodoLIstAC,
  removeTodoLIstAC,
} from './state/todoList-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from './state/store';
import { GetTodoListsComponent } from './TodoLists-api';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string
  title: string
  filter: string
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [key: string]: TaskType[]
}

function App() {

  console.log('App render');

  const dispatch = useDispatch();

  const todolists = useSelector<RootType, TodolistsType[]>(state => state.todoLists);

  const addTodoListHandler = useCallback((newTodoList: string) => dispatch(addTodoLIstAC(newTodoList)), []);

  const deleteTodoListHandler = useCallback((todoListId: string) => dispatch(removeTodoLIstAC(todoListId)), []);

  const changeFilterHandler = useCallback(
    (todoListId: string, filter: FilterValuesType) => dispatch(changeFilterTodoLIstAC(todoListId, filter)), []);

  const changeTodoListTitleHandler = useCallback(
    (todoListId: string, title: string) => dispatch(changeTitleTodoLIstAC(todoListId, title)), []);

  return (
    <>
      {/*<Box sx={{ flexGrow: 1 }}>*/}
      {/*  <AppBar position="static">*/}
      {/*    <Toolbar>*/}
      {/*      <IconButton*/}
      {/*        size="large"*/}
      {/*        edge="start"*/}
      {/*        color="inherit"*/}
      {/*        aria-label="menu"*/}
      {/*        sx={{ mr: 2 }}*/}
      {/*      >*/}
      {/*        <MenuIcon />*/}
      {/*      </IconButton>*/}
      {/*      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
      {/*        News*/}
      {/*      </Typography>*/}
      {/*      <Button color="inherit">Login</Button>*/}
      {/*    </Toolbar>*/}
      {/*  </AppBar>*/}
      {/*</Box>*/}
      {/*<Container fixed>*/}
      {/*  <Grid container style={{ padding: '20px' }}>*/}
      {/*    <AddItemForm*/}
      {/*      onClick={addTodoListHandler}*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*  <Grid container spacing={3}>*/}
      {/*    {todolists.map(el => {*/}
      {/*      return (*/}
      {/*        <Grid*/}
      {/*          item*/}
      {/*          key={el.id}*/}
      {/*        >*/}
      {/*          <Paper*/}
      {/*            style={{ padding: '10px' }}*/}
      {/*          >*/}
      {/*            <Todolist*/}
      {/*              todolistId={el.id}*/}
      {/*              title={el.title}*/}
      {/*              filter={el.filter}*/}
      {/*              deleteTodoList={() => deleteTodoListHandler(el.id)}*/}
      {/*              changeFilterHandler={(filter: FilterValuesType) => changeFilterHandler(el.id, filter)}*/}
      {/*              changeTodoListTitle={(title) => changeTodoListTitleHandler(el.id, title)}*/}
      {/*            />*/}
      {/*          </Paper>*/}
      {/*        </Grid>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Grid>*/}
      {/*</Container>*/}
      <div>
        <h2>TodoListsApi</h2>
        <GetTodoListsComponent />
      </div>
    </>
  );
}

export default App;



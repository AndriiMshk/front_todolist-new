import React, { useCallback } from 'react';
import './App.css';
import {
  addTodoLIstAC,
  changeFilterTodoLIstAC,
  changeTitleTodoLIstAC,
  removeTodoLIstAC,
} from './state/todoList-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from './state/store';
import { TestTodoListsComponent } from './todoList-api-test/TestTodoLists';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from '@mui/material';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType, TodoListType } from './api/TypesAPI';
import { TodoList } from './TodoList';

function App() {

  const dispatch = useDispatch();

  const todoLists = useSelector<RootType, TodoListType[]>(state => state.todoLists);

  const addTodoListHandler = useCallback((newTodoList: string) =>
    dispatch(addTodoLIstAC(newTodoList)), []);

  const deleteTodoListHandler = useCallback((todoListId: string) =>
    dispatch(removeTodoLIstAC(todoListId)), []);

  const changeFilterHandler = useCallback(
    (todoListId: string, filter: FilterValuesType) =>
      dispatch(changeFilterTodoLIstAC(todoListId, filter)), []);

  const changeTodoListTitleHandler = useCallback(
    (todoListId: string, title: string) =>
      dispatch(changeTitleTodoLIstAC(todoListId, title)), []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
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
      </Container>
      <div>
        <h2>TodoListsApi</h2>
        <TestTodoListsComponent />
      </div>
    </>
  );
}

export default App;



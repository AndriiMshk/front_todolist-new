import React, { useCallback, useEffect } from 'react';
import './App.css';
import {
  addTodoLIstAC,
  // changeFilterTodoLIstAC,
  changeTitleTodoLIstAC, getTodoListsAC,
  removeTodoLIstAC,
} from './state/todoList-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from './state/store';
import { TestTodoListsComponent } from './todoList-api-test/TodoLists-api';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from '@mui/material';
import { AddItemForm } from './AddItemForm';
import { Todolist } from './Todolist';
import { todoListsAPI } from './todoList-api-test/api/todolists-api';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string
  title: string
  filter: string
}
export type TodoListsTypeAPI = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type TasksTypeAPI = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [key: string]: TasksTypeAPI[]
}

function App() {

  console.log('App render');

  const dispatch = useDispatch();

  useEffect(()=> {
    todoListsAPI.getTodolists()
      .then((res) => {
        dispatch(getTodoListsAC(res.data))
      })
  }, [])

  const todolists = useSelector<RootType, TodoListsTypeAPI[]>(state => state.todoLists);

  const addTodoListHandler = useCallback(async (newTodoList: string) => {
    try {
      const res = await todoListsAPI.postTodoList({ title: newTodoList });
      dispatch(addTodoLIstAC(newTodoList))
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteTodoListHandler = useCallback(async (todoListId: string) => {
    try {
      await todoListsAPI.deleteTodoList(todoListId);
      dispatch(removeTodoLIstAC(todoListId))
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const changeFilterHandler = useCallback(
  //   (todoListId: string, filter: FilterValuesType) => dispatch(changeFilterTodoLIstAC(todoListId, filter)), []);

  const changeTodoListTitleHandler = useCallback(
    async (todoListId: string, title: string) => {
      try {
        await todoListsAPI.updateTodoList(todoListId, { title: title });
        dispatch(changeTitleTodoLIstAC(todoListId, title))
      } catch (err) {
        console.log(err);
      }
    }, []);

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
          {todolists.map(el => {
            return (
              <Grid
                item
                key={el.id}
              >
                <Paper
                  style={{ padding: '10px' }}
                >
                  <Todolist
                    todolistId={el.id}
                    title={el.title}
                    // filter={el.filter}
                    deleteTodoList={() => deleteTodoListHandler(el.id)}
                    // changeFilterHandler={(filter: FilterValuesType) => changeFilterHandler(el.id, filter)}
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



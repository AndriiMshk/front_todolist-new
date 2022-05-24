import React from 'react';
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

  const dispatch = useDispatch();
  const todolists = useSelector<RootType, TodolistsType[]>(state => state.todoLists);

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
            onClick={(newTodoList) => dispatch(addTodoLIstAC(newTodoList))}
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
                    todolistID={el.id}
                    title={el.title}
                    filter={el.filter}
                    deleteTodoList={() => dispatch(removeTodoLIstAC(el.id))}
                    changeFilter={(filter: FilterValuesType) => dispatch(changeFilterTodoLIstAC(el.id, filter))}
                    changeTodoListTitle={(title) => dispatch(changeTitleTodoLIstAC(el.id, title))}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default App;


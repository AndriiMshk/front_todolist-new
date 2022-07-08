import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, LinearProgress } from '@mui/material';
import { TodoLists } from '../features/todolists/TodoLists';
import { ErrorMessage } from '../components/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootType } from './store';
import { AppStatusType } from '../api/TypesAPI';

function App() {
  const status = useSelector<RootType, AppStatusType>(state => state.app.status)
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
              My TodoLists
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {status === 'loading' && <LinearProgress />}
      </Box>
      <Container fixed>
        <TodoLists />
        <ErrorMessage />
      </Container>
    </>
  );
}

export default App;



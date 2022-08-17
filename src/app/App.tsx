import React, { useEffect } from 'react';
import './App.css';
import { Container } from '@mui/material';
import { TodoLists } from '../components/todolists/TodoLists';
import { ErrorMessage } from '../components/common/components/ErrorMessage';
import { useAppSelector } from './store';
import { Login } from '../components/login/Login';
import { Route, Routes } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { appActions } from './';
import { useActions } from '../components/common/hooks/useActions';
import { Header } from '../components/header/Header';

function App() {

  const { isInitialized } = useAppSelector(state => state.app);

  const { setAppInitialized } = useActions(appActions);

  useEffect(() => {setAppInitialized();}, []);

  if (!isInitialized) {
    return (
      <div style={{ width: '100%', position: 'fixed', top: '30%', textAlign: 'center' }}>
        <CircularProgress size={200} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container fixed>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/'} element={<TodoLists />} />
        </Routes>
        <ErrorMessage />
      </Container>
    </>
  );
}

export default App;



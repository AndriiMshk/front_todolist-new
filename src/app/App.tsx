import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './store';
import { appAsyncActions } from './bll/appAsyncActions';
import { TodoLists } from '../components/todolists/TodoLists';
import { Login } from '../components/login/Login';
import { Header } from '../components/header/Header';
import { ErrorMessage } from '../components/common/components/ErrorMessage';
import { useActions } from '../components/common/hooks/useActions';
import CircularProgress from '@mui/material/CircularProgress';
import style from './app.module.scss';

function App() {

  const { isInitialized } = useAppSelector(state => state.app);

  const { setAppInitialized } = useActions(appAsyncActions);

  useEffect(() => {setAppInitialized();}, []);

  if (!isInitialized) {
    return (
      <div className={style.loader}>
        <CircularProgress size={200} />
      </div>
    );
  }

  return (
    <div className={style.main}>
      <Header />
      <div className={style.container}>
        <Routes>
          <Route path={'/'} element={<TodoLists />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
        <ErrorMessage />
      </div>
    </div>
  );
}

export default App;



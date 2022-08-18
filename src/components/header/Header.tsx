import React, { useCallback } from 'react';
import { useAppSelector } from '../../app/store';
import { AppStatusType } from '../../api/typesAPI';
import { loginActions } from '../login';
import { useActions } from '../common/hooks/useActions';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import style from './header.module.scss';

export const Header: React.FC = () => {

  const { isLogin, name } = useAppSelector(state => state.login);
  const { status } = useAppSelector(state => state.app);

  const { logout } = useActions(loginActions);

  const logoutHandler = useCallback(() => logout(false), []);

  return (
    <Box sx={{ flexGrow: 1 }} className={style.main}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{name}</Typography>
          {!isLogin
            ? <Button color="inherit">Login</Button>
            : <Button
              onClick={logoutHandler}
              color="inherit"
            >Exit</Button>}
        </Toolbar>
        {status === AppStatusType.loading && <div className={style.loadingLine}><LinearProgress /></div>}
      </AppBar>
    </Box>
  );
};


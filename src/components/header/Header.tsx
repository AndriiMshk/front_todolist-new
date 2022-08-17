import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LinearProgress } from '@mui/material';
import { useAppSelector } from '../../app/store';
import { useActions } from '../common/hooks/useActions';
import { loginActions } from '../login';

export const Header: React.FC = () => {

  const { isLogin, name } = useAppSelector(state => state.login);
  const { status } = useAppSelector(state => state.app);

  const { logout } = useActions(loginActions);

  const logoutHandler = useCallback(() => {logout(false);}, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {name}
            </Typography>
            {!isLogin
              ? <Button color="inherit">Login</Button>
              : <Button
                onClick={logoutHandler}
                color="inherit"
              >Exit</Button>
            }
          </Toolbar>
          {status === 'loading' && <LinearProgress/>}
        </AppBar>
      </Box>
    </>
  );
};


//app bar  position="relative" style={{ height: '64px' }}
// loading  style={{ width: '100%', top: '60px', position: 'fixed' }}

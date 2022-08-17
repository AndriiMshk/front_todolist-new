import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Delete } from '@mui/icons-material';

export const Confirm: React.FC<ConfirmPropsType> = React.memo((
  { isOpen, setOpen, confirm },
) => {

  const confirmHandler = () => {
    setOpen(false);
    confirm();
  };

  return (
    <div>
      <Delete onClick={() => setOpen(true)} />
      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={confirmHandler} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

type ConfirmPropsType = {
  setOpen: (isOpen: boolean) => void
  confirm: () => void
  isOpen: boolean
}
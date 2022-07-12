import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Delete } from '@mui/icons-material';

type ConfirmPropsType = {
  setOpen: (open: boolean) => void
  confirm: () => void
  open: boolean
}

export const Confirm: React.FC<ConfirmPropsType> = ({ open, setOpen, confirm }) => {

  const agree = () => {
    setOpen(false);
    confirm();
  };

  return (
    <div>
      <Delete onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={agree} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

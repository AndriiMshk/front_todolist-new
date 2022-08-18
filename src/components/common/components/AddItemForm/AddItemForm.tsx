import React, { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, TextField } from '@mui/material';
import style from './addItemForm.module.scss'

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ onClick, isDisabled }) => {

  const [newTitle, setNewTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const addTitleHandler = () => {
    if (newTitle.trim() !== '') {
      onClick(newTitle);
    } else {
      setError(true);
    }
    setNewTitle('');
    setTimeout(() => setError(false), 1000);
  };

  const pressEnterHandler = (key: string) => {
    if (key === 'Enter') {
      addTitleHandler();
    }
  };

  return (
    <div className={style.main}>
      <TextField
        disabled={isDisabled}
        variant="outlined"
        label="Enter title"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
        onKeyPress={event => pressEnterHandler(event.key)}
        error={error}
        helperText={error ? 'error' : ''}
        autoComplete="off"
      />
      <IconButton
        disabled={isDisabled}
        color="primary"
        onClick={addTitleHandler}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  );
});

type AddItemFormPropsType = {
  onClick: (newTitle: string) => void
  isDisabled?: boolean
}
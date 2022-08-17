import React, { useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((
  { onClick, isDisabled },
) => {

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
    <Grid container>
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
        <ControlPoint />
      </IconButton>
    </Grid>
  );
});

type AddItemFormPropsType = {
  onClick: (newTitle: string) => void
  isDisabled?: boolean
}
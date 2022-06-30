import React, { useMemo, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

type AddItemFormPropsType = {
  onClick: (newTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ onClick }) => {

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
    <div>
      <TextField
        variant={'outlined'}
        label={'Enter title'}
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyPress={(event) => pressEnterHandler(event.key)}
        error={error}
        helperText={error ? 'error' : ''}
      />
      <IconButton
        color={'primary'}
        onClick={addTitleHandler}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
})
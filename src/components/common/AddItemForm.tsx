import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

type AddItemFormPropsType = {
  onClick: (newTitle: string) => void
  disabled?: boolean
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ onClick, disabled }) => {

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
    <div style={{ height: '70px' }}>
      <TextField
        disabled={disabled}
        variant={'outlined'}
        label={'Enter title'}
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyPress={(event) => pressEnterHandler(event.key)}
        error={error}
        helperText={error ? 'error' : ''}
        autoComplete={'off'}
      />
      <IconButton
        disabled={disabled}
        color={'primary'}
        onClick={addTitleHandler}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
});
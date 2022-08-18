import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import style from './editableSpan.module.scss';

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((
  { title, isDisabled, refactor },
) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setTitle] = useState(title);

  const onChangeHandler = () => {
    if (newTitle.trim() !== '' && newTitle !== title) {
      refactor(newTitle);
    } else {
      setTitle(title);
    }
    setEditMode(false);
  };

  const onPressKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChangeHandler();
    }
  };

  const setEditModeHandler = () => {
    !isDisabled &&
    setEditMode(true);
  };

  useEffect(() => {setTitle(title);}, [isDisabled]);

  return (
    editMode
      ? <TextField
        disabled={isDisabled}
        variant="standard"
        value={newTitle}
        onChange={event => {setTitle(event.target.value);}}
        onBlur={onChangeHandler}
        onKeyPress={onPressKeyHandler}
        autoFocus />
      : <span className={style.main} onDoubleClick={setEditModeHandler}>{title}</span>
  );
});

export type EditableSpanPropsType = {
  title: string
  refactor: (title: string) => void
  isDisabled?: boolean
}
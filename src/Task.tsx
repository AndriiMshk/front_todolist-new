import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { EditableSpan } from './EditableSpan';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

type TaskPropsType = {
  title: string
  // isDone: boolean
  // onChangeTaskStatus: (isCheck: boolean) => void
  changeTaskTitle: (title: string) => void
  removeTask: () => void
}
export const Task: React.FC<TaskPropsType> = React.memo(({
    title,
    // isDone,
    // onChangeTaskStatus,
    changeTaskTitle,
    removeTask,
  }) => {

    return (

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
        <div>
          {/*<Checkbox*/}
          {/*  checked={isDone}*/}
          {/*  onChange={(event) => onChangeTaskStatus(event.target.checked)}*/}
          {/*/>*/}
          <EditableSpan
            title={title}
            refactor={(title) => changeTaskTitle(title)}
          />
        </div>
        <div>
          <IconButton onClick={removeTask}>
            <Delete />
          </IconButton>
        </div>
      </div>
    );
  },
);
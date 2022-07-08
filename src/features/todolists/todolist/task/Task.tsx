import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { EditableSpan } from '../../../../components/EditableSpan';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { TaskTypeStatus } from '../../../../api/TypesAPI';

type TaskPropsType = {
  title: string
  status: TaskTypeStatus
  onChangeTaskStatus: (isCheck: boolean) => void
  changeTaskTitle: (title: string) => void
  removeTask: () => void
  isDisabled: boolean
}
export const Task: React.FC<TaskPropsType> = React.memo(({
    title,
    status,
    onChangeTaskStatus,
    changeTaskTitle,
    removeTask,
    isDisabled,
  }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
        <div>
          <Checkbox
            checked={status === TaskTypeStatus.Completed}
            onChange={(event) => onChangeTaskStatus(event.target.checked)}
            disabled={isDisabled}
          />
          <EditableSpan
            title={title}
            refactor={(title) => changeTaskTitle(title)}
            disabled={isDisabled}
          />
        </div>
        <div>
          <IconButton onClick={removeTask} disabled={isDisabled}>
            <Delete />
          </IconButton>
        </div>
      </div>
    );
  },
);

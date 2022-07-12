import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { EditableSpan } from '../../../../components/EditableSpan';
import { IconButton } from '@mui/material';
import { TaskTypeStatus } from '../../../../api/TypesAPI';
import { Confirm } from '../../../../components/Confirm';

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

    const [openConfirm, setOpenConfirm] = useState(false);

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
          <IconButton onClick={() => setOpenConfirm(!openConfirm)} disabled={isDisabled}>
            <Confirm
              open={openConfirm}
              setOpen={setOpenConfirm}
              confirm={removeTask}
            />
          </IconButton>
        </div>
      </div>
    );
  },
);

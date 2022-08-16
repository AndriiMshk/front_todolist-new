import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { EditableSpan } from '../../../common/EditableSpan';
import { IconButton } from '@mui/material';
import { TaskTypeStatus } from '../../../../api/typesAPI';
import { Confirm } from '../../../common/Confirm';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '240px' }}>
        <div>
          <Checkbox
            checked={status === TaskTypeStatus.Completed}
            onChange={(event) => onChangeTaskStatus(event.target.checked)}
            disabled={isDisabled}
          />
          <EditableSpan
            title={title}
            refactor={(title) => changeTaskTitle(title)}
            isDisabled={isDisabled}
          />
        </div>
        <div>
          <IconButton onClick={() => setOpenConfirm(!openConfirm)} disabled={isDisabled}>
            <Confirm
              isOpen={openConfirm}
              setOpen={setOpenConfirm}
              confirm={removeTask}
            />
          </IconButton>
        </div>
      </div>
    );
  },
);

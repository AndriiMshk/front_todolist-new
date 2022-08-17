import React, { useCallback, useState } from 'react';
import { tasksActions } from '../index';
import { TaskTypeAPI, TaskTypeStatus } from '../../../../api/typesAPI';
import { useActions } from '../../../common/hooks/useActions';
import { Confirm } from '../../../common/components/Confirm';
import { EditableSpan } from '../../../common/components/EditableSpan';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

export const Task: React.FC<TaskPropsType> = React.memo(({ task }) => {

    const { removeTask, updateTask } = useActions(tasksActions);

    const [openConfirm, setOpenConfirm] = useState(false);

    const { id, title, isDisabled, status, todoListId } = task;

    const onChangeTaskStatusHandler = useCallback((todoListId: string, taskId: string, isCheck: boolean) => {
      let status = TaskTypeStatus.New;
      if (isCheck) {status = TaskTypeStatus.Completed;}
      return updateTask(todoListId, taskId, { status });
    }, []);

    const changeTaskTitleHandler = useCallback((todoListId: string, taskId: string, title: string) =>
      updateTask(todoListId, taskId, { title }), []);

    const removeTaskHandlerHandler = useCallback(() => removeTask(todoListId, id), []);

    return (
      <div>
        <div>
          <Checkbox
            checked={status === TaskTypeStatus.Completed}
            onChange={event => onChangeTaskStatusHandler(todoListId, id, event.target.checked)}
            disabled={isDisabled}
          />
          <EditableSpan
            title={title}
            refactor={title => changeTaskTitleHandler(todoListId, id, title)}
            isDisabled={isDisabled}
          />
        </div>
        <div>
          <IconButton onClick={() => setOpenConfirm(!openConfirm)} disabled={isDisabled}>
            <Confirm isOpen={openConfirm} setOpen={setOpenConfirm} confirm={removeTaskHandlerHandler} />
          </IconButton>
        </div>
      </div>
    );
  },
);

type TaskPropsType = {
  task: TaskTypeAPI
}

import React from 'react';
import { todoListActions } from '../../index';
import { FilterValuesType } from '../../../../api/typesAPI';
import { useActions } from '../../../common/hooks/useActions';
import { Button } from '@mui/material';
import style from './filterPanel.module.scss';

export const FilterPanel: React.FC<FilterPanelPropsType> = ({ filter, todoListId }) => {

  const { updateTodoListAC } = useActions(todoListActions);

  const renderFilterButton = (buttonFilter: FilterValuesType, text: string) =>
    <Button color={filter === buttonFilter ? 'secondary' : 'primary'}
            onClick={() => updateTodoListAC(todoListId, { filter: buttonFilter })}
            variant="text"
    >
      {text}
    </Button>;

  return (
    <div className={style.main}>
      {renderFilterButton(FilterValuesType.all, 'ALL')}
      {renderFilterButton(FilterValuesType.completed, 'Completed')}
      {renderFilterButton(FilterValuesType.active, 'Active')}
    </div>
  );
};

type FilterPanelPropsType = {
  filter: FilterValuesType
  todoListId: string
}
import React from 'react';
import { todoListActions } from '../../index';
import { FilterValuesType } from '../../../../api/typesAPI';
import { useActions } from '../../../common/hooks/useActions';
import { Button } from '@mui/material';

export const FilterPanel: React.FC<FilterPanelPropsType> = ({ filter, todoListId }) => {

  const { updateTodoListAC } = useActions(todoListActions);

  const renderFilterButton = (buttonFilter: FilterValuesType, text: string) =>
    <Button variant={filter === buttonFilter ? 'outlined' : 'text'}
            onClick={() => updateTodoListAC(todoListId, { filter: buttonFilter })}
            color="primary">
      {text}
    </Button>;

  return (
    <div>
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
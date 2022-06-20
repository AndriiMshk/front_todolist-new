import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../api/TypesAPI';

export type AddTodoListActionType = ReturnType<typeof addTodoLIstAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoLIstAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterTodoLIstAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTitleTodoLIstAC>

type ActionsType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeFilterActionType
  | ChangeTodoListTitleActionType

const initialState: TodoListType[] = [];

export const todoListReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'ADD-TODOLIST':
      return [
        {
          id: action.todoListId,
          title: action.newTitle,
          filter: 'all',
          addedDate: '',
          order: 0,
        },
        ...state,
      ];
    case 'CHANGE-FILTER':
      return state.map(el => el.id === action.todoListId
        ? { ...el, filter: action.newFilter }
        : el);
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(el => el.id === action.todoListId
        ? { ...el, title: action.newTitle }
        : el);
    default:
      return state;
  }
};

export const removeTodoLIstAC = (todoListId: string) => {
  return { type: 'REMOVE-TODOLIST', todoListId: todoListId } as const;
};
export const addTodoLIstAC = (newTitle: string) => {
  return { type: 'ADD-TODOLIST', todoListId: v1(), newTitle: newTitle } as const;
};
export const changeFilterTodoLIstAC = (todoListId: string, newFilter: FilterValuesType) => {
  return { type: 'CHANGE-FILTER', todoListId: todoListId, newFilter: newFilter } as const;
};
export const changeTitleTodoLIstAC = (todoListId: string, newTitle: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', todoListId: todoListId, newTitle: newTitle } as const;
};
import { FilterValuesType, TodolistsType } from '../App';
import { v1 } from 'uuid';

export type AddTodoListActionType = ReturnType<typeof addTodoLIstAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoLIstAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterTodoLIstAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTitleTodoLIstAC>

type ActionsType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeFilterActionType
  | ChangeTodoListTitleActionType

const initialState: TodolistsType[] = [];

export const todoListReducer = (state: TodolistsType[] = initialState, action: ActionsType): TodolistsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'ADD-TODOLIST':
      return [{ id: action.todoListId, title: action.newTitle, filter: 'all' }, ...state];
    case 'CHANGE-FILTER':
      return state.map(el => el.id === action.todolistId
        ? { ...el, filter: action.newFilter }
        : el);
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(el => el.id === action.todolistId
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
export const changeFilterTodoLIstAC = (todolistId: string, newFilter: FilterValuesType) => {
  return { type: 'CHANGE-FILTER', todolistId: todolistId, newFilter: newFilter } as const;
};
export const changeTitleTodoLIstAC = (todolistId: string, newTitle: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, newTitle: newTitle } as const;
};
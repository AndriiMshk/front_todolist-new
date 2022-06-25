import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../api/API';

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterTodoListAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTitleTodoListAC>

export type setTodoListsACType = ReturnType<typeof setTodoListsAC>

type ActionsType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeFilterActionType
  | ChangeTodoListTitleActionType
  | setTodoListsACType

const initialState: TodoListType[] = [];

export const todoListReducer = (state: TodoListType[] = initialState, action: ActionsType):
  TodoListType[] => {
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
    case 'SET-TODOLISTS':
      return action.payload.map(el => ({ ...el, filter: 'all' }));
    default:
      return state;
  }
};

export const removeTodoListAC = (todoListId: string) => ({ type: 'REMOVE-TODOLIST', todoListId } as const);
export const addTodoListAC = (newTitle: string) => ({ type: 'ADD-TODOLIST', todoListId: v1(), newTitle } as const);
export const changeFilterTodoListAC = (todoListId: string, newFilter: FilterValuesType) => (
  { type: 'CHANGE-FILTER', todoListId, newFilter } as const);
export const changeTitleTodoListAC = (todoListId: string, newTitle: string) => (
  { type: 'CHANGE-TODOLIST-TITLE', todoListId, newTitle } as const);
export const setTodoListsAC = (todoLists: TodoListType[]) => ({ type: 'SET-TODOLISTS', payload: todoLists } as const);

export const setTodoListsTC = () => ((dispatch: Dispatch) => {
  todoListsApi.getTodolists()
    .then((res) => {
      dispatch(setTodoListsAC(res.data));
    });
});
export const addTodoListTC = (newTodoList: string) => ((dispatch: Dispatch) => {
  todoListsApi.postTodoList({ title: newTodoList })
    .then(() => dispatch(addTodoListAC(newTodoList)));
});
export const removeTodoListTC = (todoListId: string) => ((dispatch: Dispatch) => {
  todoListsApi.deleteTodoList(todoListId)
    .then(() => dispatch(removeTodoListAC(todoListId)));
});
export const changeTitleTodoListTC = (todoListId: string, newTitle: string) => (
  (dispatch: Dispatch) => {
    todoListsApi.updateTodoList(todoListId, { title: newTitle })
      .then(() => dispatch(changeTitleTodoListAC(todoListId, newTitle)));
  }
);




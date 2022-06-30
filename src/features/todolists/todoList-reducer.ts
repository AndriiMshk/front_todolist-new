import { FilterValuesType, TodoListType, TodoListTypeAPI } from '../../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../../api/API';
import { setStatusAC, SetStatusACType } from '../../app/app-reducer';

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>

type ActionsType =
  | ReturnType<typeof changeFilterTodoListAC>
  | ReturnType<typeof changeTitleTodoListAC>
  | RemoveTodoListACType
  | AddTodoListACType
  | SetTodoListsACType

const initialState: TodoListType[] = [];

export const todoListReducer = (state: TodoListType[] = initialState, action: ActionsType):
  TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'ADD-TODOLIST':
      return [{ ...action.todoList, filter: 'all', status: 'idle' }, ...state];
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

export const removeTodoListAC = (todoListId: string) => (
  { type: 'REMOVE-TODOLIST', todoListId } as const);
export const addTodoListAC = (todoList: TodoListTypeAPI) => (
  { type: 'ADD-TODOLIST', todoList } as const);
export const changeFilterTodoListAC = (todoListId: string, newFilter: FilterValuesType) => (
  { type: 'CHANGE-FILTER', todoListId, newFilter } as const);
export const changeTitleTodoListAC = (todoListId: string, newTitle: string) => (
  { type: 'CHANGE-TODOLIST-TITLE', todoListId, newTitle } as const);
export const setTodoListsAC = (todoLists: TodoListType[]) => ({
  type: 'SET-TODOLISTS',
  payload: todoLists,
} as const);

export const setTodoListsTC = () => ((dispatch: Dispatch<ActionsType | SetStatusACType>) => {
  dispatch(setStatusAC('loading'));
  todoListsApi.getTodolists()
    .then(res => {
      dispatch(setTodoListsAC(res.data));
      dispatch(setStatusAC('succeeded'));
    });
});
export const removeTodoListTC = (todoListId: string) => ((dispatch: Dispatch<ActionsType | SetStatusACType>) => {
  dispatch(setStatusAC('loading'));
  todoListsApi.deleteTodoList(todoListId)
    .then(() => {
      dispatch(removeTodoListAC(todoListId));
      dispatch(setStatusAC('succeeded'));
    });
});
export const addTodoListTC = (title: string) => ((dispatch: Dispatch<ActionsType | SetStatusACType>) => {
  dispatch(setStatusAC('loading'));
  todoListsApi.postTodoList({ title })
    .then(res => {
      dispatch(addTodoListAC(res.data.data.item));
      dispatch(setStatusAC('succeeded'));
    });
});
export const changeTitleTodoListTC = (todoListId: string, title: string) => (
  (dispatch: Dispatch<ActionsType | SetStatusACType>) => {
    dispatch(setStatusAC('loading'));
    todoListsApi.updateTodoList(todoListId, { title })
      .then(() => {
        dispatch(changeTitleTodoListAC(todoListId, title));
        dispatch(setStatusAC('succeeded'));
      });
  }
);





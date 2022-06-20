import { FilterValuesType, TodolistsType, TodoListsTypeAPI } from '../App';
import { v1 } from 'uuid';
import { Dispatch } from 'redux';
import { todoListsAPI } from '../todoList-api-test/api/todolists-api';

export type AddTodoListActionType = ReturnType<typeof addTodoLIstAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoLIstAC>
// type ChangeFilterActionType = ReturnType<typeof changeFilterTodoLIstAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTitleTodoLIstAC>

type getTodoListsActionType = ReturnType<typeof getTodoListsAC>

type ActionsType =
  RemoveTodoListActionType
  | AddTodoListActionType
  // | ChangeFilterActionType
  | ChangeTodoListTitleActionType
  | getTodoListsActionType

const initialState: TodoListsTypeAPI[] = [];

export const todoListReducer = (state: TodoListsTypeAPI[] = initialState, action: ActionsType): TodoListsTypeAPI[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'ADD-TODOLIST':
      return [{ id: action.todoListId, title: action.newTitle, addedDate: action.addedDate, order: action.order}, ...state];
    // case 'CHANGE-FILTER':
    //   return state.map(el => el.id === action.todolistId
    //     ? { ...el, filter: action.newFilter }
    //     : el);
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(el => el.id === action.todolistId
        ? { ...el, title: action.newTitle }
        : el);
    case 'SET-TODOLISTS':
      return  state = action.payload
    default:
      return state;
  }
};

export const removeTodoLIstAC = (todoListId: string) => {
  return { type: 'REMOVE-TODOLIST', todoListId: todoListId } as const;
};
export const addTodoLIstAC = (newTitle: string) => {
  return { type: 'ADD-TODOLIST', todoListId: v1(), newTitle: newTitle, addedDate: '1', order: 0 } as const;
};
// export const changeFilterTodoLIstAC = (todolistId: string, newFilter: FilterValuesType) => {
//   return { type: 'CHANGE-FILTER', todolistId: todolistId, newFilter: newFilter } as const;
// };
export const changeTitleTodoLIstAC = (todolistId: string, newTitle: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  todolistId: todolistId,
  newTitle: newTitle,
} as const);

export const getTodoListsAC = (todolistsArray: TodoListsTypeAPI[]) => ({
  type: 'SET-TODOLISTS', payload: todolistsArray,
} as const);


/*

  id: string
  addedDate: string
  order: number
  title: string



export const unFollowTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(followingInProgressAC(userId, true));
    usersAPI.unFollowDeleteRequest(userId)
      .then((data) => {
        console.log(data);
        if (data.resultCode === 0) {
          dispatch(unFollowAC(userId));
        }
        dispatch(followingInProgressAC(userId, false));
      });
  };
};
*/
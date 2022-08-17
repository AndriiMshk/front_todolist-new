import { FilterValuesType, TodoListType } from '../../../api/typesAPI';

const initialState: TodoListType[] = [];

export const todoListReducer = (state: TodoListType[] = initialState, action: TodoListsActionsType): TodoListType[] => {
  switch (action.type) {
    case 'TODOLIST/REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'TODOLIST/ADD-TODOLIST':
      return [{ ...action.todoList, filter: FilterValuesType.all, isDisabled: false }, ...state];
    case 'TODOLIST/UPDATE-TODOLIST':
      return state.map(el => el.id === action.todoListId
        ? { ...el, ...action.todoListModel }
        : el);
    case 'TODOLIST/SET-TODOLISTS':
      return action.payload.map(el => ({ ...el, filter: FilterValuesType.all, isDisabled: false }));
    default:
      return state;
  }
};

const removeTodoListAC = (todoListId: string) => ({ type: 'TODOLIST/REMOVE-TODOLIST', todoListId } as const);
const addTodoListAC = (todoList: TodoListType) => ({ type: 'TODOLIST/ADD-TODOLIST', todoList } as const);
const setTodoListsAC = (todoLists: TodoListType[]) =>
  ({ type: 'TODOLIST/SET-TODOLISTS', payload: todoLists } as const);
const updateTodoListAC = (todoListId: string, todoListModel: UpdateTodoListModelType) => (
  { type: 'TODOLIST/UPDATE-TODOLIST', todoListId, todoListModel } as const
);

export const todoListActions = {
  removeTodoListAC,
  addTodoListAC,
  setTodoListsAC,
  updateTodoListAC,
};

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>

export type TodoListsActionsType =
  | RemoveTodoListACType
  | AddTodoListACType
  | SetTodoListsACType
  | ReturnType<typeof updateTodoListAC>

export type UpdateTodoListModelType = {
  title?: string
  order?: number
  filter?: FilterValuesType
  isDisabled?: boolean
}





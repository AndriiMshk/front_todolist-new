import { TasksType } from '../App';
import { v1 } from 'uuid';
import { AddTodoListActionType, RemoveTodoListActionType, todolistID1, todolistID2 } from './todoList-reducer';

type DeleteTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskCheckboxActionType = ReturnType<typeof changeTaskCheckboxAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
  DeleteTaskActionType
  | ChangeTaskCheckboxActionType
  | AddTaskActionType
  | ChangeTaskTitle
  | AddTodoListActionType
  | RemoveTodoListActionType

const initialState: TasksType = {
  [todolistID1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todolistID2]: [
    { id: v1(), title: 'q', isDone: false },
    { id: v1(), title: 'qw', isDone: false },
    { id: v1(), title: 'qwe', isDone: false },
    { id: v1(), title: 'qwer', isDone: false },
    { id: v1(), title: 'qwert', isDone: false },
  ],
};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return { ...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId) };
    case 'CHANGE-TASK-CHECKBOX':
      return {
        ...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, isDone: action.isCheck }
          : el),
      };
    case 'ADD-TASK':
      return {
        ...state,
        [action.todoListId]: [{ id: v1(), title: action.newTaskTitle, isDone: false }, ...state[action.todoListId]],
      };
    case 'CHANGE-TASK-TITLE':
      return {
        ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
          ? { ...el, title: action.newTaskTitle }
          : el),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todoListId]: [] };
    case 'REMOVE-TODOLIST':
      const copy = { ...state };
      delete copy[action.todoListId];
      return copy;
    default:
      return state;
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return { type: 'DELETE-TASK', todoListId: todoListId, taskId: taskId } as const;
};
export const changeTaskCheckboxAC = (todoListId: string, taskId: string, isCheck: boolean) => {
  return { type: 'CHANGE-TASK-CHECKBOX', todoListId: todoListId, taskId: taskId, isCheck: isCheck } as const;
};
export const addTaskAC = (todoListId: string, newTaskTitle: string) => {
  return { type: 'ADD-TASK', todoListId: todoListId, newTaskTitle: newTaskTitle } as const;
};
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTaskTitle: string) => {
  return { type: 'CHANGE-TASK-TITLE', todolistId: todoListId, taskId: taskId, newTaskTitle: newTaskTitle } as const;
};


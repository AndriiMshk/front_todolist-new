import { v1 } from 'uuid';
import { AddTodoListActionType, RemoveTodoListActionType } from './todoList-reducer';
import { TasksType, TaskTypePriority, TaskTypeStatus } from '../api/TypesAPI';

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

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId),
      };
    case 'CHANGE-TASK-CHECKBOX':
      let status = TaskTypeStatus.New;
      if (action.isCheck) {
        status = TaskTypeStatus.Completed;
      }
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, status: status }
          : el),
      };
    case 'ADD-TASK':
      return {
        ...state,
        [action.todoListId]: [
          {
            todoListId: action.todoListId,
            id: v1(),
            title: action.newTaskTitle,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: '',
            order: 0,
            priority: TaskTypePriority.Low,
            status: TaskTypeStatus.New,
          }, ...state[action.todoListId]],
      };
    case 'CHANGE-TASK-TITLE':
      return {
        ...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
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
  return { type: 'CHANGE-TASK-TITLE', todoListId: todoListId, taskId: taskId, newTaskTitle: newTaskTitle } as const;
};


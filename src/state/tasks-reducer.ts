import { TasksType, TasksTypeAPI } from '../App';
import { v1 } from 'uuid';
import { AddTodoListActionType, RemoveTodoListActionType } from './todoList-reducer';

type DeleteTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskCheckboxActionType = ReturnType<typeof changeTaskCheckboxAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>

type GetTasksAActionType = ReturnType<typeof getTasksAC>

type ActionsType =
  DeleteTaskActionType
  | ChangeTaskCheckboxActionType
  | AddTaskActionType
  | ChangeTaskTitle
  | AddTodoListActionType
  | RemoveTodoListActionType
  | GetTasksAActionType

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return { ...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId) };
    // case 'CHANGE-TASK-CHECKBOX':
    //   return {
    //     ...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
    //       ? { ...el, isDone: action.isCheck }
    //       : el),
    //   };
    case 'ADD-TASK':
      const newTask = {
        id: v1(),
        title: action.newTaskTitle,
        description: '',
        completed: false,
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        todoListId: action.todoListId,
        order: 0,
        addedDate: ''
      }
      return {
        ...state,
        [action.todoListId]: [newTask, ...state[action.todoListId]],
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
    case 'SET-TASKS':
      return { ...state, [action.todoListId]: action.payload}
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

export const getTasksAC = (todoListId: string, tasks: TasksTypeAPI[]) => ({
  type: 'SET-TASKS', todoListId: todoListId, payload: tasks
} as const);


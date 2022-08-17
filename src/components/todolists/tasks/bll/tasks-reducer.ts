import { AddTodoListACType, RemoveTodoListACType, SetTodoListsACType } from '../../bll/todoList-reducer';
import { TasksType, TaskTypeAPI, TaskTypePriority, TaskTypeStatus } from '../../../../api/typesAPI';

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case 'TASK/DELETE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId),
      };
    case 'TASK/ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [{ ...action.task, isDisabled: false }, ...state[action.task.todoListId]],
      };
    case 'TASK/UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, ...action.taskModel }
          : el),
      };
    case 'TODOLIST/ADD-TODOLIST':
      return { ...state, [action.todoList.id]: [] };
    case 'TODOLIST/REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.todoListId];
      return copyState;
    }
    case 'TODOLIST/SET-TODOLISTS': {
      const copyState = { ...state };
      action.payload.forEach(el => {copyState[el.id] = [];});
      return copyState;
    }
    case 'TASK/SET-TASKS':
      return { ...state, [action.todoListId]: action.tasks };

    default:
      return state;
  }
};

const removeTaskAC = (todoListId: string, taskId: string) =>
  ({ type: 'TASK/DELETE-TASK', todoListId, taskId } as const);
const addTaskAC = (task: TaskTypeAPI) => ({ type: 'TASK/ADD-TASK', task } as const);
const setTasksAC = (todoListId: string, tasks: any) => ({ type: 'TASK/SET-TASKS', todoListId, tasks } as const);
const updateTaskAC = (todoListId: string, taskId: string, taskModel: UpdateTaskModelType) =>
  ({ type: 'TASK/UPDATE-TASK', todoListId, taskId, taskModel } as const);

export const tasksActions = {
  setTasksAC,
  addTaskAC,
  removeTaskAC,
  updateTaskAC
}

export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodoListACType
  | RemoveTodoListACType
  | SetTodoListsACType

export type UpdateTaskModelType = {
  title?: string
  deadline?: string
  startDate?: string
  description?: string
  priority?: TaskTypePriority
  status?: TaskTypeStatus
  isDisabled?: boolean
}




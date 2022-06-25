import { v1 } from 'uuid';
import { AddTodoListActionType, RemoveTodoListActionType, setTodoListsACType } from './todoList-reducer';
import { TasksType, TaskTypePriority, TaskTypeStatus } from '../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../api/API';

type DeleteTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskCheckboxActionType = ReturnType<typeof changeTaskCheckboxAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>

type setTasksACType = ReturnType<typeof setTasksAC>

type ActionsType =
  DeleteTaskActionType
  | ChangeTaskCheckboxActionType
  | AddTaskActionType
  | ChangeTaskTitle
  | AddTodoListActionType
  | RemoveTodoListActionType
  | setTodoListsACType
  | setTasksACType

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
    case 'SET-TODOLISTS':
      const copy1 = { ...state };
      action.payload.forEach(el => {copy1[el.id] = [];});
      return copy1;
    case 'SET-TASKS':
      const copy2 = { ...state };
      copy2[action.todoListId] = action.tasks;
      return copy2;
    default:
      return state;
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => (
  { type: 'DELETE-TASK', todoListId, taskId } as const);
export const changeTaskCheckboxAC = (todoListId: string, taskId: string, isCheck: boolean) => (
  { type: 'CHANGE-TASK-CHECKBOX', todoListId, taskId, isCheck } as const);
export const addTaskAC = (todoListId: string, newTaskTitle: string) => (
  { type: 'ADD-TASK', todoListId, newTaskTitle } as const);
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTaskTitle: string) => (
  { type: 'CHANGE-TASK-TITLE', todoListId, taskId, newTaskTitle } as const);
export const setTasksAC = (todoListId: string, tasks: any) => {
  return { type: 'SET-TASKS', todoListId, tasks } as const;
};

export const setTasksTC = (todoListId: string) => ((dispatch: Dispatch) => {
  todoListsApi.getTasks(todoListId)
    .then((res) => {
      dispatch(setTasksAC(todoListId, res.data.items));
    });
});
export const removeTaskTC = (todoListId: string, taskId: string) => (
  (dispatch: Dispatch) => {
    todoListsApi.deleteTask(todoListId, taskId)
      .then(() => dispatch(removeTaskAC(todoListId, taskId)));
  }
);
export const addTaskTC = (todoListId: string, newTaskTitle: string) => (
  (dispatch: Dispatch) => {
    todoListsApi.postTask(todoListId, { title: newTaskTitle })
      .then(() => dispatch(addTaskAC(todoListId, newTaskTitle)));
  }
);
export const changeTaskTitleTC = (todoListId: string, taskId: string, newTaskTitle: string) => (
  (dispatch: Dispatch) => {
    todoListsApi.updateTask(todoListId, taskId, { title: newTaskTitle })
      .then(() => dispatch(changeTaskTitleAC(todoListId, taskId, newTaskTitle)));
  }
);
export const changeTaskCheckboxTC = (todoListId: string, taskId: string, isCheck: boolean) => (
  (dispatch: Dispatch) => {
    let status = TaskTypeStatus.New;
    if (isCheck) {
      status = TaskTypeStatus.Completed;
    }
    todoListsApi.changeTaskStatus(todoListId, taskId, { status: status })
      .then(() => dispatch(changeTaskCheckboxAC(todoListId, taskId, isCheck)));
  }
);


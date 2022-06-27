import { AddTodoListACType, RemoveTodoListACType, setTodoListsACType } from './todoList-reducer';
import { TasksType, TaskTypeAPI, TaskTypePriority, TaskTypeStatus } from '../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../api/API';
import { RootType } from './store';

type DeleteTaskACTType = ReturnType<typeof removeTaskAC>
type AddTaskACTType = ReturnType<typeof addTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

type ActionsType =
  DeleteTaskACTType
  | AddTaskACTType
  | AddTodoListACType
  | RemoveTodoListACType
  | setTodoListsACType
  | setTasksACType
  | updateTaskACType

export type updateTaskModelType = {
  title?: string
  deadline?: string
  startDate?: string
  description?: string
  priority?: TaskTypePriority
  status?: TaskTypeStatus
}

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId),
      };
    case 'ADD-TASK':
      return { ...state, [action.task.todoListId]: [{ ...action.task }, ...state[action.task.todoListId]] };
    case 'UPDATE-TASK':
      return {
        ...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, ...action.taskModel }
          : el),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todoList.id]: [] };
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
export const addTaskAC = (task: TaskTypeAPI) => ({ type: 'ADD-TASK', task } as const);
export const setTasksAC = (todoListId: string, tasks: any) => ({ type: 'SET-TASKS', todoListId, tasks } as const);
const updateTaskAC = (todoListId: string, taskId: string, taskModel: updateTaskModelType) => (
  { type: 'UPDATE-TASK', todoListId, taskId, taskModel } as const
);
export const setTasksTC = (todoListId: string) => ((dispatch: Dispatch) => {
  todoListsApi.getTasks(todoListId)
    .then(res => dispatch(setTasksAC(todoListId, res.data.items)));
});
export const removeTaskTC = (todoListId: string, taskId: string) => ((dispatch: Dispatch) => {
  todoListsApi.deleteTask(todoListId, taskId)
    .then(() => dispatch(removeTaskAC(todoListId, taskId)));
});
export const addTaskTC = (todoListId: string, newTaskTitle: string) => ((dispatch: Dispatch) => {
  todoListsApi.postTask(todoListId, { title: newTaskTitle })
    .then(res => dispatch(addTaskAC(res.data.data.item)));
});
export const updateTaskTC = (todoListId: string, taskId: string, taskModel: updateTaskModelType) => (
  ((dispatch: Dispatch, getState: () => RootType) => {
    const task = getState().tasks[todoListId].find(el => el.id === taskId);
    if (task) {
      todoListsApi.updateTask(todoListId, taskId, { ...task, ...taskModel })
        .then(() => {
          dispatch(updateTaskAC(todoListId, taskId, taskModel));
        });
    }
  }));



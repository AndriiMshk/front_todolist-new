import { v1 } from 'uuid';
import {
  addTaskAC,
  changeTaskCheckboxAC,
  changeTaskTitleAC,
  removeTaskAC, setTasksAC,
  tasksReducer,
} from '../state/tasks-reducer';
import { TasksType, TaskTypePriority, TaskTypeStatus, TodoListType } from '../api/TypesAPI';
import { setTodoListsAC } from '../state/todoList-reducer';

test('DELETE-TASK', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: TasksType = {
    [todolistID1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      }, {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
    [todolistID2]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
  };
  const endState = tasksReducer(startState, removeTaskAC(todolistID1, startState[todolistID1][0].id));

  expect(endState[todolistID1].length).toBe(startState[todolistID1].length - 1);
  expect(endState[todolistID2].length).toBe(startState[todolistID2].length);
  expect(endState[todolistID1].every(t => t.id !== startState[todolistID1][0].id)).toBeTruthy();
});
test('CHANGE-TASK-CHECKBOX', () => {

  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: TasksType = {
    [todolistID1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      }, {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
    [todolistID2]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
  };

  const endState = tasksReducer(startState, changeTaskCheckboxAC(todolistID2, startState[todolistID2][0].id, false));
  expect(endState[todolistID2][0].status).toBe(TaskTypeStatus.New);
});
test('ADD-TASK', () => {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let newTaskTitle = 'new';

  const startState: TasksType = {
    [todolistID1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      }, {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
    [todolistID2]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
  };

  const endState = tasksReducer(startState, addTaskAC(todolistID1, newTaskTitle));
  expect(endState[todolistID1].length).toBe(startState[todolistID1].length + 1);
  expect(endState[todolistID1][0].title).toBe(newTaskTitle);
});
test('CHANGE-TASK-TITLE', () => {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let newTaskTitle = 'new';

  const startState: TasksType = {
    [todolistID1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      }, {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
    [todolistID2]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
  };

  const endState = tasksReducer(startState,
    changeTaskTitleAC(todolistID1, startState[todolistID1][1].id, newTaskTitle));

  expect(endState[todolistID1].length).toBe(startState[todolistID1].length);
  expect(endState[todolistID1][1].title).toBe(newTaskTitle);

});
test('SET-TODOLISTS', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  const todoLists: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];

  const endState = tasksReducer({}, setTodoListsAC(todoLists));

  expect(endState[todolistID1]).toBeDefined();
  expect(endState[todolistID2]).toStrictEqual([]);
});
test('SET-TASKS', () => {

  let todolistID1 = v1();

  const startState: TasksType = {
    [todolistID1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      }, {
        id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
        todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
        description: '', deadline: '', addedDate: '', order: 0,
      },
    ],
  };

  const action = setTasksAC(todolistID1, startState[todolistID1]);

  const endState = tasksReducer({ todolistID1: [] }, action);

  expect(endState[todolistID1].length).toBe(3);
});





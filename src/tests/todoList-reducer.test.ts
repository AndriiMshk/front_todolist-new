import { v1 } from 'uuid';
import {
  addTodoListAC,
  changeFilterTodoListAC,
  removeTodoListAC,
  todoListReducer,
  changeTitleTodoListAC,
  setTodoListsAC,
} from '../state/todoList-reducer';
import { FilterValuesType, TodoListType } from '../api/TypesAPI';

test('REMOVE-TODOLIST', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];
  const endState = todoListReducer(startState, removeTodoListAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});
test('ADD-TODOLIST', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodoListTitle = 'New';

  const startState: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];

  // const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle));
  //
  // expect(endState.length).toBe(3);
  // expect(endState[0].title).toBe(newTodoListTitle);
});
test('CHANGE-FILTER', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodoLIstFilter: FilterValuesType = 'active';

  const startState: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];

  const endState = todoListReducer(startState, changeFilterTodoListAC(todolistID1, newTodoLIstFilter));

  expect(endState[0].filter).toBe(newTodoLIstFilter);
});
test('CHANGE-TODOLIST-TITLE', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodoLIstTitle = 'NEW';

  const startState: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];

  const endState = todoListReducer(startState, changeTitleTodoListAC(todolistID1, newTodoLIstTitle));

  expect(endState[0].title).toBe(newTodoLIstTitle);
});

test('SET-TODOLISTS', () => {

  let todolistID1 = v1();
  let todolistID2 = v1();
  const startState: TodoListType[] = [];
  const newState: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];

  const endState = todoListReducer(startState, setTodoListsAC(newState));
  expect(endState.length).toBe(2);
});


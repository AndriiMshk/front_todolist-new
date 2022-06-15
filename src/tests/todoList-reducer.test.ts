import { v1 } from 'uuid';
import { addTodoLIstAC,
  changeFilterTodoLIstAC,
  removeTodoLIstAC,
  todoListReducer,
  changeTitleTodoLIstAC } from '../state/todoList-reducer';
import { FilterValuesType } from '../App';

test('REMOVE-TODOLIST', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ];
  const endState = todoListReducer(startState, removeTodoLIstAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});
test('ADD-TODOLIST', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodoListTitle = 'New';

  const startState = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todoListReducer(startState, addTodoLIstAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoListTitle);
});
test('CHANGE-FILTER', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodoLIstFilter: FilterValuesType = 'active';

  const startState = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todoListReducer(startState, changeFilterTodoLIstAC(todolistID1, newTodoLIstFilter));

  expect(endState[0].filter).toBe(newTodoLIstFilter);
});
test('CHANGE-TODOLIST-TITLE', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodoLIstTitle = 'NEW';

  const startState = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todoListReducer(startState, changeTitleTodoLIstAC(todolistID1, newTodoLIstTitle));

  expect(endState[0].title).toBe(newTodoLIstTitle);
});


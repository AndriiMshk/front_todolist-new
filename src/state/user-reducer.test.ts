import { userReducer } from './user-reducer';

test('INCREMENT-AGE', () => {
  const startState = { age: 20, children: 2, name: 'qqq' };
  const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

  expect(endState.age).toBe(21);
  expect(endState.children).toBe(2);
});

test('INCREMENT-CHILDREN', () => {
  const startState = { age: 20, children: 2, name: 'qqq' };
  const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN' });

  expect(endState.age).toBe(20);
  expect(endState.children).toBe(3);
});

test('CHANGE-NAME', () => {
  const startState = { age: 20, children: 2, name: 'qqq' };
  const newName = 'www';
  const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName });

  expect(endState.name).toBe(newName);
  expect(endState.age).toBe(20);
  expect(endState.children).toBe(2);
});


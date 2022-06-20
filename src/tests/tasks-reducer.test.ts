import { v1 } from 'uuid';
import {
  addTaskAC,
  changeTaskCheckboxAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from '../state/tasks-reducer';


// test('DELETE-TASK', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   const startState = {
//     [todolistID1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//       { id: v1(), title: 'Rest API', isDone: false },
//       { id: v1(), title: 'GraphQL', isDone: false },
//     ],
//     [todolistID2]: [
//       { id: v1(), title: 'q', isDone: true },
//       { id: v1(), title: 'qw', isDone: true },
//       { id: v1(), title: 'qwe', isDone: false },
//       { id: v1(), title: 'qwer', isDone: false },
//       { id: v1(), title: 'qwert', isDone: false },
//     ],
//   };
//   const endState = tasksReducer(startState, removeTaskAC(todolistID1, startState[todolistID1][0].id));
//
//   expect(endState[todolistID1].length).toBe(startState[todolistID1].length - 1);
//   expect(endState[todolistID2].length).toBe(startState[todolistID2].length);
//   expect(endState[todolistID1].every(t => t.id !== startState[todolistID1][0].id)).toBeTruthy()
// });
// test('CHANGE-TASK-CHECKBOX', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   const startState = {
//     [todolistID1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//       { id: v1(), title: 'Rest API', isDone: false },
//       { id: v1(), title: 'GraphQL', isDone: false },
//     ],
//     [todolistID2]: [
//       { id: v1(), title: 'q', isDone: true },
//       { id: v1(), title: 'qw', isDone: true },
//       { id: v1(), title: 'qwe', isDone: false },
//       { id: v1(), title: 'qwer', isDone: false },
//       { id: v1(), title: 'qwert', isDone: false },
//     ],
//   };
//
//   const endState = tasksReducer(startState, changeTaskCheckboxAC(todolistID2, startState[todolistID2][0].id, false));
//   expect(endState[todolistID2][0].isDone).toBe(!startState[todolistID2][0].isDone);
// });
// test('ADD-TASK', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   let newTaskTitle = 'new';
//
//   const startState = {
//     [todolistID1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//       { id: v1(), title: 'Rest API', isDone: false },
//       { id: v1(), title: 'GraphQL', isDone: false },
//     ],
//     [todolistID2]: [
//       { id: v1(), title: 'q', isDone: true },
//       { id: v1(), title: 'qw', isDone: true },
//       { id: v1(), title: 'qwe', isDone: false },
//       { id: v1(), title: 'qwer', isDone: false },
//       { id: v1(), title: 'qwert', isDone: false },
//     ],
//   };
//
//   const endState = tasksReducer(startState, addTaskAC(todolistID1, newTaskTitle));
//   expect(endState[todolistID1].length).toBe(startState[todolistID1].length + 1);
//   expect(endState[todolistID1][0].title).toBe(newTaskTitle);
// });
// test('CHANGE-TASK-TITLE', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   let newTaskTitle = 'new';
//
//   const startState = {
//     [todolistID1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//       { id: v1(), title: 'Rest API', isDone: false },
//       { id: v1(), title: 'GraphQL', isDone: false },
//     ],
//     [todolistID2]: [
//       { id: v1(), title: 'q', isDone: true },
//       { id: v1(), title: 'qw', isDone: true },
//       { id: v1(), title: 'qwe', isDone: false },
//       { id: v1(), title: 'qwer', isDone: false },
//       { id: v1(), title: 'qwert', isDone: false },
//     ],
//   };
//
//   const endState = tasksReducer(startState, changeTaskTitleAC(todolistID1, startState[todolistID1][1].id, newTaskTitle));
//
//   expect(endState[todolistID1].length).toBe(startState[todolistID1].length);
//   expect(endState[todolistID1][1].title).toBe(newTaskTitle);
//
// });





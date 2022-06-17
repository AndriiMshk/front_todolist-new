export type TestTodoListType = {
  id: string
  title: string | null
  addedDate: string
  order: number
}
export type TestTaskType = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: number
  startDate: string
  status: number
  title: string | null
  todoListId: string
}

export type TestTodoListComponentPropsType = {
  todoList: TestTodoListType
  deleteTodoList: (todoListId: string, todoListTitle: string | null) => void
  updateTodoList: (todoListId: string, todoListTitle: string | null) => void
}
export type TestTasksComponentPropsType = {
  todoListId: string
}
export type TestTaskComponentPropsType = {
  task: TestTaskType
  deleteTask: (taskId: string, taskTitle: string | null) => void
  updateTask: (taskId: string, taskTitle: string | null) => void
}

export type ResponseGetTodoList = TestTodoListType[]
export type ResponsePostTodoList = {
  resultCode: number
  messages: string[]
  data: { item: TestTodoListType }
}
export type ResponseDeleteTodoList = {
  resultCode: number
  messages: string[]
  data: {}
}
export type ResponseUpdateTodoList = any ///!!!!!!!!!!
export type ResponseGetTask = any  /// !!!!!!!!!
export type ResponsePostTask = {
  resultCode: number
  messages: string[]
  data: {}
}
export type ResponseDeleteTask = {
  resultCode: number
  messages: string[]
  data: {}
}
export type ResponseUpdateTask = {
  resultCode: number
  messages: string[]
  data: {}
}

export type ResponseALLType<data = {}> = { // default {}
  resultCode: number
  messages: string[]
  data: data
}

//use generic for all types axios responses
// типизация потом ResponseALLType< описываешь потом только тип для data  >
// но типы нихуя не подходят сука!
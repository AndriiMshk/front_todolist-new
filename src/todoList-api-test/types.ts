export type TestTodoListType = {
  id: string
  title: string | null
  addedDate: string
  order: number
}
export type TestTaskType = {
  addedDate: string
  deadline: any
  description: any
  id: string
  order: number
  priority: number
  startDate: any
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

export type TodoListType = {
  id: string
  title: string | null
  filter: any
}
export type TaskType = {
  addedDate: string
  deadline: null
  description: null
  id: string
  order: number
  priority: number
  startDate: null
  status: number
  title: string | null
  todoListId: string
}

export type TodolistPropsType = {
  todoList: TodoListType
  deleteTodoList: (todoListId: string, todoListTitle: string | null) => void
  updateTodoList: (todoListId: string, todoListTitle: string | null) => void
}
export type TestTasksComponentPropsType = {
  todoListId: string
}
export type TestTaskComponentPropsType = {
  task: TaskType
  deleteTask: (taskId: string, taskTitle: string | null) => void
  updateTask: (taskId: string, taskTitle: string | null) => void
}

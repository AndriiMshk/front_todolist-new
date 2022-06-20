export type FilterValuesType = 'all' | 'active' | 'completed';

type TodoListTypeAPI = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodoListType = TodoListTypeAPI & {
  filter: FilterValuesType
}

export type TaskType = {
  todoListId: string
  id: string
  title: string

  addedDate: string
  deadline: string
  startDate: string
  description: string

  order: number
  priority: TaskTypePriority
  status: TaskTypeStatus
}

export type TasksType = {
  [key: string]: TaskType[]
}

export enum TaskTypeStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskTypePriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3
}

























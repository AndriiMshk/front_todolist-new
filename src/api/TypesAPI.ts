export enum AppStatusType {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed'
}

export enum FilterValuesType {
  all = 'all',
  active = 'active',
  completed = 'completed'
}

export type TodoListTypeAPI = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodoListType = TodoListTypeAPI & {
  filter: FilterValuesType
  status: AppStatusType
}

export type TaskTypeAPI = {
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
  isDisabled: boolean
}

export type TasksType = {
  [key: string]: TaskTypeAPI[]
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

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskTypeAPI[]
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

























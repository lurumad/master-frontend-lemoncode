import { Status, type Todo } from './domain'

export interface TodoApi {
  id: string
  text: string
  status: StatusApi
  createdAt: Date
}

export enum StatusApi {
  Pending = 'pending',
  Completed = 'completed',
}

export enum SortBy {
  Newest = 'newest',
  Oldest = 'oldest',
  Alphabetical = 'alphabetical',
}

export enum Filter {
  All = 'all',
  Pending = 'pending',
  Completed = 'completed',
}

export function mapTodoApiToTodo(todoApi: TodoApi): Todo {
  return {
    id: todoApi.id,
    text: todoApi.text,
    status: mapTodoApiStatusToStatus(todoApi.status),
    createdAt: new Date(todoApi.createdAt),
  }
}

export function mapTodoApiStatusToStatus(status: TodoApi['status']): Status {
  return status === StatusApi.Pending ? Status.Pending : Status.Completed
}

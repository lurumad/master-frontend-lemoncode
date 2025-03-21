import { StatusApi, type TodoApi } from './api'

export interface Todo {
  id: string
  text: string
  status: Status
  createdAt: Date
}

export enum Status {
  Pending = 'pending',
  Completed = 'completed',
}

export function mapTodoToTodoApi(todoApi: Todo): TodoApi {
  return {
    id: todoApi.id,
    text: todoApi.text,
    status: mapTodoStatusToStatusApi(todoApi.status),
    createdAt: new Date(todoApi.createdAt),
  }
}

export function mapTodoStatusToStatusApi(status: Todo['status']): StatusApi {
  return status === Status.Pending ? StatusApi.Pending : StatusApi.Completed
}

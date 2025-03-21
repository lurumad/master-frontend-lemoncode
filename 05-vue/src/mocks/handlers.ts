import { delay, http, HttpResponse } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { Filter, mapTodoApiStatusToStatus, SortBy, type TodoApi } from '../model/api'
import { mapTodoToTodoApi, Status, type Todo } from '@/model/domain'

let todos: Todo[] = [
  { id: uuidv4(), text: 'Study AWS certification', status: Status.Pending, createdAt: new Date() },
  {
    id: uuidv4(),
    text: 'Deploy Todo App',
    status: Status.Pending,
    createdAt: new Date('2025-01-01'),
  },
  {
    id: uuidv4(),
    text: 'Call my manager',
    status: Status.Completed,
    createdAt: new Date('2025-03-18'),
  },
]

export const handlers = [
  http.get('https://api.todos.com', async ({ request }) => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(500)
    }
    const url = new URL(request.url)
    const sort = url.searchParams.get('sort')
    const filter = url.searchParams.get('filter')

    if (sort === SortBy.Newest) {
      todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
    if (sort === SortBy.Oldest) {
      todos.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    }
    if (sort === SortBy.Alphabetical) {
      todos.sort((a, b) => a.text.localeCompare(b.text))
    }

    if (filter === Filter.Pending) {
      return HttpResponse.json(todos.filter((todo) => todo.status === Status.Pending))
    }
    if (filter === Filter.Completed) {
      return HttpResponse.json(todos.filter((todo) => todo.status === Status.Completed))
    }
    return HttpResponse.json(todos)
  }),
  http.post('https://api.todos.com', async ({ request }) => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(500)
    }
    const todo: TodoApi = (await request.json()) as TodoApi
    const newTodo: Todo = {
      id: uuidv4(),
      text: todo.text,
      status: Status.Pending,
      createdAt: new Date(),
    }
    todos.push(newTodo)
    return new Response(null, { status: 201 })
  }),
  http.patch('https://api.todos.com/completed', async () => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(100)
    }

    todos = todos.map((todo) =>
      todo.status === Status.Pending ? { ...todo, status: Status.Completed } : todo,
    )

    return new Response(null, { status: 204 })
  }),
  http.patch('https://api.todos.com/pending', async () => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(100)
    }

    todos = todos.map((todo) =>
      todo.status === Status.Completed ? { ...todo, status: Status.Pending } : todo,
    )

    return new Response(null, { status: 204 })
  }),
  http.patch('https://api.todos.com/:id', async ({ params, request }) => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(100)
    }
    const todo: TodoApi = (await request.json()) as TodoApi
    console.log('todo', todo)
    const index = todos.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return new Response(null, { status: 404 })
    }

    if ('status' in todo) {
      todos[index].status = mapTodoApiStatusToStatus(todo.status)
    }
    if ('text' in todo) {
      todos[index].text = todo.text
    }

    return HttpResponse.json(mapTodoToTodoApi(todos[index]))
  }),
  http.delete('https://api.todos.com/completed', async () => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(100)
    }

    todos = todos.filter((t) => t.status !== Status.Completed)

    return new Response(null, { status: 204 })
  }),
  http.delete('https://api.todos.com/:id', async ({ params }) => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(500)
    }
    const index = todos.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return new Response(null, { status: 404 })
    }
    todos.splice(index, 1)
    return new Response(null, { status: 204 })
  }),
]

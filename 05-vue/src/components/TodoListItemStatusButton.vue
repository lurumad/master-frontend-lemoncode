<script setup lang="ts">
import { Status, type Todo } from '@/model/domain'

const emit = defineEmits<{
  changeStatusTodo: [id: string, status: Status]
}>()

const changeStatusTodo = (id: string, status: Status) => {
  emit('changeStatusTodo', id, status)
}

defineProps<{
  todo: Todo
}>()
</script>

<template>
  <button
    v-if="todo.status === Status.Pending"
    @click="changeStatusTodo(todo.id, Status.Completed)"
    class="w-6 h-6 rounded-full border-2 border-primary-300 flex-shrink-0 hover:bg-primary-100 transition-colors cursor-pointer"
  ></button>
  <button
    v-if="todo.status === Status.Completed"
    @click="changeStatusTodo(todo.id, Status.Pending)"
    class="w-6 h-6 rounded-full bg-primary-400 flex-shrink-0 flex items-center justify-center cursor-pointer"
  >
    <i class="ri-check-line text-white text-sm"></i>
  </button>
</template>

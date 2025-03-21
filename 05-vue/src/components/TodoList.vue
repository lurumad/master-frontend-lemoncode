<script setup lang="ts">
import type { Todo } from '@/model/domain'
import { defineProps } from 'vue'
import TodoListItem from './TodoListItem.vue'

defineProps<{
  todos: Todo[]
}>()
</script>

<template>
  <div class="space-y-3 mb-8">
    <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>

  <!-- Edit Task Modal (hidden by default) -->
  <div class="hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
      <h3 class="text-xl font-bold text-black mb-4">Edit Task</h3>
      <form>
        <div class="mb-4">
          <label for="edit-task" class="block text-black/70 mb-2">Task Name</label>
          <input
            type="text"
            id="edit-task"
            value="Complete the project proposal"
            class="w-full px-4 py-3 rounded-lg bg-primary-50 text-black focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
          />
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="px-4 py-2 rounded-lg border border-primary-200 text-black">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-primary-500 text-white">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

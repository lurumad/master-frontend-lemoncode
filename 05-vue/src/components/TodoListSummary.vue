<script setup lang="ts">
import { Status, type Todo } from '@/model/domain'
import { computed } from 'vue'
import { useQueryClient, useMutation } from '@tanstack/vue-query'

const props = defineProps<{
  todos: Todo[]
}>()

const queryClient = useQueryClient()

const pendingTodos = computed(
  () => props.todos.filter((todo) => todo.status === Status.Pending).length,
)

const completedTodos = computed(() => props.todos.some((todo) => todo.status === Status.Completed))

const clearCompletedFn = async () => {
  const response = await fetch('https://api.todos.com/completed', {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to clear completed todos')
  }
}

const markAllCompleted = async () => {
  const response = await fetch('https://api.todos.com/completed', {
    method: 'PATCH',
  })

  if (!response.ok) {
    throw new Error('Failed to mark all todos as completed')
  }
}

const markAllPending = async () => {
  const response = await fetch('https://api.todos.com/pending', {
    method: 'PATCH',
  })

  if (!response.ok) {
    throw new Error('Failed to mark all todos as pending')
  }
}

const clearCompletedMutation = useMutation({
  mutationFn: clearCompletedFn,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

const markAllCompletedMutation = useMutation({
  mutationFn: markAllCompleted,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

const markAllPendingMutation = useMutation({
  mutationFn: markAllPending,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

const onClearCompleted = async () => {
  await clearCompletedMutation.mutateAsync()
}

const onMarkAllCompleted = async () => {
  await markAllCompletedMutation.mutateAsync()
}

const onMarkAllPending = async () => {
  await markAllPendingMutation.mutateAsync()
}
</script>

<template>
  <div class="flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
    <p class="text-black">
      <span class="font-medium">{{ pendingTodos }}</span> tasks left
    </p>
    <button
      @click="onMarkAllPending"
      class="text-black/70 hover:text-primary-500 text-sm font-medium cursor-pointer"
    >
      Mark as pending
    </button>
    <button
      @click="onMarkAllCompleted"
      class="text-black/70 hover:text-primary-500 text-sm font-medium cursor-pointer"
    >
      Mark as completed
    </button>
    <button
      @click="onClearCompleted"
      class="text-black/70 hover:text-primary-500 text-sm font-medium cursor-pointer"
      v-if="completedTodos"
    >
      Clear completed
    </button>
  </div>
</template>

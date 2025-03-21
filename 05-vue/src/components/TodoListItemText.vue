<script setup lang="ts">
import { type Todo, Status } from '@/model/domain'
import { useTimeAgo } from '@vueuse/core'
import { ref, nextTick } from 'vue'
import { useQueryClient, useMutation } from '@tanstack/vue-query'

const props = defineProps<{
  todo: Todo
}>()

const queryClient = useQueryClient()
const editing = ref(false)
const text = ref(props.todo.text)
const inputRef = ref<HTMLInputElement | null>(null)

const updateTextFn = async (text: string) => {
  const response = await fetch(`https://api.todos.com/${props.todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update todo')
  }
}

const updateTextMutation = useMutation({
  mutationFn: updateTextFn,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

const onEdit = () => {
  editing.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const onSaveEdit = async () => {
  await updateTextMutation.mutateAsync(text.value)
  editing.value = false
  text.value = text.value.trim()
}

const onCancelEdit = () => {
  editing.value = false
}
</script>

<template>
  <div class="flex-1" @dblclick="onEdit" v-if="!editing">
    <p class="text-black font-medium" :class="{ 'line-through': todo.status === Status.Completed }">
      {{ todo.text }}
    </p>
    <p class="text-black/60 text-sm">{{ useTimeAgo(todo.createdAt) }}</p>
  </div>
  <div class="flex-1" @dblclick="onEdit" v-if="editing">
    <input
      ref="inputRef"
      type="text"
      class="w-full px-4 py-3 rounded-lg bg-primary-50 text-black focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
      v-model="text"
      @keyup.enter="onSaveEdit"
      @blur="onCancelEdit"
    />
  </div>
</template>

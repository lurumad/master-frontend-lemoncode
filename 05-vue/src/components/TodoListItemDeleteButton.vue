<script setup lang="ts">
const emit = defineEmits<{
  deleteTodo: [id: string]
}>()

const deleteTodo = (id: string) => {
  emit('deleteTodo', id)
}

defineProps<{
  id: string
}>()
</script>

<template>
  <button
    class="p-2 text-black/70 hover:text-primary-500 transition-colors cursor-pointer"
    @click="deleteTodo(id)"
  >
    <i class="ri-delete-bin-line"></i>
  </button>
</template>

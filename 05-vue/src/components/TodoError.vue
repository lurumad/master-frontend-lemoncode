<template>
  <div class="flex flex-col items-center justify-center p-6 rounded-lg bg-red-50 border border-red-200">
    <div class="flex items-center space-x-3 mb-4">
      <svg
        class="w-6 h-6 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-red-800">{{ title }}</h3>
    </div>

    <p class="text-red-600 text-center mb-4">{{ message }}</p>

    <div v-if="isLoading" class="flex items-center space-x-2">
      <Spinner size="sm" class="text-red-500" />
      <span class="text-red-600">Retrying...</span>
    </div>

    <button
      v-else-if="showRetry"
      @click="$emit('retry')"
      class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors duration-200 flex items-center space-x-2"
    >
      <svg
        class="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      <span>Try Again</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import Spinner from './Spinner.vue'

interface Props {
  title?: string
  message: string
  showRetry?: boolean
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Error',
  showRetry: true,
  isLoading: false
})

defineEmits<{
  (e: 'retry'): void
}>()
</script>
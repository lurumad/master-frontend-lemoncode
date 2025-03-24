<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { toasts } = useToast();
</script>

<template>
  <div class="fixed right-10 bottom-10 flex flex-col gap-2 z-50">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="px-5 py-4 border-r-8 border-red-500 bg-white drop-shadow-lg"
    >
      <p class="text-sm">
        <span
          class="mr-2 inline-block px-3 py-1 rounded-full bg-red-500 text-white font-extrabold"
        >
          i
        </span>
        {{ toast.message }}
      </p>
    </div>
  </div>
</template>

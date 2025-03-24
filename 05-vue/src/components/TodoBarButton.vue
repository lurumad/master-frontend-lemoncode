<script setup lang="ts">
import { Filter } from "@/model/api";

defineProps<{
  text: string;
  filter: Filter;
  selectedFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}>();
</script>

<template>
  <button
    :class="{
      'bg-primary-500 text-white': selectedFilter === filter,
      'bg-white text-black border-primary-200': selectedFilter !== filter,
    }"
    class="px-3 py-2 rounded-lg text-sm border"
    @click="onFilterChange(filter)"
  >
    {{ text }}
  </button>
</template>

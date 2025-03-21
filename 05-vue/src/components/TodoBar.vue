<script setup lang="ts">
import { Filter, SortBy } from '@/model/api'
import { ref } from 'vue'

const selectedFilter = ref<Filter>(Filter.All)

const emit = defineEmits<{
  filter: [filter: Filter]
  sort: [order: string]
}>()

const onSortByChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('sort', target.value)
}

const onFilterChange = (filter: Filter) => {
  selectedFilter.value = filter
  emit('filter', filter)
}

const sortByOptions = [
  { label: 'Newest', value: SortBy.Newest },
  { label: 'Oldest', value: SortBy.Oldest },
  { label: 'A-Z', value: SortBy.Alphabetical },
]
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex gap-2">
        <button
          :class="{
            'bg-primary-500 text-white': selectedFilter === Filter.All,
            'bg-white text-black border-primary-200': selectedFilter !== Filter.All,
          }"
          class="px-3 py-2 rounded-lg text-sm border"
          @click="onFilterChange(Filter.All)"
        >
          All
        </button>
        <button
          :class="{
            'bg-primary-500 text-white': selectedFilter === Filter.Pending,
            'bg-white text-black border-primary-200': selectedFilter !== Filter.Pending,
          }"
          class="px-3 py-2 rounded-lg text-sm border"
          @click="onFilterChange(Filter.Pending)"
        >
          Pending
        </button>
        <button
          :class="{
            'bg-primary-500 text-white': selectedFilter === Filter.Completed,
            'bg-white text-black border-primary-200': selectedFilter !== Filter.Completed,
          }"
          class="px-3 py-2 rounded-lg text-sm border"
          @click="onFilterChange(Filter.Completed)"
        >
          Completed
        </button>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-black text-sm">Sort:</span>
        <select
          @change="onSortByChange"
          class="text-black text-sm bg-primary-50 border-none rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          <option v-for="option in sortByOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

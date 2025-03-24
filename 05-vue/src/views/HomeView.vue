<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { Filter, mapTodoApiToTodo, SortBy, type TodoApi } from "@/model/api";
import TodoHeader from "@/components/TodoHeader.vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoBar from "@/components/TodoBar.vue";
import TodoList from "@/components/TodoList.vue";
import TodoSpinner from "@/components/TodoSpinner.vue";
import TodoListEmpty from "@/components/TodoListEmpty.vue";
import TodoListSummary from "@/components/TodoListSummary.vue";
import type { Todo } from "@/model/domain";
import { useToast } from "@/composables/useToast";

const { toast } = useToast();
const selectedFilter = ref<Filter>(Filter.All);
const selectedSort = ref<SortBy>(SortBy.Newest);

const todosQuery = async (): Promise<Todo[]> => {
  return await fetch(
    `https://api.todos.com?filter=${selectedFilter.value}&sort=${selectedSort.value}`
  )
    .then((response) => {
      if (!response.ok) {
        toast("Failed to fetch todos");
      }
      return response;
    })
    .then((response) => response.json())
    .then((todos: TodoApi[]) => todos.map(mapTodoApiToTodo));
};

const { isPending, isLoading, isError, data } = useQuery({
  queryKey: ["todos", selectedFilter, selectedSort],
  queryFn: todosQuery,
});

const onSortByChange = (sortBy: string) => {
  selectedSort.value = sortBy as SortBy;
};

const onFilterChange = (filter: Filter) => {
  selectedFilter.value = filter;
};
</script>

<template>
  <main>
    <TodoHeader />
    <TodoForm />
    <TodoBar v-if="!isError" @sort="onSortByChange" @filter="onFilterChange" />
    <TodoSpinner v-if="isLoading" />
    <TodoList :todos="data ?? []" v-if="!isPending && !isError" />
    <TodoListEmpty v-if="!isPending && !isError && (data?.length ?? 0) === 0" />
    <TodoListSummary
      :todos="data ?? []"
      v-if="!isLoading && !isError && (data?.length ?? 0) > 0"
    />
  </main>
</template>

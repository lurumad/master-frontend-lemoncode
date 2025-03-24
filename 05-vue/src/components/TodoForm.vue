<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import { useToast } from "@/composables/useToast";

const queryClient = useQueryClient();
const { toast } = useToast();

const addTodoMutation = async () => {
  if (!todoInput.value.trim()) return null;
  const response = await fetch("https://api.todos.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: todoInput.value,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
};

const mutation = useMutation({
  mutationFn: addTodoMutation,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
  onError: (error) => {
    toast("Failed to add todo");
  },
});

const addTodo = async () => {
  await mutation.mutateAsync();
  todoInput.value = "";
};

const todoInput = ref("");
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
    <form
      id="todo-form"
      class="flex items-center gap-2"
      @submit.prevent="addTodo"
    >
      <input
        type="text"
        id="new-todo"
        placeholder="Add a new task..."
        v-model="todoInput"
        @click="addTodo"
        class="flex-1 px-4 py-3 rounded-lg bg-primary-50 text-black focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
      />
      <button
        class="bg-gradient-to-r from-primary-400 to-primary-500 text-white px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200"
      >
        <i class="ri-add-line"></i>
      </button>
    </form>
  </div>
</template>

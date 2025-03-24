<script setup lang="ts">
import { type Todo, Status } from "@/model/domain";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import TodoListItemStatusButton from "./TodoListItemStatusButton.vue";
import TodoListItemText from "./TodoListItemText.vue";
import TodoListItemDeleteButton from "./TodoListItemDeleteButton.vue";
import { useToast } from "@/composables/useToast";

const queryClient = useQueryClient();
const { toast } = useToast();

const changeStatusTodoFn = async ({
  id,
  status,
}: {
  id: string;
  status: Status;
}) => {
  const response = await fetch(`https://api.todos.com/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to complete todo");
  }
};

const deleteTodoFn = async (id: string) => {
  const response = await fetch(`https://api.todos.com/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

const changeStatusMutation = useMutation({
  mutationFn: changeStatusTodoFn,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
  onError: () => {
    toast("Failed to complete todo");
  },
});

const deleteTodoMutation = useMutation({
  mutationFn: deleteTodoFn,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
  onError: () => {
    toast("Failed to delete todo");
  },
});

const changeStatusTodo = async (id: string, status: Status) => {
  await changeStatusMutation.mutateAsync({ id, status });
};

const deleteTodo = async (id: string) => {
  await deleteTodoMutation.mutateAsync(id);
};

defineProps<{
  todo: Todo;
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-4 transition-all hover:shadow">
    <div class="flex items-center gap-3">
      <TodoListItemStatusButton
        :todo="todo"
        @changeStatusTodo="changeStatusTodo"
      />
      <TodoListItemText :todo="todo" />
      <div class="flex gap-1">
        <TodoListItemDeleteButton :id="todo.id" @deleteTodo="deleteTodo" />
      </div>
    </div>
  </div>
</template>

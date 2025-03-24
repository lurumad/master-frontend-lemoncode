<script setup lang="ts">
import { RouterView } from "vue-router";
import TodoToast from "./components/TodoToast.vue";
</script>

<template>
  <RouterView />
  <TodoToast />
</template>

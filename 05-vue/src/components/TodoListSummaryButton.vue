<script setup lang="ts">
interface Props {
  text: string;
  enabled?: boolean;
}

const emit = defineEmits<{
  (event: "click"): void;
}>();

const onClick = () => {
  emit("click");
};

withDefaults(defineProps<Props>(), {
  enabled: true,
});
</script>

<template>
  <button
    @click="onClick"
    class="text-black/70 hover:text-primary-500 text-sm font-medium cursor-pointer"
    v-if="enabled"
  >
    {{ text }}
  </button>
</template>

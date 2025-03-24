import { reactive } from "vue";

interface ToastOptions {
  message: string;
  duration: number;
}

const state = reactive({
  toasts: [] as ToastOptions[],
});
const toast = (message: string, duration: number = 3000) => {
  const toast = { message, duration };
  state.toasts.push(toast);
  setTimeout(() => {
    state.toasts.splice(state.toasts.indexOf(toast), 1);
  }, duration);
};

export const useToast = () => {
  return { toasts: state.toasts, toast };
};

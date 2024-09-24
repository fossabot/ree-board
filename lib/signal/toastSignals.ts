import { signal } from "@preact/signals-react";

// Toast type definition
export type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export const toasts = signal<Toast[]>([]);

const idGenerator = (function* () {
  let id = 0;
  while (true) {
    yield id++;
  }
})();

const createToast = (type: Toast["type"]) => (...messages: string[]): void => {
  const id = idGenerator.next().value;
  const message = messages.join(' ');
  toasts.value = [...toasts.value, { id, message, type }];
};

export const toast = {
  success: createToast("success"),
  error: createToast("error"),
  info: createToast("info"),
  warning: createToast("warning"),
};

export const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

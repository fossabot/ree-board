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

export const addToast = (message: string, type: Toast["type"]) => {
  const id = idGenerator.next().value;
  toasts.value = [...toasts.value, { id, message, type }];
};

export const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

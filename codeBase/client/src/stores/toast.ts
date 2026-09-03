import { create } from "zustand";

export type ToastStatus = "loading" | "success" | "error";

export interface Toast {
  id: string;
  status: ToastStatus;
  progress: number;
  message: string;
  onRetry?: () => void;
}

export interface AddToastInput {
  id: string;
  message: string;
  progress?: number;
  status?: ToastStatus;
  onRetry?: () => void;
}

export interface UpdateToastInput {
  progress?: number;
  status?: ToastStatus;
  message?: string;
  onRetry?: () => void;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: AddToastInput) => void;
  updateToast: (id: string, update: UpdateToastInput) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: ({ id, message, progress = 0, status = "loading", onRetry }) => {
    set((state) => {
      const existingIndex = state.toasts.findIndex((t) => t.id === id);
      const newToast: Toast = {
        id,
        message,
        progress: Math.min(100, Math.max(0, progress)),
        status,
        onRetry,
      };

      if (existingIndex !== -1) {
        const updated = [...state.toasts];
        updated[existingIndex] = newToast;
        return { toasts: updated };
      }

      return { toasts: [...state.toasts, newToast] };
    });
  },

  updateToast: (id, update) => {
    set((state) => ({
      toasts: state.toasts.map((toast) => {
        if (toast.id !== id) return toast;

        return {
          ...toast,
          ...update,
          progress:
            update.progress !== undefined
              ? Math.min(100, Math.max(0, update.progress))
              : toast.progress,
        };
      }),
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export const addToast = (toast: AddToastInput) =>
  useToastStore.getState().addToast(toast);

export const updateToast = (id: string, update: UpdateToastInput) =>
  useToastStore.getState().updateToast(id, update);

export const removeToast = (id: string) =>
  useToastStore.getState().removeToast(id);

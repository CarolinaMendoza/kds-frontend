// src/store/uiStore.ts
import { create } from "zustand";

type UIState = {
  isGlobalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
  _shownAt: number | null;
  _minMs: number;
  showLoading: (minMs?: number) => void;
  hideLoading: () => void;
  withLoading: <T>(p: Promise<T>) => Promise<T>;
  withLoadingMin: <T>(p: Promise<T>, minMs?: number) => Promise<T>;
};

export const useUIStore = create<UIState>((set, get) => ({
  isGlobalLoading: false,
  setGlobalLoading: (value) => set({ isGlobalLoading: value }),
  _shownAt: null,
  _minMs: 0,

  showLoading: (minMs = 0) => {
    set({ isGlobalLoading: true, _shownAt: Date.now(), _minMs: minMs });
  },

  hideLoading: () => {
    const { _shownAt, _minMs } = get();
    if (_shownAt == null) {
      set({ isGlobalLoading: false, _minMs: 0 });
      return;
    }
    const elapsed = Date.now() - _shownAt;
    const remain = Math.max(0, _minMs - elapsed);

    if (remain > 0) {
      setTimeout(() => set({ isGlobalLoading: false, _shownAt: null, _minMs: 0 }), remain);
    } else {
      set({ isGlobalLoading: false, _shownAt: null, _minMs: 0 });
    }
  },

  // Muestra loader, no garantiza mínimo visible
  withLoading: async <T,>(p: Promise<T>) => {
    const { showLoading, hideLoading } = get();
    showLoading(0);
    try {
      return await p;
    } finally {
      hideLoading();
    }
  },

  // Muestra loader con mínimo visible
  withLoadingMin: async <T,>(p: Promise<T>, minMs = 800) => {
    const { showLoading, hideLoading } = get();
    showLoading(minMs);
    try {
      return await p;
    } finally {
      hideLoading();
    }
  },
}));

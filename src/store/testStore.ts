import { create } from "zustand";
import type { Test } from "../types";

interface TestState {
  tests: Test[];
  currentTest: Test | null;
  setTests: (tests: Test[]) => void;
  setCurrentTest: (test: Test | null) => void;
  updateCurrentTest: (data: Partial<Test>) => void;
}

export const useTestStore = create<TestState>((set) => ({
  tests: [],
  currentTest: null,

  setTests: (tests) => set({ tests }),

  setCurrentTest: (test) => set({ currentTest: test }),

  updateCurrentTest: (data) =>
    set((state) => ({
      currentTest: state.currentTest ? { ...state.currentTest, ...data } : null,
    })),
}));

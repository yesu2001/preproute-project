import { create } from "zustand";
import type { Question } from "../types";

interface QuestionState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
  removeQuestion: (index: number) => void;
  clearQuestions: () => void;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],

  setQuestions: (questions) => set({ questions }),

  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),

  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),

  clearQuestions: () => set({ questions: [] }),
}));

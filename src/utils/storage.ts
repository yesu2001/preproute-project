import type { Test, Question } from "../types";

const KEYS = {
  tests: "preproute_tests",
  questions: "preproute_questions",
};

// --- TESTS ---

export const getStoredTests = (): Test[] => {
  try {
    const data = localStorage.getItem(KEYS.tests);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTest = (test: Test): Test => {
  const tests = getStoredTests();
  const existing = tests.findIndex((t) => t.id === test.id);
  if (existing >= 0) {
    tests[existing] = test;
  } else {
    tests.push(test);
  }
  localStorage.setItem(KEYS.tests, JSON.stringify(tests));
  return test;
};

export const deleteTest = (id: string): void => {
  const tests = getStoredTests().filter((t) => t.id !== id);
  localStorage.setItem(KEYS.tests, JSON.stringify(tests));
};

export const getTestById = (id: string): Test | null => {
  return getStoredTests().find((t) => t.id === id) ?? null;
};

// --- QUESTIONS ---

export const getStoredQuestions = (testId: string): Question[] => {
  try {
    const data = localStorage.getItem(`${KEYS.questions}_${testId}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveQuestions = (testId: string, questions: Question[]): void => {
  localStorage.setItem(
    `${KEYS.questions}_${testId}`,
    JSON.stringify(questions),
  );
};

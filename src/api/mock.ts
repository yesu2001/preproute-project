import type { Subject, Topic, SubTopic, Test, Question } from "../types";

export const mockToken = "mock-jwt-token-123";

export const mockUser = {
  id: "user-1",
  userId: "vedant-admin",
};

export const mockSubjects: Subject[] = [
  { id: "sub-1", name: "Mathematics" },
  { id: "sub-2", name: "English" },
  { id: "sub-3", name: "General Test" },
];

export const mockTopics: Record<string, Topic[]> = {
  "sub-1": [
    { id: "top-1", name: "Algebra", subject_id: "sub-1" },
    { id: "top-2", name: "Geometry", subject_id: "sub-1" },
    { id: "top-3", name: "Calculus", subject_id: "sub-1" },
  ],
  "sub-2": [
    { id: "top-4", name: "Reading Comprehension", subject_id: "sub-2" },
    { id: "top-5", name: "Grammar", subject_id: "sub-2" },
  ],
  "sub-3": [
    { id: "top-6", name: "Logical Reasoning", subject_id: "sub-3" },
    { id: "top-7", name: "Quantitative Aptitude", subject_id: "sub-3" },
  ],
};

export const mockSubTopics: Record<string, SubTopic[]> = {
  "top-1": [
    { id: "st-1", name: "Linear Equations", topic_id: "top-1" },
    { id: "st-2", name: "Quadratic Equations", topic_id: "top-1" },
  ],
  "top-2": [
    { id: "st-3", name: "Triangles", topic_id: "top-2" },
    { id: "st-4", name: "Circles", topic_id: "top-2" },
  ],
  "top-3": [
    { id: "st-5", name: "Differentiation", topic_id: "top-3" },
    { id: "st-6", name: "Integration", topic_id: "top-3" },
  ],
  "top-4": [{ id: "st-7", name: "Passage Analysis", topic_id: "top-4" }],
  "top-5": [
    { id: "st-8", name: "Tenses", topic_id: "top-5" },
    { id: "st-9", name: "Prepositions", topic_id: "top-5" },
  ],
  "top-6": [{ id: "st-10", name: "Syllogisms", topic_id: "top-6" }],
  "top-7": [{ id: "st-11", name: "Percentages", topic_id: "top-7" }],
};

export const mockTests: Test[] = [
  {
    id: "test-1",
    name: "Mathematics Mock Test 1",
    type: "practice",
    subject: "Mathematics",
    topics: ["Algebra", "Geometry"],
    difficulty: "medium",
    correct_marks: 4,
    wrong_marks: -1,
    unattempt_marks: 0,
    total_time: 60,
    total_marks: 200,
    total_questions: 50,
    status: "draft",
    created_at: "2025-06-01T10:00:00Z",
    questions: ["q-1", "q-2"],
  },
  {
    id: "test-2",
    name: "English Full Test",
    type: "full",
    subject: "English",
    topics: ["Reading Comprehension"],
    difficulty: "easy",
    correct_marks: 2,
    wrong_marks: 0,
    unattempt_marks: 0,
    total_time: 45,
    total_marks: 100,
    total_questions: 50,
    status: "live",
    created_at: "2025-06-02T08:00:00Z",
    questions: ["q-3"],
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q-1",
    type: "mcq",
    question: "What is the value of x in 2x + 4 = 10?",
    option1: "2",
    option2: "3",
    option3: "4",
    option4: "5",
    correct_option: "option2",
    explanation: "2x = 6, so x = 3",
    difficulty: "easy",
    test_id: "test-1",
  },
  {
    id: "q-2",
    type: "mcq",
    question: "What is the area of a circle with radius 7?",
    option1: "154",
    option2: "144",
    option3: "164",
    option4: "174",
    correct_option: "option1",
    explanation: "Area = πr² = 22/7 × 49 = 154",
    difficulty: "medium",
    test_id: "test-1",
  },
];

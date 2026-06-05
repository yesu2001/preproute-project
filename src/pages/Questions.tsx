import React, { useState } from "react";
import {
  Bell,
  Layers,
  Plus,
  ChevronDown,
  Trash2,
  Edit,
  Bold,
  Italic,
  Underline,
  Link2,
  Image,
  FileSpreadsheet,
  ChevronLeft,
  Pen,
  Timer,
  FileQuestionMark,
  ChartColumnBig,
  Edit2,
} from "lucide-react";

export default function AddQuestions() {
  // Master list of successfully added questions (Starts empty to enforce "Minimum 1 question" validation)
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Form state for the *current* question workspace matching all doc specs
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""], // Initialized with 4 default options
    correctOption: null, // Track index (0-3)
    explanation: "",
    difficulty: "Medium",
    topic: "",
    subTopic: "",
    mediaUrl: "",
  });

  // Track which question we are editing from the list (null means creating new)
  const [editingId, setEditingId] = useState(null);

  // Structural Input Handlers
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const resetForm = () => {
    setCurrentQuestion({
      text: "",
      options: ["", "", "", ""],
      correctOption: null,
      explanation: "",
      difficulty: "Medium",
      topic: "",
      subTopic: "",
      mediaUrl: "",
    });
    setEditingId(null);
    setErrorMessage("");
  };

  // Action: "Add Another Question" / Save Current to List
  const handleAddQuestionToList = () => {
    // Basic validation for individual question integrity
    if (!currentQuestion.text.trim()) {
      setErrorMessage("Question text cannot be blank.");
      return;
    }
    if (currentQuestion.options.some((opt) => !opt.trim())) {
      setErrorMessage("All 4 options must be completed.");
      return;
    }
    if (currentQuestion.correctOption === null) {
      setErrorMessage(
        "Please select the radio button corresponding to the correct option.",
      );
      return;
    }

    if (editingId !== null) {
      // Update action loop
      // setAddedQuestions(
      //   addedQuestions.map((q) =>
      //     q.id === editingId ? { ...currentQuestion, id: editingId } : q,
      //   ),
      // );
    } else {
      // Creation push loop
      // setAddedQuestions([
      //   ...addedQuestions,
      //   { ...currentQuestion, id: Date.now() },
      // ]);
    }

    resetForm();
  };

  // Action: Edit an already added question
  const handleEditQuestion = (question) => {
    setEditingId(question.id);
    setCurrentQuestion({ ...question });
  };

  // Action: Delete an already added question
  const handleDeleteQuestion = (id) => {
    setAddedQuestions(addedQuestions.filter((q) => q.id !== id));
  };

  // Action: Global "Save & Continue" Step Route Trigger
  const handleFinalSubmit = () => {
    if (addedQuestions.length === 0) {
      setErrorMessage(
        "Validation Error: A minimum of 1 question must be added before continuing.",
      );
      return;
    }
    // onSaveAndContinue(addedQuestions);
  };
  return (
    <div className="flex min-h-screen">
      {/* PERSISTENT SIDEBAR TRACKER */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-2 md:py-4">
        <div>
          <div className="px-4 py-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              <span>Question creation</span>
              <ChevronLeft
                size={16}
                className="text-slate-300 cursor-pointer"
              />
            </div>
            <div className="text-xs font-semibold text-slate-500 px-2 mb-4">
              Total Questions .{" "}
              <span className="text-slate-800 font-bold">50</span>
            </div>

            {/* Question Status Item Container Node Stack */}
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {addedQuestions.length === 0 ? (
                <div className="text-xs text-slate-400 italic p-4 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  No questions built yet. Complete the form to add one.
                </div>
              ) : (
                addedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="group flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:bg-white hover:border-blue-200"
                  >
                    <div className="text-xs font-medium text-slate-700 truncate max-w-[140px]">
                      <span className="font-bold text-blue-600 mr-1.5">
                        #{idx + 1}
                      </span>{" "}
                      {q.text || "(No Text Entry)"}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditQuestion(q)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-all"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-50">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-blue-200 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-50/30 transition-all">
            <Plus size={14} /> Add Question Slot
          </button>
        </div>
      </aside>

      {/* WORKSPACE VIEW PORT */}
      <main className="flex-1 flex flex-col">
        <div className="p-6 max-w-5xl w-full mx-auto flex-1 space-y-6">
          {/* TEST PARAMETERS CONFIG META BADGE CARD SUMMARY */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start justify-between shadow-sm relative">
            <div className="">
              <span className="bg-[#1E293B] text-white text-md font-semibold px-4 py-1 rounded-2xl">
                Chapter Wise
              </span>
              <div className="flex items-center gap-3 my-4">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 font-md">
                  <img
                    src="/src/assets/subject.png"
                    alt="Subject"
                    className="w-8 h-8"
                  />
                  Chapter 1
                </span>
                <span className="bg-[#2AB7A9] text-white border flex items-center gap-1 text-sm  px-4 py-1 rounded-lg">
                  <img
                    src="/src/assets/cognition.png"
                    alt="Subject"
                    className="w-5 h-5"
                  />
                  Easy
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-slate-400 flex items-center gap-1">
                  <div className="w-25 flex justify-between">
                    <p>Subject</p>
                    <p>:</p>
                  </div>
                  <span className="font-semibold text-slate-500 ml-1">
                    English
                  </span>
                </div>
                <div className="text-slate-400 flex items-center gap-1">
                  <div className="w-25 flex justify-between">
                    <p>Topic</p>
                    <p> :</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="inline-block px-2  text-amber-400 rounded-md ml-2 border border-amber-400">
                      Grammar
                    </span>
                    <span className="inline-block px-2 text-amber-400 rounded-md ml-1 border border-amber-400">
                      Writing
                    </span>
                  </div>
                </div>
                <div className="text-slate-400 flex items-center gap-1">
                  <div className="w-25 flex justify-between">
                    <p>Sub Topic</p>
                    <p> :</p>
                  </div>
                  <span className="inline-block px-2 text-sm text-amber-400 rounded-md ml-2 border border-amber-400">
                    Application
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Stats Pills Matrix */}
            <button className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Pen size={16} color="#7489FF" />
            </button>

            <div className="absolute bottom-5 right-5 flex items-center gap-1 border border-slate-200 p-1.5 rounded-lg text-xs text-slate-700">
              <div className="px-3 py-1.5 flex items-center gap-1">
                <Timer size={16} className="text-slate-300" /> 60 Min
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="px-4 py-1.5 flex items-center gap-1">
                <FileQuestionMark size={16} className="text-slate-300" /> 50 Q's
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="px-3 py-1.5 flex items-center gap-1">
                <ChartColumnBig size={16} className="text-slate-300" /> 250
                Marks
              </div>
            </div>
          </div>

          <div className="space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <h3 className="text-base font-semibold text-slate-800">
                Question 4<span className="text-slate-400">/50</span>
              </h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-semibold">
                MCQ Format
              </span>
            </div>

            {/* FIELD 1: QUESTION TEXT */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                <span>
                  Question Text <span className="text-rose-500">*</span>
                </span>
              </label>
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="px-4 py-2 border-b border-slate-200 flex items-center gap-1 text-slate-400">
                  <Bold size={14} />
                  <Italic size={14} />
                  <Underline size={14} />
                  <div className="w-px h-4 bg-slate-200 mx-2"></div>
                  <Link2 size={14} />
                  <Image size={14} />
                </div>
                <textarea
                  placeholder="Enter question here"
                  rows={3}
                  value={currentQuestion.text}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      text: e.target.value,
                    })
                  }
                  className="w-full p-4 text-sm text-slate-700 outline-none resize-none"
                ></textarea>
              </div>
            </div>

            {/* FIELD 2: 4 OPTIONS GRID CONTEXT */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 block">
                Type the options below<span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-1 px-3 rounded-lg border border-slate-100 focus-within:border-blue-300 focus-within:bg-white transition-all"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          correctOption: idx,
                        })
                      }
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        currentQuestion.correctOption === idx
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {currentQuestion.correctOption === idx && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </button>

                    <input
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className="w-full bg-transparent p-2 text-sm text-slate-700 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block">
                Correct Option
              </label>
              <input
                type="text"
                placeholder="option1"
                className="mt-3 w-full p-2 text-sm text-slate-700 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            {/* OPTIONAL FIELDS GRID PANEL CONTAINER */}
            <div className="border-t border-slate-50 pt-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question Settings
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Topic Select Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    Topic
                  </label>
                  <div className="relative">
                    <select
                      value={currentQuestion.topic}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          topic: e.target.value,
                        })
                      }
                      className="w-full text-xs appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none text-slate-600"
                    >
                      <option value="">Select Topic Dropdown</option>
                      <option value="Grammar">Grammar</option>
                      <option value="Writing">Writing</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={14}
                    />
                  </div>
                </div>

                {/* Sub-Topic Select Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    Sub-Topic
                  </label>
                  <div className="relative">
                    <select
                      value={currentQuestion.subTopic}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          subTopic: e.target.value,
                        })
                      }
                      className="w-full text-xs appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none text-slate-600"
                    >
                      <option value="">Select Sub-Topic Dropdown</option>
                      <option value="Application">Application</option>
                      <option value="Syntax structure">Syntax structure</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={14}
                    />
                  </div>
                </div>

                {/* Difficulty Select Dropdown Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">
                    Difficulty override
                  </label>
                  <div className="relative">
                    <select
                      value={currentQuestion.difficulty}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          difficulty: e.target.value,
                        })
                      }
                      className="w-full text-xs appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none text-slate-600"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Difficult">Difficult</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={14}
                    />
                  </div>
                </div>
              </div>

              {/* Media URL Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">
                  Media URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/asset-resource.jpg (Optional image/embed linkage)"
                  value={currentQuestion.mediaUrl}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      mediaUrl: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:border-blue-300 transition-all"
                />
              </div>

              {/* Explanation Text Field Input box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">
                  Explanation
                </label>
                <textarea
                  placeholder="Provide details mapping step solutions here (Optional display format for users)..."
                  rows={2}
                  value={currentQuestion.explanation}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      explanation: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 outline-none focus:bg-white focus:border-blue-300 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* CONTROL ROW BLOCK A: Add Another Question Action Node */}
            <div className="flex justify-start pt-2">
              <button
                type="button"
                // onClick={handleAddQuestionToList}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                <Plus size={16} />
                {editingId !== null
                  ? "Apply Edited Question Save"
                  : "Add Another Question"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="ml-3 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* CONTROL ROW BLOCK B: Navigation Steppers with Validation Enforcer */}
            <div className="flex justify-between border-t border-slate-100 pt-6 mt-6">
              {/* <button
                type="button"
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Back to Config
              </button> */}

              <button
                type="button"
                className="px-8 py-2.5 bg-[#4E73F8] text-white font-semibold text-sm rounded-xl hover:bg-[#3B62E3] shadow-md shadow-blue-100 transition-all flex items-center gap-2"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

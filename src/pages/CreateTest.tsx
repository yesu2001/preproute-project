import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CreateTest() {
  const [formData, setFormData] = useState({
    testName: "",
    subject: "",
    testType: "Chapter Wise",
    topic: "",
    subTopic: "",
    duration: "",
    difficulty: "Medium",
    wrongAnswer: -1,
    unattempted: 0,
    correctAnswer: 5,
    noOfQuestions: "",
    totalMarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const adjustMarking = (field: any, amount: any) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field] + amount }));
  };

  return (
    <div className="flex-col min-h-screen space-y-8 p-2 md:p-6">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-md text-slate-600">
          Test Creation <span className="text-slate-600">/</span>
          Create Test <span className="text-slate-600">/</span>
          Chapter Wise
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="w-full flex-1">
        {/* TAB SELECTOR */}
        <div className="w-fit flex gap-6 mb-8 border border-slate-200 rounded-xl p-2">
          {["Chapter Wise", "PYQ", "Mock Test"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${tab === "Chapter Wise" ? "text-[#4E73F8] bg-blue-50 font-medium" : "bg-white text-slate-400"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="">
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {/* Subject Dropdown */}
            <div>
              <label
                htmlFor="subject"
                className="text-sm font-semibold text-slate-700"
              >
                Subject
              </label>
              <div className="relative mt-3">
                <select
                  id="subject"
                  name="subject"
                  onChange={handleInputChange}
                  className="w-full appearance-none border border-slate-200 rounded-lg px-4 py-3 text-slate-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                >
                  <option>Choose from Drop-down</option>
                  <option>English</option>
                  <option>Mathematics</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            {/* Test Name */}
            <div>
              <label
                htmlFor="testName"
                className="text-sm font-semibold text-slate-700"
              >
                Name of Test
              </label>
              <input
                id="testName"
                type="text"
                name="testName"
                placeholder="Enter Name of Test"
                className="mt-3 w-full border border-slate-200 rounded-lg px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            {/* Topic Dropdown */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Topic
              </label>
              <div className="relative mt-3">
                <select
                  name="topic"
                  className="w-full appearance-none border border-slate-200 rounded-lg px-4 py-3 text-slate-500 outline-none"
                >
                  <option>Choose from Drop-down</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            {/* Sub Topic Dropdown */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Sub Topic
              </label>
              <div className="relative mt-3">
                <select
                  name="subTopic"
                  className="w-full appearance-none border border-slate-200 rounded-lg px-4 py-3 text-slate-500 outline-none"
                >
                  <option>Choose from Drop-down</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Duration (Minutes)
              </label>
              <input
                type="number"
                placeholder="Enter the time"
                className="mt-3 w-full border border-slate-200 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Test Difficulty Level
              </label>
              <div className="mt-3 flex items-center gap-10 py-2">
                {["Easy", "Medium", "Difficult"].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.difficulty === level ? "border-blue-500" : "border-slate-300"}`}
                    >
                      {formData.difficulty === level && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      className="hidden"
                      onChange={handleInputChange}
                      checked={formData.difficulty === level}
                    />
                    <span
                      className={`text-sm font-medium ${formData.difficulty === level ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Marking Scheme Section */}
            <div className="col-span-2 mt-4">
              <h6 className="text-sm font-semibold text-slate-700 mb-6">
                Marking Scheme:
              </h6>
              <div className="grid grid-cols-[180px_180px_180px_1fr_1fr] gap-8">
                {/* Wrong Answer */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Wrong Answer
                  </label>
                  <div className="mt-3 flex items-center justify-between border border-slate-200 rounded-lg px-4 py-2">
                    <span className="text-lg text-slate-700">
                      {formData.wrongAnswer > 0
                        ? `+${formData.wrongAnswer}`
                        : formData.wrongAnswer}
                    </span>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => adjustMarking("wrongAnswer", 1)}
                        className="hover:text-blue-600"
                      >
                        <ChevronDown className="rotate-180" size={16} />
                      </button>
                      <button
                        onClick={() => adjustMarking("wrongAnswer", -1)}
                        className="hover:text-blue-600"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unattempted */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Unattempted
                  </label>
                  <div className="mt-3 flex items-center justify-between border border-slate-200 rounded-lg px-4 py-2">
                    <span className="text-lg text-slate-700">
                      {formData.unattempted >= 0
                        ? `+${formData.unattempted}`
                        : formData.unattempted}
                    </span>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => adjustMarking("unattempted", 1)}
                        className="hover:text-blue-600"
                      >
                        <ChevronDown className="rotate-180" size={16} />
                      </button>
                      <button
                        onClick={() => adjustMarking("unattempted", -1)}
                        className="hover:text-blue-600"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Correct Answer */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Correct Answer
                  </label>
                  <div className="mt-3 flex items-center justify-between  border border-slate-200 rounded-lg px-4 py-2">
                    <span className="text-lg text-slate-700">
                      {formData.correctAnswer > 0
                        ? `+${formData.correctAnswer}`
                        : formData.correctAnswer}
                    </span>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => adjustMarking("correctAnswer", 1)}
                        className="hover:text-blue-600"
                      >
                        <ChevronDown className="rotate-180" size={16} />
                      </button>
                      <button
                        onClick={() => adjustMarking("correctAnswer", -1)}
                        className="hover:text-blue-600"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Inputs */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    No of Questions
                  </label>
                  <input
                    type="text"
                    placeholder="Ex:250 Marks"
                    className="mt-3 w-full border border-slate-200 rounded-lg px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Total Marks
                  </label>
                  <input
                    type="text"
                    placeholder="Ex:250 Marks"
                    className="mt-3 w-full border border-slate-200 rounded-lg px-4 py-3 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-12">
            <button
              // onClick={onCancel}
              className="px-10 py-2 text-[#4E73F8] font-semibold bg-sky-50 rounded-md transition-all"
            >
              Cancel
            </button>
            <button
              // onClick={() => onNext(formData)}
              className="px-10 py-2 bg-[#4E73F8] text-white font-semibold rounded-md hover:bg-[#3B62E3] transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

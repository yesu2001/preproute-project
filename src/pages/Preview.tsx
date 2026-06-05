import React, { useState } from "react";
import {
  Bell,
  Layers,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Edit3,
  Clock,
  BookOpen,
  Award,
  AlertCircle,
  HelpCircle,
  Check,
  Calendar,
  ChevronDown,
} from "lucide-react";

export default function Preview({
  testData,
  questions,
  onEditTest,
  onEditQuestions,
  onFinalPublish,
}) {
  const [isPublished, setIsPublished] = useState(false);

  // Fallback structures mapping directly to fields from earlier steps
  const displayData = testData || {
    testName: "Advanced English Grammar Assessment",
    subject: "English",
    testType: "Chapter Wise",
    topic: "Grammar",
    subTopic: "Application Syntax",
    duration: "60",
    difficulty: "Medium",
    correctAnswer: 5,
    wrongAnswer: -1,
    unattempted: 0,
    noOfQuestions: "50",
    totalMarks: "250",
  };

  const displayQuestions = questions || [
    {
      id: 1,
      text: "Identify the correct sentence structure for a past perfect conditional clause.",
      options: [
        "If I would have known, I would go.",
        "Had I known, I would have gone.",
        "If I knew, I will have gone.",
        "Should I know, I would go.",
      ],
      correctOption: 1,
      explanation:
        "The past perfect conditional uses 'Had + subject + past participle' in the condition clause followed by 'would have + past participle' in the consequence clause.",
      topic: "Grammar",
      difficulty: "Medium",
    },
  ];

  const handlePublish = () => {
    setIsPublished(true);
  };

  // Generate standard 30-minute intervals for our select options list
  const generateTimeOptions = () => {
    const options = [];
    const periods = ["AM", "PM"];
    for (let p = 0; p < periods.length; p++) {
      for (let hour = 1; hour <= 12; hour++) {
        options.push(`${hour}:00 ${periods[p]}`);
        options.push(`${hour}:30 ${periods[p]}`);
      }
    }
    // Reorder to start nicely at 8:00 AM
    const eightAmIndex = options.indexOf("8:00 AM");
    return [...options.slice(eightAmIndex), ...options.slice(0, eightAmIndex)];
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="p-2 md:p-4 flex min-h-screen">
      {/* CORE WORKSPACE */}
      <main className="flex-1 flex flex-col relative">
        <section className="space-y-6">
          <div className="w-fit flex gap-2 border border-slate-200 p-1 rounded-md">
            <div className="bg-slate-50 text-sm font-bold p-2 px-4 rounded-md cursor-pointer">
              <p>Publish Now</p>
            </div>
            <div className="text-sm text-slate-400 p-2 px-4 rounded-md cursor-pointer">
              <p>Schedule Publish</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 font-semibold">
              Select Date and Time
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-600 font-semibold">Live Until</p>
            <p className="text-sm text-slate-400">
              Choose how long this test should remain available on the platform.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-6">
                <input type="radio" id="always-available" name="live-until" />
                <label
                  htmlFor="always-available"
                  className="text-sm text-slate-500"
                >
                  Always Available
                </label>
              </div>
              <div className="flex items-center gap-6">
                <input type="radio" id="3-weeks" name="live-until" />
                <label htmlFor="3-weeks" className="text-sm text-slate-500">
                  3 Weeks
                </label>
              </div>
              <div className="flex items-center gap-6">
                <input type="radio" id="1-week" name="live-until" />
                <label htmlFor="1-week" className="text-sm text-slate-500">
                  1 Week
                </label>
              </div>

              <div className="flex items-center gap-6">
                <input type="radio" id="1-month" name="live-until" />
                <label htmlFor="1-month" className="text-sm text-slate-500">
                  1 Month
                </label>
              </div>
              <div className="flex items-center gap-6">
                <input type="radio" id="2-weeks" name="live-until" />
                <label htmlFor="2-weeks" className="text-sm text-slate-500">
                  2 Weeks
                </label>
              </div>
              <div className="flex items-center gap-6">
                <input type="radio" id="custom-duration" name="live-until" />
                <label
                  htmlFor="custom-duration"
                  className="text-sm text-slate-500"
                >
                  Custom Duration
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="relative flex items-center border border-slate-200 rounded-md px-4 py-3 cursor-pointer hover:bg-white hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
                <span className="text-sm text-slate-300">Select End Date</span>

                <input
                  // ref={dateInputRef}
                  type="date"
                  // value={selectedDate}
                  // onChange={(e) => setSelectedDate(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer pointer-events-none"
                />

                {/* Trailing Icon element context boundary rule */}
                <Calendar
                  size={18}
                  className="ml-auto text-slate-400 shrink-0 pointer-events-none"
                />
              </div>
              <div className="relative flex items-center">
                <select
                  // value={selectedTime}
                  // onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-4 py-3 text-sm text-slate-800 font-medium outline-none transition-all hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none pr-14 cursor-pointer"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {/* Icons absolute-positioned nicely on the right end */}
                <div className="absolute right-4 flex items-center gap-1.5 text-slate-400 pointer-events-none shrink-0">
                  {/* <Clock size={16} /> */}
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// {/* 3. CONFIRM/SUCCESS MESSAGE MODAL PANEL */}
// {/* {isPublished && ( */}
// <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//   <div className="bg-white rounded-[32px] p-8 max-w-sm w-full border border-slate-100 shadow-2xl text-center space-y-6 transform transition-all scale-100">
//     {/* Top Accent Icon Layout derived from attached Figma styling patterns */}
//     <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
//       <CheckCircle2 size={32} className="stroke-[1.5]" />
//     </div>

//     <div className="space-y-2">
//       <h2 className="text-xl font-black text-slate-800 tracking-tight">
//         Test Live Successfully!
//       </h2>
//       <p className="text-xs text-slate-400 leading-relaxed max-w-[280px] mx-auto">
//         Your assessment has been generated. Candidate testing slots and
//         matrix analytics options are now open on the index platform.
//       </p>
//     </div>

//     {/* Action redirect button block */}
//     <button
//       onClick={onFinalPublish}
//       className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md shadow-slate-100"
//     >
//       Go to Dashboard
//     </button>
//   </div>
// </div>
// {/* )} */}

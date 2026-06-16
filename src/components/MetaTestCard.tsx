import { Pen, Timer, ChartColumnBig, FileQuestionMark } from "lucide-react";
import type { Test } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSubjects,
  getTopicsBySubject,
  getSubTopicsByTopics,
} from "../api/subjects";
import type { Subject, Topic, SubTopic } from "../types";

interface MetaTestCardProps {
  test: Test;
}

const MetaTestCard = ({ test }: MetaTestCardProps) => {
  const navigate = useNavigate();
  const [subjectLabel, setSubjectLabel] = useState<string>(test.subject || "");
  const [topicLabels, setTopicLabels] = useState<string[]>([]);
  const [subTopicLabels, setSubTopicLabels] = useState<string[]>([]);

  useEffect(() => {
    const resolveLabels = async () => {
      try {
        const subjectsRes = await getSubjects();
        const subjects: Subject[] = subjectsRes.data || [];
        const subjectMatch = subjects.find(
          (s) => s.id === test.subject || s.name === test.subject,
        );
        const subjectId = subjectMatch?.id || test.subject;
        setSubjectLabel(subjectMatch?.name || test.subject || "");

        const topicsRes = await getTopicsBySubject(subjectId);
        const topicsList: Topic[] = topicsRes.data || [];

        const resolvedTopicIds: string[] = [];
        const resolvedTopicLabels = (test.topics || []).map((rawTopic) => {
          const byId = topicsList.find((topic) => topic.id === rawTopic);
          if (byId) {
            resolvedTopicIds.push(byId.id);
            return byId.name;
          }

          const byName = topicsList.find((topic) => topic.name === rawTopic);
          if (byName) {
            resolvedTopicIds.push(byName.id);

            return byName.name;
          }

          return rawTopic;
        });
        setTopicLabels(resolvedTopicLabels);

        if ((test.sub_topics || []).length > 0 && resolvedTopicIds.length > 0) {
          const subRes = await getSubTopicsByTopics(resolvedTopicIds);
          const subList: SubTopic[] = subRes.data || [];
          const resolvedSubTopicLabels = (test.sub_topics || []).map(
            (rawSubTopic) => {
              const byId = subList.find(
                (subTopic) => subTopic.id === rawSubTopic,
              );
              if (byId) return byId.name;

              const byName = subList.find(
                (subTopic) => subTopic.name === rawSubTopic,
              );
              if (byName) return byName.name;

              return rawSubTopic;
            },
          );
          setSubTopicLabels(resolvedSubTopicLabels);
        } else {
          setSubTopicLabels((test.sub_topics || []).map((raw) => raw));
        }
      } catch (err) {
        console.error("Failed to resolve subject/topic labels", err);
      }
    };
    resolveLabels();
  }, [test]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start justify-between shadow-sm relative">
      <div className="">
        <span className="bg-[#1E293B] text-white text-md font-semibold px-4 py-1 rounded-2xl capitalize">
          {test.type ?? "Chapter Wise"}
        </span>
        <div className="flex items-center gap-3 my-4">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 font-md">
            <img
              src="/src/assets/subject.png"
              alt="Subject"
              className="w-8 h-8"
            />
            {test.name}{" "}
          </span>
          <span className="bg-[#2AB7A9] text-white border flex items-center gap-1 text-sm  px-4 py-1 rounded-lg capitalize">
            <img
              src="/src/assets/cognition.png"
              alt="Subject"
              className="w-5 h-5"
            />
            {test.difficulty}
          </span>
        </div>

        <div className="space-y-3">
          <div className="text-slate-400 flex items-center gap-1">
            <div className="w-25 flex justify-between">
              <p>Subject</p>
              <p>:</p>
            </div>
            <span className="font-semibold text-slate-500 ml-1">
              {subjectLabel}
            </span>
          </div>
          <div className="text-slate-400 flex items-center gap-1">
            <div className="w-25 flex justify-between">
              <p>Topic</p>
              <p> :</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <TopicBadges labels={topicLabels} />
            </div>
          </div>
          <div className="text-slate-400 flex items-center gap-1">
            <div className="w-25 flex justify-between">
              <p>Sub Topic</p>
              <p> :</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <TopicBadges labels={subTopicLabels} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/test/${test.id}/edit`)}
        className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <Pen size={16} color="#7489FF" />
      </button>

      <div className="absolute bottom-5 right-5 flex items-center gap-1 border border-slate-200 p-1.5 rounded-lg text-xs text-slate-700">
        <div className="px-3 py-1.5 flex items-center gap-1">
          <Timer size={16} className="text-slate-300" /> {test.total_time} Min
        </div>
        <div className="w-px h-4 bg-slate-300"></div>
        <div className="px-4 py-1.5 flex items-center gap-1">
          <FileQuestionMark size={16} className="text-slate-300" />{" "}
          {test.total_questions} Q's
        </div>
        <div className="w-px h-4 bg-slate-300"></div>
        <div className="px-3 py-1.5 flex items-center gap-1">
          <ChartColumnBig size={16} className="text-slate-300" />{" "}
          {test.total_marks} Marks
        </div>
      </div>
    </div>
  );
};

export default MetaTestCard;

// ----------------------------------------------------------------

const TopicBadges = ({ labels }: { labels?: string[] }) => {
  if (!labels) return <p className="text-slate-400 text-xs">Loading...</p>;
  if (labels.length === 0)
    return <p className="text-slate-400 text-xs px-2">None specified</p>;

  return labels.map((label, index) => (
    <span
      key={label || index}
      className="inline-block px-2 text-amber-400 rounded-md border border-amber-400"
    >
      {label}
    </span>
  ));
};

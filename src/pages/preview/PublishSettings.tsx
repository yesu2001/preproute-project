import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePickerField from "../../components/ui/DatePickerField";
import TimeSelectField from "../../components/ui/TimeSelectField";
// import DatePickerField from "../components/ui/DatePickerField";
// import TimeSelectField from "../components/ui/TimeSelectField";

interface PublishFormValues {
  liveUntil: string;
  endDate: string;
  endTime: string;
}

interface PublishSettingsProps {
  publishing: boolean;
  published: boolean;
  onPublish: (data: {
    publishType: "now" | "scheduled";
    endDate?: string;
    endTime?: string;
    liveUntil?: string;
  }) => void;
}

const LIVE_UNTIL_OPTIONS = [
  { id: "always", label: "Always Available" },
  { id: "1-week", label: "1 Week" },
  { id: "2-weeks", label: "2 Weeks" },
  { id: "3-weeks", label: "3 Weeks" },
  { id: "1-month", label: "1 Month" },
  { id: "custom", label: "Custom Duration" },
];

const PublishSettings = ({
  publishing,
  published,
  onPublish,
}: PublishSettingsProps) => {
  const [publishType, setPublishType] = useState<"now" | "scheduled">("now");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PublishFormValues>({
    defaultValues: {
      liveUntil: "always",
      endDate: "",
      endTime: "8:00 AM",
    },
  });

  const liveUntil = watch("liveUntil");

  const onSubmit = (data: PublishFormValues) => {
    onPublish({
      publishType,
      liveUntil: data.liveUntil,
      endDate: publishType === "scheduled" ? data.endDate : undefined,
      endTime: publishType === "scheduled" ? data.endTime : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Publish type toggle */}
      <div className="w-fit flex gap-2 border border-slate-200 p-1 rounded-md">
        <button
          type="button"
          onClick={() => setPublishType("now")}
          className={`text-sm font-semibold px-4 py-2 rounded-md transition-all ${
            publishType === "now"
              ? "bg-slate-50 text-slate-800"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Publish Now
        </button>
        <button
          type="button"
          onClick={() => setPublishType("scheduled")}
          className={`text-sm font-semibold px-4 py-2 rounded-md transition-all ${
            publishType === "scheduled"
              ? "bg-slate-50 text-slate-800"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Schedule Publish
        </button>
      </div>

      {/* Scheduled date/time — only shown when schedule selected */}
      {publishType === "scheduled" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 font-semibold">
            Select Date and Time
          </p>
          <div className="grid grid-cols-2 gap-4">
            <DatePickerField
              label="Publish Date"
              registration={register("endDate", {
                required:
                  publishType === "scheduled"
                    ? "Please select a publish date"
                    : false,
              })}
              error={errors.endDate}
              required
            />
            <TimeSelectField
              label="Publish Time"
              registration={register("endTime")}
              error={errors.endTime}
            />
          </div>
        </div>
      )}

      {/* Live Until */}
      <div className="space-y-3">
        <p className="text-sm text-slate-600 font-semibold">Live Until</p>
        <p className="text-sm text-slate-400">
          Choose how long this test should remain available on the platform.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {LIVE_UNTIL_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                  liveUntil === opt.id ? "border-blue-500" : "border-slate-300"
                }`}
              >
                {liveUntil === opt.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
              <input
                {...register("liveUntil")}
                type="radio"
                value={opt.id}
                className="hidden"
              />
              <span className="text-sm text-slate-500">{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Custom duration date/time row */}
        {liveUntil === "custom" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <DatePickerField
              label="End Date"
              registration={register("endDate", {
                required:
                  liveUntil === "custom" ? "End date is required" : false,
              })}
              error={errors.endDate}
              required
            />
            <TimeSelectField
              label="End Time"
              registration={register("endTime")}
              error={errors.endTime}
            />
          </div>
        )}
      </div>

      {/* Publish button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={publishing || published}
          className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl transition-all"
        >
          {published
            ? "✓ Published"
            : publishing
              ? "Publishing..."
              : "Publish Test"}
        </button>
      </div>
    </form>
  );
};

export default PublishSettings;

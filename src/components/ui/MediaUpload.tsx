import React, { useRef, useState } from "react";

interface MediaUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
  label?: string;
}

export default function MediaUpload({
  value,
  onChange,
  accept = "image/*",
  label = "Media",
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is a data URL (base64) - callback to parent
      onChange(result);
      setLoading(false);
    };
    reader.onerror = () => {
      onChange(null);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSelect = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="mt-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSelect}
            className="px-4 py-2 bg-slate-100 rounded-md text-sm text-slate-700 hover:bg-slate-200"
          >
            {value ? "Change" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1 text-sm text-rose-600"
            >
              Remove
            </button>
          )}
          {loading && (
            <span className="text-sm text-slate-500">Uploading...</span>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {value && (
          <div className="mt-3">
            <img
              src={value}
              alt="uploaded"
              className="max-w-xs max-h-48 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

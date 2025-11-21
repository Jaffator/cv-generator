import { useState } from "react";
import { Button } from "./ui/button";

export function PhotoDropzone({ onChange }: { onChange: (img: string) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`
        border-2 border-dashed rounded-xl p-6 cursor-pointer
        transition-all flex flex-col items-center justify-center h-50
        ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${preview ? "p-2" : ""}
      `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => document.getElementById("photoInput")?.click()}
      >
        {/* Náhled */}
        {preview ? (
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg shadow-md" />
        ) : (
          <p className="text-gray-600">Dragp and drop photo or click</p>
        )}

        <input
          id="photoInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <Button
        variant={"secondary"}
        className="cursor-pointer"
        onClick={() => {
          setPreview(null);
          onChange("");
        }}
      >
        Delete
      </Button>
    </div>
  );
}

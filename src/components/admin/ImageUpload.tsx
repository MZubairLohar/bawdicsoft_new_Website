"use client";
import { useState } from "react";

interface ImageUploadProps {
  onUpload?: (url: string) => void;
  value?: string;
}

export default function ImageUpload({ onUpload, value }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(value || "");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    if (onUpload) onUpload(url);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Paste image URL (e.g. /assets/xyz.png or https://...)"
        value={imageUrl}
        onChange={handleUrlChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
      />
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="Preview"
          className="w-40 h-28 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
    </div>
  );
}

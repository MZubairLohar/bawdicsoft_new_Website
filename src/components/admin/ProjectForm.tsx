"use client";
import { useState } from "react";

interface ProjectFormProps {
  initialData?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => void;
  isLoading?: boolean;
}

export default function ProjectForm({ initialData, onSubmit, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    projectName: initialData?.projectName || "",
    category: initialData?.category || "design",
    projectImage: initialData?.projectImage || "",
    alternate: initialData?.alternate || "",
    href: initialData?.href || "",
    projectDesc: initialData?.projectDesc || "",
    technologies: (initialData?.technologies || []).join(", "),
    detailDesc: initialData?.detailDesc || "",
    challenge: initialData?.challenge || "",
    solution: initialData?.solution || "",
    features: (initialData?.features || []).join(", "),
    result: initialData?.result || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...formData,
technologies: formData.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
        features: formData.features.split(",").map((f: string) => f.trim()).filter(Boolean),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
            <input required name="projectName" value={formData.projectName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none">
              <option value="design">Design</option>
              <option value="video">Video</option>
              <option value="content">Content</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
          <input required name="projectImage" value={formData.projectImage} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
          <textarea required name="projectDesc" value={formData.projectDesc} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used *</label>
          <input required name="technologies" value={formData.technologies} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}

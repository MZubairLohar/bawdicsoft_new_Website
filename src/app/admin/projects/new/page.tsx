"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form state matching our ProjectData interface
  const [formData, setFormData] = useState({
    projectName: "",
    category: "design", // design, video, or content
    projectImage: "", // Will be URL from image uploader later
    alternate: "",
    href: "",
    projectDesc: "",
    technologies: "", // Comma-separated string for easy input
    detailDesc: "",
    challenge: "",
    solution: "",
    features: "", // Comma-separated string
    result: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert comma-separated strings into arrays for the database
      const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t !== "");
      const featArray = formData.features.split(',').map(f => f.trim()).filter(f => f !== "");

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          technologies: techArray,
          features: featArray,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project saved successfully to MongoDB!");
        router.push("/admin/projects");
      } else {
        alert(`Error: ${data.error || "Failed to save project"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => router.back()} 
          className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2"
        >
          ← Back to Projects
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
        <p className="text-gray-500 text-sm">Fill in the details below to add a new case study to your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
              <input required name="projectName" value={formData.projectName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g., AGUA COIN" />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Live Project URL</label>
            <input name="href" value={formData.href} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
            <textarea required name="projectDesc" value={formData.projectDesc} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="A brief 1-2 sentence summary..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used *</label>
            <input required name="technologies" value={formData.technologies} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="Next.js, Tailwind CSS, MongoDB (comma separated)" />
          </div>
        </div>

        {/* Media Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Media</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input required name="projectImage" value={formData.projectImage} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="/assets/aguacoin.png or https://..." />
            <p className="text-xs text-gray-500 mt-1">For now, paste an image URL or public path. We will add a drag-and-drop uploader next.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (for SEO)</label>
            <input name="alternate" value={formData.alternate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="Describe the image for accessibility" />
          </div>
        </div>

        {/* Case Study Details Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Case Study Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
            <textarea name="detailDesc" value={formData.detailDesc} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="A deeper dive into the project..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">The Challenge</label>
            <textarea name="challenge" value={formData.challenge} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="What problem was the client facing?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Solution</label>
            <textarea name="solution" value={formData.solution} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="How did we solve it?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
            <textarea name="features" value={formData.features} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="Feature 1, Feature 2, Feature 3 (comma separated)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">The Result</label>
            <textarea name="result" value={formData.result} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="What was the outcome or impact?" />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
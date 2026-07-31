"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    category: "design",
    projectImage: "",
    alternate: "",
    href: "",
    projectDesc: "",
    technologies: "",
    detailDesc: "",
    challenge: "",
    solution: "",
    features: "",
    result: "",
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectId = params.id as string;
        
        if (!projectId) {
          setError("No project ID provided");
          setIsLoading(false);
          return;
        }

        const res = await fetch(`/api/admin/projects/${projectId}`);
        const data = await res.json();

        if (data.success && data.data) {
          const project = data.data;
          setFormData({
            projectName: project.projectName || "",
            category: project.category || "design",
            projectImage: project.projectImage || "",
            alternate: project.alternate || "",
            href: project.href || "",
            projectDesc: project.projectDesc || "",
            technologies: project.technologies?.join(", ") || "",
            detailDesc: project.detailDesc || "",
            challenge: project.challenge || "",
            solution: project.solution || "",
            features: project.features?.join(", ") || "",
            result: project.result || "",
          });
        } else {
          setError(data.error || "Project not found");
          setTimeout(() => {
            router.push("/admin/projects");
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let fixedImageUrl = formData.projectImage.trim();
      if (fixedImageUrl.startsWith('public/')) {
        fixedImageUrl = fixedImageUrl.replace('public/', '/');
      }

      const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t !== "");
      const featArray = formData.features.split(',').map(f => f.trim()).filter(f => f !== "");

      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectImage: fixedImageUrl,
          technologies: techArray,
          features: featArray,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project updated successfully!");
        router.push("/admin/projects");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => router.push("/admin/projects")}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => router.back()} 
          className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2"
        >
          ← Back to Projects
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
        <p className="text-gray-500 text-sm">Update the project details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Live Project URL</label>
            <input name="href" value={formData.href} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
            <textarea required name="projectDesc" value={formData.projectDesc} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
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
            <p className="text-xs text-gray-500 mt-1">Use /assets/... for local images or https://... for external images</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (for SEO)</label>
            <input name="alternate" value={formData.alternate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
        </div>

        {/* Case Study Details Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Case Study Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
            <textarea name="detailDesc" value={formData.detailDesc} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">The Challenge</label>
            <textarea name="challenge" value={formData.challenge} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Solution</label>
            <textarea name="solution" value={formData.solution} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
            <textarea name="features" value={formData.features} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="Feature 1, Feature 2, Feature 3 (comma separated)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">The Result</label>
            <textarea name="result" value={formData.result} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
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
            disabled={isSaving}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? "Saving..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
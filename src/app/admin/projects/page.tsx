"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { allData } from "@/components/allData";

interface Project {
  _id?: string;
  id?: number;
  projectName: string;
  category: string;
  projectImage: string;
  alternate: string;
  href: string;
  projectDesc: string;
  technologies: string[];
  detailDesc?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  result?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        
        if (data.success) {
          // Combine allData (original projects) with MongoDB projects
          const mongoProjects = data.data.map((p: any) => ({
            ...p,
            id: p._id, // Use MongoDB _id as id
          }));
          
          // Combine: allData first, then MongoDB projects
          const allProjects = [...allData, ...mongoProjects];
          setProjects(allProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleDelete = async (project: Project) => {
    // Only allow deleting MongoDB projects (not allData projects)
    if (!project._id) {
      alert("Cannot delete original projects. These are hardcoded in the system.");
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete "${project.projectName}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        alert("Project deleted successfully!");
        // Remove from local state
        setProjects(projects.filter(p => p._id !== project._id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500">Manage your portfolio projects and case studies.</p>
        <Link 
          href="/admin/projects/new" 
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span> Add New Project
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Project Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Last Updated</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => {
              const isOriginal = !project._id; // allData projects don't have _id
              const lastUpdated = project.updatedAt 
                ? new Date(project.updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })
                : "N/A";

              return (
                <tr key={project._id || project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{project.projectName}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{project.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      isOriginal ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}>
                      {isOriginal ? "Original" : "Published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{lastUpdated}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {isOriginal ? (
                      <span className="text-gray-400 text-xs">Read-only</span>
                    ) : (
                      <>
                        <Link 
                          href={`/admin/projects/${project._id}/edit`} 
                          className="text-brand-600 hover:text-brand-800 font-medium"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(project)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";

interface Project {
  _id?: string;
  id?: number;
  projectName: string;
  category: string;
  updatedAt?: string;
}

interface ProjectTableProps {
  projects: Project[];
  onDelete?: (project: Project) => void;
}

export default function ProjectTable({ projects, onDelete }: ProjectTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Project Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => {
              const isOriginal = !project._id;
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
                  <td className="px-6 py-4 text-right space-x-3">
                    {isOriginal ? (
                      <span className="text-gray-400 text-xs">Read-only</span>
                    ) : (
                      <>
                        <Link href={`/admin/projects/${project._id}/edit`} className="text-brand-600 hover:text-brand-800 font-medium">
                          Edit
                        </Link>
                        <button onClick={() => onDelete && onDelete(project)} className="text-red-500 hover:text-red-700 font-medium">
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

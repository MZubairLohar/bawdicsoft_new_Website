"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Lock, FolderKanban, Palette, Video, FileText } from "lucide-react";

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

// Category color mapping for badges + avatars
const categoryStyles: Record<string, { badge: string; dot: string }> = {
  design: {
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "from-violet-500 to-purple-600",
  },
  video: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    dot: "from-rose-500 to-pink-600",
  },
  content: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "from-emerald-500 to-teal-600",
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  design: <Palette className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  content: <FileText className="h-4 w-4" />,
};

export default function ProjectTable({ projects, onDelete }: ProjectTableProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/80 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Project Name</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence initial={false}>
              {projects.map((project, index) => {
                const isOriginal = !project._id;
                const catStyle =
                  categoryStyles[project.category.toLowerCase()] ||
                  categoryStyles.content;

                return (
                  <motion.tr
                    key={project._id || project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                    className="hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-transparent transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${catStyle.dot} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                        >
                          {categoryIcons[project.category.toLowerCase()] || (
                            <FolderKanban className="h-4 w-4" />
                          )}
                        </div>
                        <span className="font-semibold text-gray-900 capitalize">
                          {project.projectName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border inline-flex items-center gap-1 capitalize ${catStyle.badge}`}
                      >
                        {categoryIcons[project.category.toLowerCase()]}
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ${
                          isOriginal
                            ? "bg-sky-100 text-sky-700 ring-sky-200"
                            : "bg-emerald-100 text-emerald-700 ring-emerald-200"
                        }`}
                      >
                        {isOriginal ? "Original" : "Published"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isOriginal ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
                          <Lock className="h-3 w-3" /> Read-only
                        </span>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/admin/projects/${project._id}/edit`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </Link>
                          <button
                            onClick={() => onDelete && onDelete(project)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

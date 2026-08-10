"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Plus,
  Sparkles,
  Pencil,
  Trash2,
  Lock,
  LayoutGrid,
  Layers,
  Palette,
  Video,
  FileText,
  Search,
} from "lucide-react";
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

// Category color mapping for badges + filter pills
const categoryStyles: Record<string, { badge: string; pill: string; dot: string }> = {
  design: {
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    pill: "data-[active=true]:bg-violet-600 data-[active=true]:text-white",
    dot: "from-violet-500 to-purple-600",
  },
  video: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    pill: "data-[active=true]:bg-rose-600 data-[active=true]:text-white",
    dot: "from-rose-500 to-pink-600",
  },
  content: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pill: "data-[active=true]:bg-emerald-600 data-[active=true]:text-white",
    dot: "from-emerald-500 to-teal-600",
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  design: <Palette className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  content: <FileText className="h-4 w-4" />,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/admin/projects");
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
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Project deleted successfully!");
        // Remove from local state
        setProjects(projects.filter((p) => p._id !== project._id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete project");
    }
  };

  // Filter logic
  const categories = ["All", "Design", "Video", "Content"];
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeFilter === "All" ||
      project.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      search.trim() === "" ||
      project.projectName.toLowerCase().includes(search.toLowerCase()) ||
      project.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
          <div className="absolute inset-0 rounded-full blur-md bg-sky-400/20 animate-glow" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-0">
      {/* ===== Hero Banner ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white p-6 md:p-8 animate-gradient shadow-2xl"
      >
        <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl animate-float" />
        <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full bg-fuchsia-400/20 blur-2xl animate-float-slow" />
        <div className="absolute top-8 right-1/4 w-20 h-20 rounded-full border-2 border-white/20 animate-slow-spin" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Portfolio Studio
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md">
              Manage your Projects
              <span className="block text-white/85 text-base md:text-lg font-medium mt-2">
                Showcase case studies, filter by category, and keep your portfolio fresh.
              </span>
            </h1>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Plus className="h-4 w-4" /> Add New Project
          </Link>
        </div>
      </motion.div>

      {/* ===== Toolbar: Filters + Search ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 mr-1">
            <LayoutGrid className="h-4 w-4 text-indigo-600" /> Filter:
          </span>
          {categories.map((cat) => {
            const style = categoryStyles[cat.toLowerCase()];
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                data-active={activeFilter === cat}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30 scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5"
                } ${style?.pill || ""}`}
              >
                {cat !== "All" ? categoryIcons[cat.toLowerCase()] : null}
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full md:w-64 pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </motion.div>

      {/* ===== Projects List ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm overflow-hidden glass"
      >
        <div className="p-5 md:p-6 border-b border-gray-200 flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">All Projects</h3>
          <span className="ml-auto px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FolderKanban className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="font-semibold text-gray-700">No projects found</p>
            <p className="text-sm mt-1">
              Try a different filter, or add a new project to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-semibold min-w-[220px]">Project Name</th>
                  <th className="px-4 md:px-6 py-3 font-semibold min-w-[110px]">Category</th>
                  <th className="px-4 md:px-6 py-3 font-semibold min-w-[90px]">Status</th>
                  <th className="px-4 md:px-6 py-3 font-semibold min-w-[120px]">Last Updated</th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-right min-w-[140px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence initial={false}>
                  {filteredProjects.map((project, index) => {
                    const isOriginal = !project._id;
                    const lastUpdated = project.updatedAt
                      ? new Date(project.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A";
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
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${catStyle.dot} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                            >
                              {categoryIcons[project.category.toLowerCase()] || (
                                <FolderKanban className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 break-words max-w-[200px]">
                                {project.projectName}
                              </p>
                              <p className="text-gray-500 text-xs break-words max-w-[200px] truncate">
                                {project.projectDesc || project.alternate || "No description"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <span
                            className={`px-2.5 py-1 text-xs font-semibold rounded-full border inline-flex items-center gap-1 capitalize ${
                              catStyle.badge
                            }`}
                          >
                            {categoryIcons[project.category.toLowerCase()]}
                            {project.category}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4">
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
                        <td className="px-4 md:px-6 py-4 text-gray-500">{lastUpdated}</td>
                        <td className="px-4 md:px-6 py-4 text-right">
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
                                onClick={() => handleDelete(project)}
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
        )}
      </motion.div>
    </div>
  );
}

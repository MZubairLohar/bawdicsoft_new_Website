import Link from "next/link";

export default function ProjectsPage() {
  // Mock Data
  const projects = [
    { id: 1, name: "AGUA COIN", category: "Web3", status: "Published", date: "Oct 12, 2023" },
    { id: 2, name: "SIGMANTARIAN", category: "DeFi", status: "Published", date: "Nov 05, 2023" },
    { id: 3, name: "HASHFOR", category: "SEO/Marketing", status: "Draft", date: "Dec 01, 2023" },
  ];

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
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 text-gray-600">{project.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{project.date}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/projects/${project.id}/edit`} className="text-brand-600 hover:text-brand-800 font-medium">Edit</Link>
                  <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Copy,
  Filter,
  KeyRound,
  RefreshCcw,
  Search,
  Shield,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
  Wrench,
  Download,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  role: string;
  createdAt: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  barClass: string;
  textClass: string;
}

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    phone: "",
    bio: "",
    role: "manager",
  });
  const [addUserAvatarUploading, setAddUserAvatarUploading] = useState(false);
  const [addUserAvatarError, setAddUserAvatarError] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingTargetUser, setEditingTargetUser] = useState<User | null>(null);
  const [editingUserData, setEditingUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
  });
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userMessage, setUserMessage] = useState("");
  const [userError, setUserError] = useState("");

  const [resetUserId, setResetUserId] = useState<User | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [systemStats, setSystemStats] = useState({
    users: 0,
    employees: 0,
    projects: 0,
    leads: 0,
  });

  useEffect(() => {
    fetchUsers();
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    try {
      const [usersRes, employeesRes, projectsRes, leadsRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/employees"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/leads"),
      ]);

      const usersData = await usersRes.json();
      const employeesData = await employeesRes.json();
      const projectsData = await projectsRes.json();
      const leadsData = await leadsRes.json();

      setSystemStats({
        users: usersData.success ? usersData.users?.length || 0 : 0,
        employees: employeesData.success ? employeesData.data?.length || 0 : 0,
        projects: projectsData.success ? projectsData.data?.length || 0 : 0,
        leads: leadsData.success ? leadsData.data?.length || 0 : 0,
      });
    } catch (err) {
      console.error("Error fetching system stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch("/api/admin/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setUserError(data.error || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUserError("An error occurred while fetching users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleRefreshData = async () => {
    setUserMessage("");
    setUserError("");
    await Promise.all([fetchUsers(), fetchSystemStats()]);
    setUserMessage("Dashboard data refreshed.");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(data.error || "Failed to update password");
      }
    } catch (err) {
      setError("An error occurred while updating password");
      console.error("Password change error:", err);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserMessage("");
    setUserError("");

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.success) {
        setUserMessage("User created successfully!");
        setNewUser({ name: "", email: "", password: "", avatar: "", phone: "", bio: "", role: "manager" });
        setAddUserAvatarError("");
        setShowAddUserForm(false);
        fetchUsers();
      } else {
        setUserError(data.error || "Failed to create user");
      }
    } catch (err) {
      setUserError("An error occurred while creating user");
      console.error("User creation error:", err);
    }
  };

  const handleEditUser = (user: User) => {
    if (user.role === "super_admin") {
      setUserError("Super Admin accounts cannot be modified by non-super-admin users.");
      return;
    }

    setEditingUserId(user._id);
    setEditingTargetUser(user);
    setEditingUserData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserMessage("");
    setUserError("");

    if (!editingUserId) {
      return;
    }

    try {
      const payload: {
        userId: string;
        name: string;
        email: string;
        role: string;
        password?: string;
      } = {
        userId: editingUserId,
        name: editingUserData.name,
        email: editingUserData.email,
        role: editingUserData.role,
      };

      if (editingUserData.password) {
        payload.password = editingUserData.password;
      }

      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setUserMessage("User updated successfully!");
        handleCancelEdit();
        fetchUsers();
      } else {
        setUserError(data.error || "Failed to update user");
      }
    } catch (err) {
      setUserError("An error occurred while updating user");
      console.error("User update error:", err);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.role === "super_admin") {
      setUserError("Super Admin accounts cannot be deleted.");
      return;
    }

    if (!confirm(`Are you sure you want to delete \"${user.name}\"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users?id=${user._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setUserMessage("User deleted successfully!");
        if (editingUserId === user._id) {
          handleCancelEdit();
        }
        fetchUsers();
      } else {
        setUserError(data.error || "Failed to delete user");
      }
    } catch (err) {
      setUserError("An error occurred while deleting user");
      console.error("User deletion error:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditingTargetUser(null);
    setEditingUserData({
      name: "",
      email: "",
      password: "",
      role: "manager",
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage("");
    setResetError("");

    if (!resetUserId) {
      return;
    }

    if (resetPassword !== resetConfirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    if (resetPassword.length < 6) {
      setResetError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: resetUserId._id,
          password: resetPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResetMessage("Password reset successfully! The user can now log in with the new password.");
        setResetPassword("");
        setResetConfirmPassword("");
        setTimeout(() => setResetUserId(null), 1400);
      } else {
        setResetError(data.error || "Failed to reset password");
      }
    } catch (err) {
      setResetError("An error occurred while resetting password");
      console.error("Password reset error:", err);
    }
  };

  const openResetPassword = (user: User) => {
    setResetUserId(user);
    setResetPassword("");
    setResetConfirmPassword("");
    setResetMessage("");
    setResetError("");
  };

  const generateStrongPassword = (length = 14) => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";
    let generated = "";
    for (let i = 0; i < length; i += 1) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return generated;
  };

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  const optimizeAvatar = async (file: File): Promise<string> => {
    const raw = await toDataUrl(file);
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = raw;
    });

    const maxSize = 420;
    const ratio = Math.min(maxSize / image.width, maxSize / image.height, 1);
    const width = Math.max(1, Math.round(image.width * ratio));
    const height = Math.max(1, Math.round(image.height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to prepare image preview");

    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.86);
  };

  const handleNewUserAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAddUserAvatarError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAddUserAvatarError("Image is too large. Please choose a file under 5MB.");
      return;
    }

    setAddUserAvatarError("");
    setAddUserAvatarUploading(true);
    try {
      const optimized = await optimizeAvatar(file);
      setNewUser((prev) => ({ ...prev, avatar: optimized }));
    } catch (uploadErr) {
      console.error("Failed to process avatar:", uploadErr);
      setAddUserAvatarError("Failed to process image. Please try another file.");
    } finally {
      setAddUserAvatarUploading(false);
      e.target.value = "";
    }
  };

  const applyGeneratedPasswordToNewUser = () => {
    const generated = generateStrongPassword();
    setNewUser((prev) => ({ ...prev, password: generated }));
    setUserMessage("Strong password generated for new user.");
  };

  const applyGeneratedPasswordToEditUser = () => {
    const generated = generateStrongPassword();
    setEditingUserData((prev) => ({ ...prev, password: generated }));
    setUserMessage("Strong password generated for selected user.");
  };

  const applyGeneratedPasswordToReset = () => {
    const generated = generateStrongPassword();
    setResetPassword(generated);
    setResetConfirmPassword(generated);
    setResetMessage("Strong password generated. Review it before reset.");
  };

  const copyToClipboard = async (value: string, successText: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setUserMessage(successText);
      setUserError("");
    } catch {
      setUserError("Clipboard access was blocked. Please copy manually.");
    }
  };

  const exportUsersCsv = () => {
    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      roleLabel(user.role),
      new Date(user.createdAt).toLocaleDateString(),
    ]);

    const header = ["Name", "Email", "Role", "Created"];
    const csv = [header, ...rows]
      .map((line) => line.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users-export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setUserMessage("Filtered users exported to CSV.");
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "admin":
        return "Admin";
      case "manager":
        return "Manager";
      case "rep":
        return "Representative";
      case "user":
        return "User";
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
      case "admin":
        return "bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200";
      case "manager":
        return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
      case "rep":
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
      case "user":
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }
  };

  const initialsOf = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0]?.toUpperCase() || "")
      .join("");

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) {
      return { score: 0, label: "No password", barClass: "w-0", textClass: "text-slate-400" };
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      return { score, label: "Weak", barClass: "w-1/3 bg-rose-500", textClass: "text-rose-600" };
    }
    if (score <= 4) {
      return { score, label: "Medium", barClass: "w-2/3 bg-amber-500", textClass: "text-amber-600" };
    }

    return { score, label: "Strong", barClass: "w-full bg-emerald-500", textClass: "text-emerald-600" };
  };

  const overviewStats = [
    {
      label: "System Users",
      value: systemStats.users,
      icon: <Users className="h-5 w-5" />,
      gradient: "from-sky-500 via-blue-600 to-indigo-700",
      glow: "bg-sky-400",
      change: "Access directory",
    },
    {
      label: "Employees",
      value: systemStats.employees,
      icon: <Shield className="h-5 w-5" />,
      gradient: "from-emerald-500 via-green-600 to-teal-700",
      glow: "bg-emerald-400",
      change: "People records",
    },
    {
      label: "Projects",
      value: systemStats.projects,
      icon: <Activity className="h-5 w-5" />,
      gradient: "from-violet-500 via-purple-600 to-indigo-700",
      glow: "bg-violet-400",
      change: "Execution board",
    },
    {
      label: "Leads",
      value: systemStats.leads,
      icon: <Sparkles className="h-5 w-5" />,
      gradient: "from-amber-500 via-orange-500 to-rose-600",
      glow: "bg-amber-400",
      change: "Pipeline inflow",
    },
  ];

  const filteredUsers = useMemo(() => {
    const lowered = searchQuery.trim().toLowerCase();
    return users
      .filter((user) => (roleFilter === "all" ? true : user.role === roleFilter))
      .filter((user) => {
        if (!lowered) {
          return true;
        }
        return (
          user.name.toLowerCase().includes(lowered) ||
          user.email.toLowerCase().includes(lowered) ||
          roleLabel(user.role).toLowerCase().includes(lowered)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [users, roleFilter, searchQuery]);

  const roleCount = useMemo(() => {
    return users.reduce<Record<string, number>>((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
  }, [users]);

  const newUserStrength = getPasswordStrength(newUser.password);
  const editUserStrength = getPasswordStrength(editingUserData.password);
  const resetUserStrength = getPasswordStrength(resetPassword);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 p-6 text-white shadow-2xl">
        <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/20 px-3 py-1 text-xs font-semibold text-cyan-50 backdrop-blur-sm">
              <Wrench className="h-3.5 w-3.5" />
              Control Tower
            </div>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">System Settings</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              Manage access, secure admin credentials, and tune platform operations with a cleaner and stronger workflow.
            </p>
          </div>
          <button
            onClick={handleRefreshData}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/80 bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-800 hover:shadow-lg"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="group [perspective:1000px]">
            <div className="relative transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
              <div className={`absolute -inset-2 rounded-3xl ${stat.glow} opacity-30 blur-xl`} />
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-xl card-gloss`}>
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border-4 border-white/15" />
                <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/85">{stat.label}</p>
                    <h4 className="mt-2 text-3xl font-black tracking-tight text-white transition-transform duration-300 group-hover:translate-x-0.5">
                      {stat.value}
                    </h4>
                  </div>
                  <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm ring-1 ring-white/30">
                    {stat.icon}
                  </div>
                </div>

                <div className="relative mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold ring-1 ring-white/25 backdrop-blur-sm">
                    {stat.change}
                  </span>
                  <span className="text-xs font-bold text-white/85">Live</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">General Settings</h3>
            <p className="mt-1 text-sm text-slate-500">Primary information for your admin control center.</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 md:inline-flex">
            <Sparkles className="h-3.5 w-3.5" />
            Configuration Preview
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Site Name</label>
            <input
              type="text"
              defaultValue="BawdicSoft"
              className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Admin Email</label>
            <input
              type="email"
              defaultValue="xyz123@example.com"
              className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">User Management</h3>
            <p className="mt-1 text-sm text-slate-500">Search, filter, edit, secure and export users with faster workflows.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportUsersCsv}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              onClick={() => setShowAddUserForm(!showAddUserForm)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <UserPlus className="h-4 w-4" />
              {showAddUserForm ? "Cancel" : "Add User"}
            </button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email or role"
              className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="rep">Representative</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">Total: {users.length}</span>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">Visible: {filteredUsers.length}</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">Super Admin: {roleCount.super_admin || 0}</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Managers: {roleCount.manager || 0}</span>
        </div>

        {showAddUserForm && (
          <div className="mb-6 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-sky-50 p-4 shadow-inner transition-all duration-300">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-semibold text-slate-800">Add New User</h4>
              <button
                type="button"
                onClick={applyGeneratedPasswordToNewUser}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-white px-3 py-1.5 text-xs font-semibold text-cyan-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow"
              >
                <KeyRound className="h-3.5 w-3.5" />
                Generate Strong Password
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3">
              <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/60 to-sky-50/70 p-4">
                <h5 className="text-sm font-bold text-slate-900">Profile Photo</h5>
                <p className="mt-1 text-xs text-slate-500">Upload a profile picture or paste an image URL.</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {newUser.avatar ? (
                    <img src={newUser.avatar} alt="User avatar preview" className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-black text-white shadow-md">
                      {newUser.name ? initialsOf(newUser.name) : "U"}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex h-10 cursor-pointer items-center whitespace-nowrap rounded-xl border border-cyan-200 bg-white px-4 text-sm font-semibold text-cyan-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-md">
                      {addUserAvatarUploading ? "Processing..." : "Upload Photo"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleNewUserAvatarUpload} disabled={addUserAvatarUploading} />
                    </label>
                    {newUser.avatar && (
                      <button
                        type="button"
                        className="inline-flex h-10 items-center whitespace-nowrap rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100"
                        onClick={() => setNewUser((prev) => ({ ...prev, avatar: "" }))}
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Avatar Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newUser.avatar}
                    onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="https://example.com/profile-photo.jpg"
                  />
                </div>
                {addUserAvatarError && <p className="mt-2 text-xs font-medium text-red-600">{addUserAvatarError}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Enter user's full name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="text"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Set password"
                    required
                  />
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
                    <div className={`h-full rounded-full transition-all duration-300 ${newUserStrength.barClass}`} />
                  </div>
                  <p className={`mt-1 text-xs font-semibold ${newUserStrength.textClass}`}>Strength: {newUserStrength.label}</p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="rep">Representative</option>
                    <option value="user">User (Employee Portal)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Bio (Optional)</label>
                  <textarea
                    value={newUser.bio}
                    onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                    className="min-h-[92px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Short profile summary, team responsibility, or notes."
                    maxLength={500}
                  />
                  <p className="mt-1 text-xs text-slate-400">{newUser.bio.length}/500</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        )}

        {userMessage && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{userMessage}</div>
        )}

        {userError && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{userError}</div>
        )}

        {loadingUsers ? (
          <div className="flex justify-center py-12">
            <div className="relative">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600" />
              <div className="absolute inset-0 rounded-full bg-cyan-300/20 blur-md" />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-sky-700 to-cyan-700 text-white">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Role</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Created</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="transition-colors duration-200 hover:bg-cyan-50/50">
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-sm">
                            {user.avatar ? (
                              <img src={user.avatar} alt={`${user.name} avatar`} className="h-9 w-9 rounded-full object-cover" />
                            ) : (
                              initialsOf(user.name)
                            )}
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-sm text-slate-600">
                        <div className="inline-flex items-center gap-2">
                          {user.email}
                          <button
                            type="button"
                            onClick={() => copyToClipboard(user.email, "Email copied to clipboard.")}
                            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            title="Copy email"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${roleBadgeColor(user.role)}`}>
                          {roleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-sm text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-right text-sm font-medium">
                        {user.role === "super_admin" ? (
                          <span className="text-xs text-slate-400">Protected</span>
                        ) : (
                          <button
                            onClick={() => handleEditUser(user)}
                            className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-100"
                          >
                            Edit User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-500">No users match current filters.</div>
            )}
          </div>
        )}

        {editingUserId && editingTargetUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/45 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Edit User</h3>
                  <p className="text-sm text-slate-500">Update profile, role, password and account access actions from one place.</p>
                </div>
                <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                  {roleLabel(editingTargetUser.role)}
                </span>
              </div>

              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      value={editingUserData.name}
                      onChange={(e) => setEditingUserData({ ...editingUserData, name: e.target.value })}
                      className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={editingUserData.email}
                      onChange={(e) => setEditingUserData({ ...editingUserData, email: e.target.value })}
                      className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <label className="block text-sm font-medium text-slate-700">Password (leave blank to keep current)</label>
                    <button
                      type="button"
                      onClick={applyGeneratedPasswordToEditUser}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 transition-colors hover:bg-cyan-100"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editingUserData.password}
                    onChange={(e) => setEditingUserData({ ...editingUserData, password: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Optional password update"
                  />
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
                    <div className={`h-full rounded-full transition-all duration-300 ${editUserStrength.barClass}`} />
                  </div>
                  <p className={`mt-1 text-xs font-semibold ${editUserStrength.textClass}`}>Strength: {editUserStrength.label}</p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
                  <select
                    value={editingUserData.role}
                    onChange={(e) => setEditingUserData({ ...editingUserData, role: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="rep">Representative</option>
                    <option value="user">User (Employee Portal)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => openResetPassword(editingTargetUser)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-amber-700 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-xs font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Reset Password
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(editingTargetUser)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-rose-800 bg-gradient-to-r from-rose-600 to-red-600 px-3 py-2 text-xs font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete User
                  </button>
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl border border-blue-700 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {resetUserId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
              <h3 className="mb-2 text-lg font-extrabold text-slate-900">Reset Password</h3>
              <p className="mb-4 text-sm text-slate-500">
                Set a new password for <span className="font-semibold text-slate-700">{resetUserId.name}</span> ({resetUserId.email}).
              </p>

              {resetMessage && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{resetMessage}</div>
              )}
              {resetError && (
                <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{resetError}</div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">New Password</label>
                    <button
                      type="button"
                      onClick={applyGeneratedPasswordToReset}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700 transition-colors hover:bg-cyan-100"
                    >
                      <KeyRound className="h-3 w-3" />
                      Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Enter new password"
                    required
                  />
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
                    <div className={`h-full rounded-full transition-all duration-300 ${resetUserStrength.barClass}`} />
                  </div>
                  <p className={`mt-1 text-xs font-semibold ${resetUserStrength.textClass}`}>Strength: {resetUserStrength.label}</p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</label>
                  <input
                    type="text"
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetUserId(null)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-700"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <h3 className="mb-4 text-lg font-extrabold text-slate-900">Admin Account</h3>
        <div className="space-y-4">
          {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}
          {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

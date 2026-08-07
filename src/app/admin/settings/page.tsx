"use client";
import { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // User management states
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'manager'
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUserData, setEditingUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'manager'
  });
const [loadingUsers, setLoadingUsers] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [userError, setUserError] = useState('');

  // Reset password states
  const [resetUserId, setResetUserId] = useState<User | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  // System overview states
  const [systemStats, setSystemStats] = useState({
    users: 0,
    employees: 0,
    projects: 0,
    leads: 0,
  });

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    try {
      const [usersRes, employeesRes, projectsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/employees'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/leads'),
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
      console.error('Error fetching system stats:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch('/api/admin/users');
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setUserError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setUserError('An error occurred while fetching users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Call API to change password
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch (err) {
      setError('An error occurred while updating password');
      console.error('Password change error:', err);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserMessage('');
    setUserError('');

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.success) {
        setUserMessage('User created successfully!');
        setNewUser({ name: '', email: '', password: '', role: 'manager' });
        setShowAddUserForm(false);
        fetchUsers(); // Refresh the user list
      } else {
        setUserError(data.error || 'Failed to create user');
      }
    } catch (err) {
      setUserError('An error occurred while creating user');
      console.error('User creation error:', err);
    }
  };

  const handleEditUser = (user: User) => {
    // Prevent admins from editing super_admin accounts
    if (user.role === 'super_admin') {
      setUserError('Super Admin accounts cannot be modified by non-super-admin users.');
      return;
    }
    setEditingUserId(user._id);
    setEditingUserData({
      name: user.name,
      email: user.email,
      password: '', // Don't populate with actual password for security
      role: user.role
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserMessage('');
    setUserError('');

    if (!editingUserId) return;

    try {
      const payload: any = {
        userId: editingUserId,
        name: editingUserData.name,
        email: editingUserData.email,
        role: editingUserData.role
      };

      // Only send password if it's provided (for changing password)
      if (editingUserData.password) {
        payload.password = editingUserData.password;
      }

      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setUserMessage('User updated successfully!');
        setEditingUserId(null);
        fetchUsers(); // Refresh the user list
      } else {
        setUserError(data.error || 'Failed to update user');
      }
    } catch (err) {
      setUserError('An error occurred while updating user');
      console.error('User update error:', err);
    }
  };

  const handleDeleteUser = async (user: User) => {
    // Prevent admins from deleting super_admin accounts
    if (user.role === 'super_admin') {
      setUserError('Super Admin accounts cannot be deleted.');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${user.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users?id=${user._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setUserMessage('User deleted successfully!');
        fetchUsers(); // Refresh the user list
      } else {
        setUserError(data.error || 'Failed to delete user');
      }
    } catch (err) {
      setUserError('An error occurred while deleting user');
      console.error('User deletion error:', err);
    }
  };

const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setResetError('');

    if (!resetUserId) return;

    if (resetPassword !== resetConfirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    if (resetPassword.length < 6) {
      setResetError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: resetUserId._id,
          password: resetPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResetMessage('Password reset successfully! The user can now log in with the new password.');
        setResetPassword('');
        setResetConfirmPassword('');
        setTimeout(() => setResetUserId(null), 1500);
      } else {
        setResetError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setResetError('An error occurred while resetting password');
      console.error('Password reset error:', err);
    }
  };

  const openResetPassword = (user: User) => {
    setResetUserId(user);
    setResetPassword('');
    setResetConfirmPassword('');
    setResetMessage('');
    setResetError('');
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'rep': return 'Representative';
      case 'user': return 'User';
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-yellow-100 text-yellow-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'rep': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const overviewStats = [
    { label: 'System Users', value: systemStats.users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Employees', value: systemStats.employees, color: 'bg-green-50 text-green-600' },
    { label: 'Projects', value: systemStats.projects, color: 'bg-purple-50 text-purple-600' },
    { label: 'Leads', value: systemStats.leads, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
        <p className="text-sm text-gray-500 mb-6">A quick snapshot of your platform&apos;s data across all modules.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className="mt-2 flex items-center justify-between">
                <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}>{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              defaultValue="BawdicSoft"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              defaultValue="xyz123@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <button
            onClick={() => setShowAddUserForm(!showAddUserForm)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {showAddUserForm ? 'Cancel' : 'Add User'}
          </button>
        </div>

        {showAddUserForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Add New User</h4>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="Enter user's full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="rep">Representative</option>
                    <option value="user">User (Employee Portal)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        )}

        {userMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
            {userMessage}
          </div>
        )}

        {userError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {userError}
          </div>
        )}

        {loadingUsers ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleBadgeColor(user.role)}`}>
                        {roleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.role === 'super_admin' ? (
                        <span className="text-gray-400 text-xs">Protected</span>
                      ) : (
                        <>
<button
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openResetPassword(user)}
                            className="text-amber-600 hover:text-amber-900 mr-3"
                          >
                            Reset Password
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found. Add a new user to get started.
              </div>
            )}
          </div>
        )}

        {/* Edit User Modal */}
        {editingUserId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User</h3>

              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editingUserData.name}
                    onChange={(e) => setEditingUserData({...editingUserData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editingUserData.email}
                    onChange={(e) => setEditingUserData({...editingUserData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    value={editingUserData.password}
                    onChange={(e) => setEditingUserData({...editingUserData, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="Enter new password (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={editingUserData.role}
                    onChange={(e) => setEditingUserData({...editingUserData, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="rep">Representative</option>
                    <option value="user">User (Employee Portal)</option>
                  </select>
                </div>

<div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {resetUserId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Password</h3>
              <p className="text-sm text-gray-500 mb-4">
                Set a new password for <span className="font-medium text-gray-900">{resetUserId.name}</span> ({resetUserId.email}). The user can log in with this new password. No current password is required.
              </p>

              {resetMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {resetMessage}
                </div>
              )}
              {resetError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {resetError}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setResetUserId(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Admin Account */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Account</h3>
        <div className="space-y-4">
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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


# Role-Based Hierarchy System - Implementation Plan

## Steps
- [x] Create role helper utility (`src/lib/roles.ts`)
- [x] Add `super_admin` role to User model (`src/models/user.ts`)
- [x] Update admin layout with role-based nav + role badge (`src/app/admin/layout.tsx`)
- [x] Update standalone sidebar component (`src/components/admin/sidebar.tsx`)
- [x] Update login redirect logic for new roles (`src/app/auth/login/page.tsx`)
- [x] Gate "Salary" sub-nav tab by role in employee management pages
- [x] Enforce role checks on API routes (employees, salary, attendance, leaves, users, delete-all-data)
- [x] Update settings page: remove "Delete All Data", add "System Overview" + super_admin protection
- [x] Typecheck/build to verify (clean, no project-specific TS errors)

## Password Reset & User Creation
- [x] Create `create-user.js` CLI script (any role: super_admin, admin, manager, rep, user) - reads `.env.local` for MONGODB_URI
- [x] Add dedicated "Reset Password" button + modal in Settings -> User Management (super_admin/admin only)
- [x] Reset password works WITHOUT current password (for forgotten passwords) - reuses `/api/admin/users` PUT
- [x] Super Admin accounts remain "Protected" (no reset/edit/delete) - only one super admin
- [x] Admin Account (change own password) still requires current password
- [x] Employee portal self-serve change password still requires current password; forgotten passwords are reset by Super Admin/Admin via Settings

## How to create users
```
# From project root
node create-user.js "Main Super Admin" super@bawdicsoft.com MyPass123 super_admin
node create-user.js "Admin User" admin@bawdicsoft.com AdminPass123 admin
node create-user.js "Manager User" manager@bawdicsoft.com ManagerPass manager
node create-user.js "Rep User" rep@bawdicsoft.com RepPass123 rep
node create-user.js "Employee One" emp@bawdicsoft.com EmpPass123 user

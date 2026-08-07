// Role-based access control helpers
// Roles: super_admin (highest), admin, manager, rep, user (employee portal)

export type Role = 'super_admin' | 'admin' | 'manager' | 'rep' | 'user';

// Roles that can access the admin portal/dashboard
export const ADMIN_PORTAL_ROLES: Role[] = ['super_admin', 'admin', 'manager', 'rep'];

// Roles that can access employee management module
export const EMPLOYEE_MGMT_ROLES: Role[] = ['super_admin', 'admin', 'manager'];

// Roles that can access salary data (within employee management)
export const SALARY_ROLES: Role[] = ['super_admin', 'admin'];

// Roles that can access settings (incl. user management)
export const SETTINGS_ROLES: Role[] = ['super_admin', 'admin'];

// Roles that can manage users (create/edit/delete)
export const USER_MGMT_ROLES: Role[] = ['super_admin', 'admin'];

// Roles that can delete all data (destructive)
export const DESTRUCTIVE_ROLES: Role[] = ['super_admin'];

export function hasRole(role: string | undefined, allowed: Role[]): boolean {
  if (!role) return false;
  return allowed.includes(role as Role);
}

// A super_admin record is protected from modification/deletion by non-super-admin users
export function canManageTarget(targetRole: string | undefined, actorRole: string | undefined): boolean {
  // If target is a super_admin, only a super_admin can manage them
  if (targetRole === 'super_admin') {
    return actorRole === 'super_admin';
  }
  // Otherwise, super_admin and admin can manage
  return actorRole === 'super_admin' || actorRole === 'admin';
}

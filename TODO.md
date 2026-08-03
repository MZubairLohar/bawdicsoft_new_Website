 # Deployment Fix - TODO

## Goal
Fix all empty (0-byte) files that break the Next.js build and deployment, by filling them with error-free code. Do NOT delete any files.

## Steps

### 1. Models & Lib (foundation)
- [x] `src/models/user.ts` - User Mongoose schema (name, email, hashed password, role)
- [x] `src/models/lead.ts` - Lead Mongoose schema
- [x] `src/lib/auth.ts` - Session token create/verify helpers (crypto-based, no new deps)

### 2. API Routes (blocking the build)
- [x] `src/app/api/admin/analytics/route.ts` - GET analytics (project/lead counts)
- [x] `src/app/api/admin/leads/route.ts` - GET/POST leads
- [x] `src/app/api/admin/leads/[id]/route.ts` - GET/PUT/DELETE single lead
- [x] `src/app/api/auth/login/route.js` - POST login (verify creds, set session cookie)
- [x] `src/app/api/auth/logout/route.js` - POST logout (clear session cookie)
- [x] `src/app/api/auth/session/route.js` - GET current session user
- [x] `src/app/api/auth/signup/route.js` - POST signup (create user)

### 3. Admin Components (unused stubs - fill with error-free code)
- [x] `src/components/admin/sidebar.tsx`
- [x] `src/components/admin/AdminNavbar.tsx`
- [x] `src/components/admin/DashboardStats.tsx`
- [x] `src/components/admin/ImageUpload.tsx`
- [x] `src/components/admin/LeadTable.tsx`
- [x] `src/components/admin/ProjectForm.tsx`
- [x] `src/components/admin/ProjectTable.tsx`

### 4. Auth Components (unused stubs - fill with error-free code)
- [x] `src/components/auth/AuthButton.tsx`
- [x] `src/components/auth/AuthModal.tsx`
- [x] `src/components/auth/LoginForm.tsx`
- [x] `src/components/auth/SignupForm.tsx`

### 5. Config Fix (non-blocking warning)
- [x] `next.config.js` - replace deprecated `images.domains` with `remotePatterns`

### 6. Verify
- [ ] Run `npm run build` and confirm it passes
- [ ] Confirm no working code was broken

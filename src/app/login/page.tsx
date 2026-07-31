import { redirect } from 'next/navigation';

// Redirect from /login to /auth/login
export default function LoginRedirect() {
  redirect('/auth/login');
}
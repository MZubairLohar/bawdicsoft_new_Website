import { redirect } from 'next/navigation';

// Redirect from /signup to /auth/signup
export default function SignupRedirect() {
  redirect('/auth/signup');
}
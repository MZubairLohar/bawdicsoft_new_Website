'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  // Redirect to login page since signup is disabled
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Account Creation Disabled
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-gray-600">
            Sorry, new account registration is currently disabled.
          </p>
          <p className="text-gray-600">
            Please contact the administrator to request access.
          </p>
          <p className="text-gray-600">
            You will be redirected to the login page shortly...
          </p>
          
          <div className="mt-6">
            <a 
              href="/auth/login" 
              className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Login Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
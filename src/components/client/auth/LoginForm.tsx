'use client';
import { useState } from 'react';
import Link from 'next/link';
import useStore from '@/lib/hooks/useStore';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/lib/handlers/login';
export default function LoginForm() {
  const [loginType, setLoginType] = useState<string>('username');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const router = useRouter();
  const { dispatch } = useStore();
  const submitlogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsLoggingIn(true);
    const success = await handleLogin(e, dispatch);
    if (success) {
      router.push('/');
    }
    setIsLoggingIn(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className={`${
          isLoggingIn && 'hidden'
        } bg-white p-6 rounded-lg shadow-lg max-w-sm w-full`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Login with:
          </label>
          <div className="flex space-x-4">
            <button
              className={`w-1/2 py-2 text-center rounded-lg transition-colors ${
                loginType === 'username'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setLoginType('username')}
              type="button"
            >
              Username
            </button>
            <button
              className={`w-1/2 py-2 text-center rounded-lg transition-colors ${
                loginType === 'email'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setLoginType('email')}
            >
              Email
            </button>
          </div>
        </div>

        <form onSubmit={submitlogin} className="space-y-4">
          {loginType === 'username' ? (
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <h3 className={`${isLoggingIn && 'hidden'}`}>
            New user? Create an account{' '}
            <Link href="/login/register">
              <span className="font-bold">here</span>
            </Link>
          </h3>
        </div>
      </div>
      <div
        className={`${
          isLoggingIn && 'block'
        } hidden bg-white p-6 rounded-lg shadow-lg max-w-sm w-full`}
      >
        Logging in...
      </div>
    </div>
  );
}

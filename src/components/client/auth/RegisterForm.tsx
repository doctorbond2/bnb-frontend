'use client';
// import { useState } from 'react';
import Link from 'next/link';
import { handleRegister } from '@/lib/handlers/login';
import { useRouter } from 'next/navigation';
import {
  RegisterFormActionType as ACTION,
  initialRegisterFormState as init,
} from '@/reducer/registerFormReducer';
import registerFormReducer from '@/reducer/registerFormReducer';
import { useReducer } from 'react';

export default function RegisterForm() {
  const [state, updateForm] = useReducer(registerFormReducer, init);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submitting');
    const validRegister = await handleRegister(e, state, updateForm);
    if (validRegister) {
      router.push('/login');
      updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
    }
  };
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Spaceshare!
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              value={state.firstName}
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_FIRSTNAME,
                  payload: e.target.value,
                });
              }}
              name="firstname"
              placeholder="Enter your firstname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_LASTNAME,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your lastname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_USERNAME,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_EMAIL,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_PASSWORD,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Repeat Password:
            </label>
            <input
              type="password"
              id="repeat_password"
              name="repeat_password"
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_REPEAT_PASSWORD,
                  payload: e.target.value,
                });
              }}
              placeholder="Repeat your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <h3>
            Already a member?{' '}
            <Link href="/login" className="font-bold">
              Login
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

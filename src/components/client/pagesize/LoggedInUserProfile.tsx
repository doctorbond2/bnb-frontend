'use client';
import { User } from '@/models/interfaces/user';

export default function LoggedInUserProfile({ user }: { user: User }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Profile</h2>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 overflow-hidden">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome back, {user.firstName}!
        </h1>
        <ul className="space-y-3">
          <li className="flex items-center">
            <span className="font-medium text-gray-700 w-32">Name:</span>
            <span className="text-gray-900">
              {user.firstName} {user.lastName}
            </span>
          </li>
          <li className="flex items-center">
            <span className="font-medium text-gray-700 w-32">Username:</span>
            <span className="text-gray-900">{user.username}</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium text-gray-700 w-32">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </li>
          {user.fullName && (
            <li className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Full Name:</span>
              <span className="text-gray-900">{user.fullName}</span>
            </li>
          )}
          {user.admin && (
            <li className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Role:</span>
              <span className="text-green-600 font-semibold">Admin</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
import { User } from '@/models/interfaces/user';
import { useState } from 'react';
export default function AllUsersList({ userList }: { userList: User[] }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h1>

      <ul>
        <div className="space-y-4">
          {userList.map((user) => (
            <li key={user.id}>
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
                <div className="text-gray-700">
                  <p className="text-sm">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">ID: {user.id}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

'use client';
import { User } from '@/models/interfaces/user';
import { sendRequest } from '@/lib/helpers/fetch';
import { useState } from 'react';

export default function AllUsersList({ userList }: { userList: User[] }) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const softDelete = async (id: string) => {
    const decision = confirm('Are you sure you want to soft delete this user?');
    if (!decision) {
      return;
    }
    try {
      await sendRequest({
        url: '/api/admin/users/:id',
        method: 'DELETE',
        id,
        query: { soft: true },
      });
      alert('User soft deleted, reloading page...');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const hardDelete = async (id: string) => {
    const decision = confirm('Are you sure you want to hard delete this user?');
    if (!decision) {
      return;
    }
    try {
      await sendRequest({
        url: '/api/admin/users/:id',
        method: 'DELETE',
        id,
      });
      alert('User hard deleted, reloading page...');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const hardDeleteMany = async () => {
    const decision = confirm(
      'Are you sure you want to hard delete these users?'
    );
    if (!decision) {
      return;
    }
    try {
      await sendRequest({
        url: '/api/admin/users',
        method: 'DELETE',
        body: { userIds: selectedUsers },
      });
      alert('Users hard deleted, reloading page...');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const purge = async (id: string) => {
    const decision = confirm('Are you sure you want to purge this user?');
    if (!decision) {
      return;
    }
    try {
      await sendRequest({
        url: '/api/admin/users/:id',
        method: 'DELETE',
        id,
        query: { purge: true },
      });
      alert('User purged, reloading page...');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h1>

      <ul>
        <div className="space-y-4">
          {userList &&
            userList.map((user) => (
              <li key={user.id}>
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 ">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <input
                      type="checkbox"
                      value={user.id || ''}
                      className="mr-2 leading-tight justify-self-end"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, e.target.value]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((id) => id !== e.target.value)
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="text-gray-700">
                    <p className="text-sm">{user.email}</p>
                    <p className="text-sm text-gray-500 mt-1">ID: {user.id}</p>
                  </div>
                  <button
                    onClick={() => {
                      softDelete(user.id);
                    }}
                  >
                    Soft Delete
                  </button>
                  <button
                    onClick={() => {
                      hardDelete(user.id);
                    }}
                  >
                    Hard Delete
                  </button>
                </div>
              </li>
            ))}
        </div>
      </ul>
    </div>
  );
}

'use client';
import { sendRequest } from '@/lib/helpers/fetch';
import { useState } from 'react';
import { User } from '@/models/interfaces/user';
import ROUTES from '@/lib/routes';

export default function DeletedUsers({ userList }: { userList: User[] }) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    open: boolean;
    type: 'single' | 'many' | 'clear' | null;
  }>({ open: false, type: null });
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');

  const hardDelete = async (id: string) => {
    try {
      const response: { status: number } = await sendRequest({
        url: ROUTES.ADMIN.USERS_ID,
        method: 'DELETE',
        body: { password: adminPassword },
        id,
      });
      if (response.status === 204) {
        alert('User deleted, reloading page...');
        location.reload();
      }
    } catch {
      alert('Invalid request');
    } finally {
      setAdminPassword('');
    }
  };

  const hardDeleteMany = async () => {
    try {
      await sendRequest({
        url: ROUTES.ADMIN.USERS,
        method: 'DELETE',
        body: { userIds: selectedUsers, password: adminPassword },
      });
      alert('Users hard deleted, reloading page...');
      location.reload();
    } catch {
      alert('Invalid request');
    } finally {
      setAdminPassword('');
    }
  };

  const clearUserDataBase = async () => {
    const userIds: string[] = userList.map((user) => user.id);
    try {
      await sendRequest({
        url: ROUTES.ADMIN.USERS,
        method: 'DELETE',
        body: { userIds, password: adminPassword },
      });
      alert('All users hard deleted, reloading page...');
      location.reload();
    } catch {
      alert('Invalid request');
    } finally {
      setAdminPassword('');
    }
  };

  const openModal = (type: 'single' | 'many' | 'clear', userId = '') => {
    setIsModalOpen({ open: true, type });
    setSelectedUser(userId);
  };

  const confirmDelete = () => {
    setIsModalOpen({ open: false, type: null });

    if (isModalOpen.type === 'single' && selectedUser) {
      hardDelete(selectedUser);
    } else if (isModalOpen.type === 'many') {
      hardDeleteMany();
    } else if (isModalOpen.type === 'clear') {
      clearUserDataBase();
    }
  };

  return (
    <div className="p-6 bg-gray-50 max-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Deleted Users
      </h1>
      <div className="flex space-x-4 mb-4">
        <button
          disabled={selectedUsers.length < 1}
          onClick={() => openModal('many')}
          className={`px-4 py-2 ${
            selectedUsers.length < 1
              ? 'bg-gray-300 text-gray-800'
              : 'bg-red-500 text-white'
          } rounded-md`}
        >
          Hard Delete Selected
        </button>
        <button
          onClick={() => openModal('clear')}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Purge
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left">Select</th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Name
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Email
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Username
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              ID
            </th>
            <th className="py-3 px-4 text-center text-gray-700 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers([...selectedUsers, user.id]);
                    } else {
                      setSelectedUsers(
                        selectedUsers.filter((id) => id !== user.id)
                      );
                    }
                  }}
                />
              </td>
              <td className="py-3 px-4 text-gray-900">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-3 px-4 text-gray-900">{user.email}</td>
              <td className="py-3 px-4 text-gray-700">{user.username}</td>
              <td className="py-3 px-4 text-gray-700">{user.id}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => openModal('single', user.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {isModalOpen.type === 'single' && 'Confirm Single Deletion'}
              {isModalOpen.type === 'many' && 'Confirm Multiple Deletions'}
              {isModalOpen.type === 'clear' && 'Confirm Purge'}
            </h2>
            <input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen({ open: false, type: null })}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

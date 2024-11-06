'use client';
import { User } from '@/models/interfaces/user';
import { sendRequest } from '@/lib/helpers/fetch';
import ROUTES from '@/lib/routes';

export default function AllUsersList({ userList }: { userList: User[] }) {
  const softDelete = async (id: string) => {
    if (confirm('Are you sure you want to soft delete this user?')) {
      try {
        await sendRequest({
          url: ROUTES.ADMIN.USERS_ID,
          method: 'DELETE',
          query: { soft: true },
          id,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="p-6 bg-gray-50 max-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Active Users
      </h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700 font-medium">
              Name
            </th>
            <th className="py-2 px-4 text-left text-gray-700 font-medium">
              Role
            </th>
            <th className="py-2 px-4 text-left text-gray-700 font-medium">
              Email
            </th>
            <th className="py-2 px-4 text-left text-gray-700 font-medium">
              Username
            </th>
            <th className="py-2 px-4 text-left text-gray-700 font-medium">
              User ID
            </th>
            <th className="py-2 px-4 text-left text-gray-700 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-4 text-gray-900 overflow-auto">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-3 px-4 text-gray-700 overflow-auto">
                {user.admin ? 'Admin' : 'User'}
              </td>
              <td className="py-3 px-4 text-gray-700 overflow-auto">
                {user.email}
              </td>
              <td className="py-3 px-4 text-gray-700 overflow-auto ">
                {user.username}
              </td>
              <td className="py-3 px-4 text-gray-500 overflow-auto">
                {user.id}
              </td>

              <td className="py-3 px-4 space-x-2">
                <button
                  disabled={user.admin}
                  onClick={() => softDelete(user.id)}
                  className={`px-3 py-1 text-white rounded-md ${
                    user.admin ? 'cursor-not-allowed bg-red-300' : 'bg-red-600'
                  }`}
                >
                  Soft Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

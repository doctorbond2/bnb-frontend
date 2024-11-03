import { sendServerRequest } from '@/lib/helpers/severFetch';
import { User } from '@/models/interfaces/user';
import AllUsersList from '@/components/client/admin/AllUsersList';
import DeletedUsers from '@/components/client/admin/DeletedUsers';
const getData = async () => {
  const response: User[] | undefined = await sendServerRequest({
    url: '/api/admin/users',
    method: 'GET',
  });

  return response || [];
};
export default async function Page() {
  try {
    const response = await getData();
    if (!response || response.length < 1) {
      return <div>No users found? Impossible</div>;
    }
    const users = response.filter((user) => !user.deletedAt);
    const deletedUsers = response.filter((user) => user.deletedAt);
    console.log('deleted: ,', deletedUsers);
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
        <AllUsersList userList={users} />
        <div className={`rounded-lg max-h-screen overflow-auto`}>
          <DeletedUsers userList={deletedUsers} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

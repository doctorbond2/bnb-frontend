import { sendServerRequest } from '@/lib/helpers/severFetch';
import { User } from '@/models/interfaces/user';
import AllUsersList from '@/components/client/admin/AllUsersList';
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
      return <div>No properties found</div>;
    }
    return <AllUsersList userList={response} />;
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

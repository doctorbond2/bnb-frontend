import { GetManyResponse, Property } from '@/models/interfaces/property';
import { sendRequest } from '@/lib/helpers/fetch';
import HomePropertyList from '@/components/client/lists/HomePropertyList';
const getPropertyList = async () => {
  const response: GetManyResponse<Property> = await sendRequest({
    url: '/api/property',
    method: 'GET',
  });
  console.log('Property list:', response);
  return response;
};
export default async function Home() {
  const response = await getPropertyList();
  const propertyList = response.data;
  if (!response) {
    return <div>Error</div>;
  }
  return (
    <div>
      {/* <h2>{user && user.firstName ? user.firstName : 'Not logged in'}</h2>

      <button
        className="border-2 p-4"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button> */}
      <HomePropertyList propertyList={propertyList} />
    </div>
  );
}

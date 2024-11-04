import { GetManyResponse, Property } from '@/models/interfaces/property';
import { sendRequest } from '@/lib/helpers/fetch';
import HomePropertyList from '@/components/client/lists/HomePropertyList';
const getPropertyList = async () => {
  const response: GetManyResponse<Property> = await sendRequest({
    url: '/api/property',
    method: 'GET',
  });
  console.log('response:', response);
  return response;
};
export const dynamic = 'force-dynamic';
export default async function Home() {
  const response = await getPropertyList();

  const propertyList = response.data;
  if (!response) {
    return <div>Error</div>;
  }
  return (
    <div>
      <HomePropertyList propertyList={propertyList} />
    </div>
  );
}

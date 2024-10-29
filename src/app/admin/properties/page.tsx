import { sendServerRequest } from '@/lib/helpers/severFetch';
import { Property } from '@/models/interfaces/property';
import AllPropertiesList from '@/components/client/admin/AllPropertiesList';
const getData = async () => {
  const response: Property[] | undefined = await sendServerRequest({
    url: '/api/admin/properties',
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
    return <AllPropertiesList propertyList={response} />;
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

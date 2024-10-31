import { sendServerRequest } from '@/lib/helpers/severFetch';
import { Property } from '@/models/interfaces/property';
import AvailablePts from '@/components/client/admin/AvailablePts';
import UnavailablePts from '@/components/client/admin/UnavailablePts';
import DeletedProperties from '@/components/client/admin/DeletedProperties';
const getData = async () => {
  const response: Property[] | undefined = await sendServerRequest({
    url: '/api/admin/properties',
    method: 'GET',
  });

  return response || [];
};
export default async function Page() {
  try {
    const response: Property[] = await getData();

    const availableProperties = response.filter(
      (property) => property.available
    );
    const unAvailableProperties = response.filter(
      (property) => !property.available
    );
    const deletedProperties = response.filter((property) => property.deletedAt);
    if (!response || response.length < 1) {
      return <div>No properties found</div>;
    }
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          All Properties
        </h1>
        <AvailablePts properties={availableProperties} />
        <UnavailablePts properties={unAvailableProperties} />
        <DeletedProperties properties={deletedProperties} />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

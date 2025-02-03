import { sendServerRequest } from '@/lib/helpers/severFetch';
import { Property } from '@/models/interfaces/property';
import GoBackButton from '@/components/client/buttons/BackButton';
import AppRoutes from '@/lib/routes';
import PropertyImageShowcase from '@/components/client/property/PropertyImageShowcase';
export default async function PropertyDetailPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const response: Property = await sendServerRequest({
    url: AppRoutes.PUBLIC.PROPERTY_BY_ID,
    method: 'GET',
    id: params.propertyId,
  });
  const property = response;

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen rounded-md border border-gray-300">
        <h1 className="text-3xl font-nanum text-gray-800 mb-4">
          {property.name}
        </h1>
        <span className="text-2xl font-bold text-gray-900">
          € {property.price_per_night},00
        </span>
        <p className="text-gray-600 text-lg mb-4">
          {property.address}, {property.city}, {property.country}
        </p>
        <p className="text-gray-600 text-lg mb-4">
          {property.city}, {property.country}
        </p>
        <PropertyImageShowcase images={property.images || []} />

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200 mt-2 mb-10">
          {/* <div className="flex items-center justify-between">
          <span className="text-xl font-medium text-gray-700">
            Price per Night:
          </span>
          <span className="text-2xl font-bold text-gray-900">
            € {property.price_per_night},00
          </span>
        </div> */}

          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-gray-700">
              Available From:
            </span>
            <span className="text-gray-700">
              {formatDate(property.availableFrom as string)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-gray-700">
              Available Until:
            </span>
            <span className="text-gray-700">
              {formatDate(property.availableUntil as string)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-gray-700">
              Availability:
            </span>
            <span
              className={`${
                property.available ? 'text-green-600' : 'text-red-600'
              } font-semibold`}
            >
              {property.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
        <GoBackButton />
      </div>
    </>
  );
}

import { sendRequest } from '@/lib/helpers/fetch';
import { Property } from '@/models/interfaces/property';
import CustomImage from '@/components/server/PropertyHomeImage';
export default async function PropertyDetailPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const response: Property = await sendRequest({
    url: `/api/property/${params.propertyId}`,
    method: 'GET',
  });
  const property = response;

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {property.name}
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        {property.address}, {property.city}, {property.country}
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">
            Price per Night:
          </span>
          <span className="text-lg font-semibold text-gray-900">
            ${property.price_per_night}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">
            Available From:
          </span>
          <span className="text-gray-700">
            {formatDate(property.availableFrom as string)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">
            Available Until:
          </span>
          <span className="text-gray-700">
            {formatDate(property.availableUntil as string)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">
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
        <div>
          {property.images?.map((image) => {
            return (
              <div className="h-32 w-32" key={image.alt}>
                <CustomImage key={image.alt} image={image} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';
import { sendRequest } from '@/lib/helpers/fetch';
import { Property } from '@/models/interfaces/property';
export default function DeletedProperties({
  properties,
}: {
  properties: Property[];
}) {
  const handleHardDelete = async (propertyId: string) => {
    const decision = confirm('Are you sure?');
    if (!decision) {
      return;
    }
    await sendRequest({
      url: '/api/admin/properties',
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ul>
      <div className="space-y-4">
        {properties.map((property) => (
          <li key={property.id}>
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-wrap overflow-hidden justify-between">
              <div id="info-section">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {property.name}
                  </h3>
                </div>
                <div className="text-gray-700">
                  <p className="text-sm">{property.price_per_night}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {property.id}
                  </p>
                  <p>
                    Number of Images:{' '}
                    {property.images?.length ? property.images.length : '0'}
                  </p>
                </div>
              </div>
              <div
                id="button section"
                className="flex flex-wrap items-center space-x-2"
              >
                <button
                  className="p-2 h-fit bg-black rounded-md text-red-600"
                  onClick={() => {
                    handleHardDelete(property.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    </ul>
  );
}
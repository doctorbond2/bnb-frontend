'use client';
import { sendRequest } from '@/lib/helpers/fetch';
import { Property } from '@/models/interfaces/property';
import ROUTES from '@/lib/routes';

export default function AvailablePts({
  properties,
}: {
  properties: Property[];
}) {
  const handleSoftDelete = async (
    propertyId: string,
    propertyBookings: number
  ) => {
    const decision =
      propertyBookings > 0
        ? confirm('Are you sure? Property has bookings')
        : confirm('Are you sure?');
    if (!decision) {
      return;
    }
    try {
      const response: { status: number } = await sendRequest({
        url: ROUTES.ADMIN.PROPERTIES_ID,
        method: 'PUT',
        id: propertyId,
      });
      if (response.status === 204) {
        alert('Property deleted, reloading page...');
        location.reload();
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Name
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Price per Night
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Property ID
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Number of Images
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property.id} className="border-b">
            <td className="py-3 px-4 text-gray-900">{property.name}</td>
            <td className="py-3 px-4 text-gray-700">
              {property.price_per_night}
            </td>
            <td className="py-3 px-4 text-gray-500">{property.id}</td>
            <td className="py-3 px-4 text-gray-700">
              {property.images?.length ? property.images.length : '0'}
            </td>
            <td className="py-3 px-4 space-x-2">
              <button
                className={`px-3 py-1 rounded-md ${
                  !!property.deletedAt ? 'bg-gray-400' : 'bg-red-500'
                }`}
                onClick={() =>
                  handleSoftDelete(property.id, property.bookings.length)
                }
                disabled={!!property.deletedAt}
              >
                Soft Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

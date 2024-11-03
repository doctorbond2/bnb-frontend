'use client';
import { sendRequest } from '@/lib/helpers/fetch';
import { Property } from '@/models/interfaces/property';

export default function DeletedProperties({
  properties,
}: {
  properties: Property[];
}) {
  const handleHardDelete = async (propertyId: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await sendRequest({
        url: `/api/admin/properties/${propertyId}`,
        method: 'DELETE',
        id: propertyId,
      });
      console.log(response);
      alert('Property deleted, reloading page...');
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
          <th className="py-2 px-4 text-left text-gray-700 font-medium">P</th>
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
            <td className="py-3 px-4">
              <button
                className="px-3 py-1 bg-black text-red-600 rounded-md"
                onClick={() => handleHardDelete(property.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

'use client';
import { sendRequest } from '@/lib/helpers/fetch';
import { Property } from '@/models/interfaces/property';
import { Booking } from '@/models/interfaces/booking';
import AppRoutes from '@/lib/routes';
import { BookingStatus } from '@/models/enum/booking';

export default function AvailablePts({
  properties,
}: {
  properties: Property[];
}) {
  const handleSoftDelete = async (
    propertyId: string,
    propertyBookings: Booking[]
  ) => {
    const activeBookings = propertyBookings.filter(
      (booking) =>
        booking.status !== 'cancelled' && booking.status !== 'rejected'
    );
    const decision =
      activeBookings.length > 0
        ? confirm('Are you sure? Property has bookings')
        : confirm('Are you sure?');
    if (!decision) {
      return;
    }
    try {
      const response: { status: number } = await sendRequest({
        url: AppRoutes.ADMIN.PROPERTIES_ID,
        method: 'PUT',
        id: propertyId,
        additionalHeaders: { 'admin-access': 'true' },
      });
      if (response.status === 204) {
        alert('Property deleted, reloading page...');
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getActiveBookingsLength = (bookings: Booking[]) => {
    console.log(
      properties[0].bookings,
      properties[1].bookings,
      properties[2].bookings
    );
    return bookings.filter(
      (booking) =>
        booking.status !== BookingStatus.CANCELLED &&
        booking.status !== BookingStatus.REJECTED
    ).length;
  };

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Name
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Price
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">ID</th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Images
          </th>
          <th className="py-2 px-4 text-left text-gray-700 font-medium">
            Bookings
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
            <td className="py-3 px-4 text-gray-700">
              {getActiveBookingsLength(property.bookings)}
            </td>
            <td className="py-3 px-4 space-x-2">
              <button
                className={`px-3 py-1 rounded-md ${
                  !!property.deletedAt ? 'bg-gray-400' : 'bg-red-500'
                }`}
                onClick={() => handleSoftDelete(property.id, property.bookings)}
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

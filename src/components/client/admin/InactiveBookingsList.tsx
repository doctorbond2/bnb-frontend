'use client';
import { Booking } from '@/models/interfaces/booking';
import { parseCustomerJson } from '@/lib/helpers/json';
import { Customer } from '@/models/interfaces/booking';
import { BookingStatus } from '@/models/enum/booking';
import { sendRequest } from '@/lib/helpers/fetch';
import ROUTES from '@/lib/routes';

export default function InactiveBookingsList({
  inActiveBookings,
}: {
  inActiveBookings: Booking[];
}) {
  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const response = await sendRequest({
        url: ROUTES.ADMIN.BOOKINGS_ID,
        method: 'DELETE',
        id: bookingId,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAll = async () => {
    const bookingIds = inActiveBookings.map((booking) => booking.id);
    console.log('deleting all bookings', bookingIds);
    try {
      const response: { status: number } = await sendRequest({
        url: ROUTES.ADMIN.BOOKINGS,
        method: 'DELETE',
        body: { bookingIds },
      });
      console.log(response.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mt-4" id="inactive-bookings">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Inactive Bookings
        </h2>
        {inActiveBookings.length > 0 && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => {
              if (confirm('Are you sure you want to delete all bookings?')) {
                handleDeleteAll();
                alert('All bookings deleted, refreshing page...');
                location.reload();
              }
            }}
          >
            Delete All Selected
          </button>
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Customer Name
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Email
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Status
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-medium">
              Booking ID
            </th>
            <th className="py-3 px-4 text-center text-gray-700 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {inActiveBookings.map((booking) => {
            const customer = parseCustomerJson(booking.customer) as Customer;
            return (
              <tr key={booking.id} className="border-b">
                <td className="py-3 px-4 text-gray-900">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="py-3 px-4 text-gray-700">{customer.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === BookingStatus.REJECTED
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{booking.id}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="px-4 py-2 bg-black text-red-500 rounded-md"
                    onClick={() => {
                      if (
                        confirm('Are you sure you want to delete this booking?')
                      ) {
                        handleDeleteBooking(booking.id);
                        alert('Booking Deleted, refreshing page...');
                        location.reload();
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

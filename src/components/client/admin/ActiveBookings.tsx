'use client';
import { Booking } from '@/models/interfaces/booking';
import { parseCustomerJson } from '@/lib/helpers/json';
import { Customer } from '@/models/interfaces/booking';
import { BookingStatus } from '@/models/enum/booking';
import { sendRequest } from '@/lib/helpers/fetch';

export default function ActiveBookingsTable({
  activeBookings,
}: {
  activeBookings: Booking[];
}) {
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await sendRequest({
        url: `/api/admin/bookings/${bookingId}`,
        method: 'PUT',
      });
      alert('Booking Cancelled, reloading page...');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="active-bookings">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Active Bookings
      </h2>
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Customer
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                User ID
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Booking ID
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {activeBookings.map((booking) => {
              const customer = parseCustomerJson(booking.customer) as Customer;
              return (
                <tr key={booking.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === BookingStatus.ACCEPTED
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {customer.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {booking.userId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {booking.id}
                  </td>
                  <td className="px-4 py-2 text-sm flex space-x-2">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-yellow-300 px-4 py-1 rounded text-gray-800"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

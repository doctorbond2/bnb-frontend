'use client';
import { Booking } from '@/models/interfaces/booking';
import { parseCustomerJson } from '@/lib/helpers/json';
import { Customer } from '@/models/interfaces/booking';
import { BookingStatus } from '@/models/enum/booking';
import { sendRequest } from '@/lib/helpers/fetch';
export default function ActiveBookingsList({
  activeBookings,
}: {
  activeBookings: Booking[];
}) {
  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const response = await sendRequest({
        url: '/api/admin/bookings',
        method: 'DELETE',
        id: bookingId,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section id="active-bookings">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Active Bookings
      </h2>
      <ul>
        <div className="space-y-4">
          {activeBookings.map((booking) => {
            const customer = parseCustomerJson(booking.customer) as Customer;
            return (
              <li key={booking.id}>
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === BookingStatus.ACCEPTED
                          ? 'bg-green-100 text-green-800'
                          : booking.status === BookingStatus.REJECTED
                          ? 'bg-red-500 text-black'
                          : BookingStatus.CANCELLED
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <button
                    className="bg-black text-red p-2"
                    onClick={() => {
                      handleDeleteBooking(booking.id);
                    }}
                  >
                    Hard Delete
                  </button>
                  <div className="text-gray-700">
                    <p className="text-sm">{customer.email}</p>
                    <p>Booked by account: {booking.userId}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Booking ID: {booking.id}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </ul>
    </section>
  );
}

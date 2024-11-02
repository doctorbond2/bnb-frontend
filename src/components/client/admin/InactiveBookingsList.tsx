'use client';
import { Booking } from '@/models/interfaces/booking';
import { parseCustomerJson } from '@/lib/helpers/json';
import { Customer } from '@/models/interfaces/booking';
import { BookingStatus } from '@/models/enum/booking';
import { sendRequest } from '@/lib/helpers/fetch';
export default function InactiveBookingsList({
  inActiveBookings,
}: {
  inActiveBookings: Booking[];
}) {
  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const response = await sendRequest({
        url: '/api/admin/bookings/:id',
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
    console.log('deteling all bookings', bookingIds);
    try {
      const response: { status: number } = await sendRequest({
        url: '/api/admin/bookings',
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
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={() => {
            const decision = confirm('Are you sure?');
            if (!decision) {
              return;
            }
            handleDeleteAll();
            alert('All bookings deleted, refreshing page...');
            location.reload();
          }}
        >
          Delete All
        </button>
      </div>
      <ul>
        <div className="space-y-4">
          {inActiveBookings.map((booking) => {
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
                  <div className="text-gray-700">
                    <p className="text-sm">{customer.email}</p>
                    <p>Booked by account: {booking.userId}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Booking ID: {booking.id}
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="bg-black text-red-500 py-2 rounded-md px-6"
                        onClick={async (e) => {
                          const decision = confirm('Are you sure?');
                          if (!decision) {
                            e.preventDefault();
                            return;
                          }
                          await handleDeleteBooking(booking.id);
                          alert('Booking Deleted, refreshing page...');
                          location.reload();
                        }}
                      >
                        Delete
                      </button>
                    </div>
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

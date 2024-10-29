'use client';

import { Booking } from '@/models/interfaces/booking';
import { Customer } from '@/models/interfaces/booking';
import { BookingStatus } from '@/models/enum/booking';
import { calculateTotalCostOfStay as SUM } from '@/lib/helpers/math';

export default function AllBookingsList({
  bookingList,
}: {
  bookingList: Booking[];
}) {
  const parseCustomerJson = (customer: string | Customer) => {
    if (typeof customer === 'string') {
      try {
        return JSON.parse(customer);
      } catch (e) {
        console.log(e);
        return customer;
      }
    }
    return customer;
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        All Bookings
      </h1>

      <ul>
        <div className="space-y-4">
          {bookingList
            .filter((booking: Booking) => !booking.cancelled)
            .map((booking) => {
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
                          booking.status === BookingStatus.ACCEPTED &&
                          !booking.cancelled
                            ? 'bg-green-100 text-green-800'
                            : booking.status === BookingStatus.REJECTED &&
                              !booking.cancelled
                            ? 'bg-red-500 text-black'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status && !booking.cancelled
                          ? booking.status
                          : 'Cancelled'}
                      </span>
                    </div>
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
    </div>
  );
}

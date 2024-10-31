'use client';
import useStoreData from '@/lib/hooks/useStoreData';
import { BookingStatus } from '@/models/enum/booking';

export default function UserBookings() {
  const { bookings } = useStoreData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => {
          console.log(booking);
          return (
            <li
              key={booking.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 overflow-hidden"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Booking ID: {booking.id}
                </p>
                <p className="text-gray-600">
                  Property Name: {booking.property?.name}
                </p>
                {booking.confirmationCode && (
                  <p className="text-gray-600">
                    Confirmation Code: {booking.confirmationCode}
                  </p>
                )}
                <p className="text-gray-600">
                  Host: {booking.property?.host.firstName}{' '}
                  {booking.property?.host.lastName}
                </p>
                <p
                  className={`font-semibold ${
                    booking.status === BookingStatus.ACCEPTED
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  Status: {booking.status}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

'use client';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { BookingStatus } from '@/models/enum/booking';
import Link from 'next/link';

export default function UserBookings() {
  const { bookings, user } = useStoreData();
  const { handleCancelBooking } = useStore();
  const sortedBookings = [...bookings].sort((a, b) => {
    const order = {
      [BookingStatus.ACCEPTED]: 1,
      [BookingStatus.PENDING]: 2,
      [BookingStatus.REJECTED]: 3,
      [BookingStatus.CANCELLED]: 4,
    };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Bookings</h2>
      <ul className="space-y-4">
        {sortedBookings.map((booking) => {
          return (
            <li
              key={booking.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 overflow-hidden"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Booked property: {booking.property?.name}
                </p>
                {booking.confirmationCode && (
                  <p className="text-gray-600">
                    <span className="font-bold"> Confirmation Code:</span>{' '}
                    {booking.confirmationCode}
                  </p>
                )}
                <p className="text-gray-600">
                  Host: {booking.property?.host.firstName}{' '}
                  {booking.property?.host.lastName}
                </p>
                <p>
                  Status:{' '}
                  <span
                    className={`font-semibold ${
                      booking.status === BookingStatus.ACCEPTED
                        ? 'text-green-600'
                        : booking.status === BookingStatus.PENDING
                        ? 'text-yellow-600'
                        : booking.status === BookingStatus.REJECTED
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </p>
                {booking.status !== BookingStatus.REJECTED &&
                  booking.status !== BookingStatus.CANCELLED && (
                    <>
                      <div className="hover:text-blue-800">
                        <Link
                          href={`/user/${user.id}/profile/bookings/${booking.id}`}
                        >
                          View more details
                        </Link>
                      </div>
                      <button
                        type="button"
                        className="p-1 bg-red-500 text-white rounded-md"
                        onClick={async () => {
                          console.log('Cancel Booking');
                          await handleCancelBooking(booking.id);
                        }}
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

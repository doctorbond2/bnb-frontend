'use client';
import { useState } from 'react';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { BookingStatus } from '@/models/enum/booking';
import Link from 'next/link';

export default function UserBookings() {
  const { bookings, user } = useStoreData();
  const { handleCancelBooking } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const sortedBookings = [...bookings].sort((a, b) => {
    const order = {
      [BookingStatus.ACCEPTED]: 1,
      [BookingStatus.PENDING]: 2,
      [BookingStatus.REJECTED]: 3,
      [BookingStatus.CANCELLED]: 4,
    };
    return order[a.status] - order[b.status];
  });

  const handleOpenModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedBookingId) {
      await handleCancelBooking(selectedBookingId);
      setShowModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Bookings</h2>
      <ul className="space-y-4">
        {sortedBookings.map((booking) => (
          <li
            key={booking.id}
            className="relative bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <div className="relative pb-12">
              {' '}
              {/* Extra padding for buttons */}
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
                    <div className="absolute bottom-2 left-0">
                      <Link
                        className="text-blue-500 hover:underline font-semibold"
                        href={`/user/${user.id}/profile/bookings/${booking.id}`}
                      >
                        View more details
                      </Link>
                    </div>

                    <button
                      type="button"
                      className="absolute bottom-2 right-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                      onClick={() => handleOpenModal(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                No, Keep Booking
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

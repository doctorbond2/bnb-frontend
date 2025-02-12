'use client';
import { sendRequest } from '@/lib/helpers/fetch';
import { useEffect, useState } from 'react';
import { formatDate, parseCustomerJson } from '@/lib/helpers/json';
import { convertFirstCharToUpperCase as toUpper } from '@/lib/helpers/convert';
import { BookingStatus } from '@/models/enum/booking';
import useStore from '@/lib/hooks/useStore';
import { useRouter } from 'next/navigation';
import { Booking } from '@/models/interfaces/booking';
import AppRoutes from '@/lib/routes';

export default function BookingDetails({
  bookingId,
}: {
  bookingId: string;
  userId: string;
}) {
  const { dispatch } = useStore();
  const [booking, setBooking] = useState<Booking | null>(null);
  const router = useRouter();
  const [dates, setDates] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const fetchBooking = async () => {
    try {
      const bookingData: Booking = await sendRequest(
        {
          url: AppRoutes.GENERAL_PROTECTED.BOOKING_BY_ID,
          method: 'GET',
          protected: true,
          id: bookingId,
        },
        dispatch
      );
      setBooking({
        ...bookingData,
        customer: parseCustomerJson(bookingData.customer),
      });
      setDates({
        startDate: new Date(bookingData.startDate),
        endDate: new Date(bookingData.endDate),
      });
    } catch (err) {
      console.log('error:', err);
    }
  };
  useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-lg mt-4">
      <button
        onClick={() => {
          router.back();
        }}
        className="mb-12"
      >
        Back to bookings
      </button>
      {booking ? (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Booking Details
          </h1>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Customer Information
            </h2>
            <p className="text-gray-600">
              Name: {toUpper(booking.customer.firstName)}{' '}
              {toUpper(booking.customer.lastName)}
            </p>
            <p className="text-gray-600">Email: {booking.customer.email}</p>
            <p className="text-gray-600">
              Phone: {booking.customer.phoneNumber}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Booking Information
            </h2>
            <p className="text-gray-600">
              Host: {toUpper(booking.property?.host.firstName ?? '')}{' '}
              {toUpper(booking.property?.host.lastName ?? '')}{' '}
            </p>
            <p className="text-gray-600">Property: {booking.property?.name}</p>
            <p className="text-gray-600">
              Price per night: ${booking.property?.price_per_night}
            </p>
            <p className="text-gray-600">
              Check-In: {formatDate(dates.startDate)}
            </p>
            <p className="text-gray-600">
              Check-Out: {formatDate(dates.endDate)}
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

          {booking.status === BookingStatus.ACCEPTED && (
            <div className="mt-4">
              <p className="text-gray-600">
                Total Price: ${booking.price_total}
              </p>
              <p className="text-gray-600">
                Confirmation Code: {booking.confirmationCode}
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Loading booking details...</p>
      )}
    </div>
  );
}

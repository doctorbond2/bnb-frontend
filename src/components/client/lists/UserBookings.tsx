'use client';
import { Booking } from '@/models/interfaces/booking';
export default function UserBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <div>
      {bookings.map((booking) => {
        console.log(booking);
        return (
          <li key={booking.id}>
            <div className="border-2">
              <p>Booking ID: {booking.id}</p>
              <p>Property ID: {booking.property?.name}</p>
              <p>Confirmation Code: {booking.confirmationCode}</p>
              <p>
                Host:{' '}
                {booking.property?.host.firstName +
                  ' ' +
                  booking.property?.host.lastName}
              </p>
              <p>Status: {booking.status}</p>
            </div>
          </li>
        );
      })}
    </div>
  );
}

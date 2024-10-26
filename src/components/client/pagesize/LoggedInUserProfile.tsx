'use client';
import { User } from '@/models/interfaces/user';
import { Property } from '@/models/interfaces/property';
import { Booking } from '@/models/interfaces/booking';
import UserProperties from '../lists/UserProperties';
import UserBookings from '../lists/UserBookings';
export default function LoggedInUserProfile({
  user,
  bookings,
  properties,
}: {
  user: User;
  bookings: Booking[];
  properties: Property[];
}) {
  return (
    <div>
      <h1>Welcome back, {user.firstName}!</h1>
      <p>Here your profile:</p>
      <ul>
        <li>Name: {user.firstName}</li>
        <li>Email: {user.email}</li>
      </ul>
      bookings:
      <UserBookings bookings={bookings} />
      properties:
      <UserProperties properties={properties} />
    </div>
  );
}

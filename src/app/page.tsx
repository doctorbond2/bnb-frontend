'use client';
import { handleLogin } from '@/lib/handlers/login';
import { User } from '@/models/interfaces/user';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Property } from '@/models/interfaces/property';
import { Booking } from '@/models/interfaces/booking';
export default function Home() {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((state) => state.user.user);
  const properties: Property[] = useAppSelector(
    (state) => state.hostedProperties.properties
  );

  const bookings: Booking[] = useAppSelector(
    (state) => state.bookings.bookings
  );
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>{user.firstName ? user.firstName : 'Not logged in'}</h2>
      <h1>Properties</h1>
      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>
        </div>
      )) || <h2>No properties</h2>}

      <h1>Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h2>{booking.property}</h2>
        </div>
      )) || <h2>No bookings</h2>}
      <h1>Login Form</h1>
      <form onSubmit={(e) => handleLogin(e, dispatch)}>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      <form onSubmit={}></form>
    </div>
  );
}

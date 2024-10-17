'use client';
import { logout } from '@/redux/slices/userSlice';
import { handleLogin } from '@/lib/handlers/login';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';

export default function Home() {
  const { user, properties, bookings } = useStoreData();
  const { dispatch } = useStore();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>{user && user.firstName ? user.firstName : 'Not logged in'}</h2>
      <h1>Properties</h1>
      {(properties &&
        properties.map((property) => (
          <div key={property.id}>
            <h2>{property.name}</h2>
          </div>
        ))) || <h2>No properties</h2>}

      <h1>Bookings</h1>
      {(bookings &&
        bookings.map((booking) => (
          <div key={booking.id}>
            <h2>{booking.propertyId}</h2>
          </div>
        ))) || <h2>No bookings</h2>}
      <h1>Login Form</h1>
      <form onSubmit={(e) => handleLogin(e, dispatch)}>
        <label>Username:</label>
        <input type="text" name="username" required />

        <label>Password:</label>
        <input type="password" name="password" required />

        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </div>
  );
}

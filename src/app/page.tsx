'use client';
import { handleLogin } from '@/lib/handlers/login';
import { User } from '@/models/types/User';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
export default function Home() {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((state) => state.user);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{user.firstName ? user.firstName : 'Not logged in'}</h1>
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
    </div>
  );
}

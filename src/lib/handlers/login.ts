import { loginUser } from '@/redux/thunks/user';
import { getHostedProperties } from '@/redux/thunks/property';
import { getBookings } from '@/redux/thunks/booking';
import { AppDispatch } from '@/redux/store';
import { LoginApiResponse } from '@/redux/thunks/user';

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch
) => {
  e.preventDefault();

  const form = e.currentTarget;
  const username: string = form.username ? form.username.value : null;
  const password: string = form.password.value;
  let userId: string;
  let token: string;
  alert(`Logging in with Username: ${username}, Password: ${password}`);

  try {
    const response: LoginApiResponse = await dispatch(
      loginUser({ username, password })
    ).unwrap();
    console.log(response);
    if (!response || !response.user.id || !response.token) {
      throw new Error('Login response is missing user ID or token');
    }
    userId = response.user.id;
    token = response.token;
    console.log('Login successful', response);
  } catch (err) {
    console.error('Login failed', err);
    return;
  }
  try {
    await dispatch(getHostedProperties({ hostId: userId, token }));
  } catch (err) {
    console.error('Failed to retrieve properties', err);
  }
  try {
    await dispatch(getBookings({ userId, token }));
  } catch (err) {
    console.error('Failed to retrieve bookings', err);
  }
};

import { useAppDispatch } from '@/redux/hooks';
import { loginUser } from '@/redux/thunks/user';
import { AppDispatch } from '@/redux/store';

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch
) => {
  e.preventDefault();

  const form = e.currentTarget;
  const username: string = form.username ? form.username.value : null;
  const password: string = form.password.value;

  alert(`Logging in with Username: ${username}, Password: ${password}`);

  try {
    const result = await dispatch(loginUser({ username, password })).unwrap();
    console.log('Login successful', result);
  } catch (err) {
    console.error('Login failed', err);
  }
};

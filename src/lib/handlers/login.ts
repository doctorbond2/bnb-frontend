import { loginUser } from '@/redux/thunks/user';
import { getHostedProperties } from '@/redux/thunks/property';
import { getBookings } from '@/redux/thunks/booking';
import { AppDispatch } from '@/redux/store';
import { RegisterFormData } from '@/models/interfaces/user';
import { sendRequest } from '../helpers/fetch';
import { validationHelper as validate } from '../helpers/validate';
import { LoginApiResponse } from '@/redux/thunks/user';
import {
  RegisterFormAction as ACTION,
  RegisterFormActionType as ACTIONTYPE,
  RegisterFormState as STATE,
} from '@/reducer/registerFormReducer';
import { Dispatch } from 'react';

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch
): Promise<boolean> => {
  e.preventDefault();

  const form = e.currentTarget;
  const username: string = form.username ? form.username.value : null;
  const email: string = form.email ? form.email.value : null;
  const password: string = form.password.value;
  let userId: string;
  const loginDetails = {
    username,
    email,
    password,
  };
  try {
    const response: LoginApiResponse = await dispatch(
      loginUser(loginDetails)
    ).unwrap();
    if (!response || !response.user.id) {
      throw new Error('Login response is missing user ID or token');
    }
    userId = response.user.id;
  } catch (err) {
    console.error('Login failed', err);
    return false;
  }
  try {
    await dispatch(getHostedProperties({ hostId: userId }));
  } catch (err) {
    console.error('Failed to retrieve properties', err);
  }
  try {
    await dispatch(getBookings({ userId }));
  } catch (err) {
    console.error('Failed to retrieve bookings', err);
  }
  return true;
};
export const handleRegister = async (
  e: React.FormEvent<HTMLFormElement>,
  state: STATE,
  updateForm: Dispatch<ACTION>
): Promise<boolean> => {
  e.preventDefault();

  const { password, repeat_password, username, email, firstName, lastName } =
    state;
  const registerDetails: RegisterFormData = {
    username,
    password,
    repeat_password,
    firstName,
    lastName,
    email,
  };
  const [hasErrors, validationErrors] =
    validate.validateRegisterForm(registerDetails);
  if (hasErrors) {
    console.log('errors', validationErrors);
    updateForm({ type: ACTIONTYPE.SET_ERRORS, payload: validationErrors });
    return false;
  }
  updateForm({ type: ACTIONTYPE.SET_ISSUBMITTING, payload: true });

  try {
    await sendRequest({
      url: '/api/auth/register',
      method: 'POST',
      body: { ...registerDetails },
    });

    return true;
  } catch (err: unknown) {
    console.error('Register failed', err);
    return false;
  }
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserFormData } from '@/models/interfaces/user';
import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import localStorageHandler from '@/lib/helpers/localStorage';
import { User } from '@/models/interfaces/user';
export interface LoginApiResponse {
  user: User;
  token: string;
  refreshToken: string;
  message?: string;
  status?: number;
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    credentials: { email?: string; username?: string; password: string },
    { rejectWithValue }
  ): Promise<LoginApiResponse | ReturnType<typeof rejectWithValue>> => {
    try {
      const data: LoginApiResponse = await sendRequest(
        '/api/auth/login',
        'POST',
        credentials
      );
      console.warn('Login data response:\n', data);
      localStorageHandler.setInStorage(key.TOKEN, data.token);
      localStorageHandler.setInStorage(key.REFRESHTOKEN, data.refreshToken);
      localStorageHandler.setInStorage(key.USER_STATE, data.user);
      return data;
    } catch (err: unknown) {
      return rejectWithValue(thunkError(err));
    }
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (credentials: UpdateUserFormData, { rejectWithValue }) => {
    try {
      const data = await sendRequest('/api/protected/user', 'PUT');
      console.log(data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);

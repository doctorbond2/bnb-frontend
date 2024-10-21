import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserFormData } from '@/models/interfaces/user';
import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import localStorageHandler from '@/lib/helpers/localStorage';
import { User } from '@/models/interfaces/user';

export interface LoginApiResponse {
  user: User;
  message?: string;
  status?: number;
}
export interface RefreshTokenResponse {
  status: number;
}
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    credentials: { email?: string; username?: string; password: string },
    { rejectWithValue }
  ): Promise<LoginApiResponse | ReturnType<typeof rejectWithValue>> => {
    try {
      const data: LoginApiResponse = await sendRequest({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      });
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
      const data = await sendRequest({
        url: '/api/protected/user',
        method: 'PUT',
        body: { ...credentials },
        protected: true,
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);
export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response: RefreshTokenResponse = await sendRequest({
        url: '/api/auth/refreshToken',
        method: 'POST',
      });
      return response;
    } catch (error) {
      return rejectWithValue(thunkError(error));
    }
  }
);

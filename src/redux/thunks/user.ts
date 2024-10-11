import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserFormData } from '@/models/interfaces/user';
import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    credentials: { email?: string; username?: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await sendRequest('/api/auth/login', 'POST', credentials);
      console.warn(data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
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

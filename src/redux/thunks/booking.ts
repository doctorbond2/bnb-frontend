import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserId } from '@/models/types/User';
import { Booking } from '@/models/interfaces/booking';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
type GetBookingsApiResponse = Booking[];
export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async (
    credentials: { userId: UserId; token: string },
    { rejectWithValue }
  ) => {
    const { userId, token } = credentials;
    try {
      const data: GetBookingsApiResponse = await sendRequest({
        url: '/api/users/bookings/' + userId,
        method: 'GET',
        token,
        x_api_key: 'API_KEY',
      });
      console.warn(data);
      localStorageHandler.setInStorage(key.BOOKINGS_LIST, data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);

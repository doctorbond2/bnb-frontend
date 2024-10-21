import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserId } from '@/models/types/User';
import { Booking } from '@/models/interfaces/booking';
import { BookingFormData } from '@/models/interfaces/booking';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { AppDispatch } from '../store';
type GetBookingsApiResponse = Booking[];
export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async (credentials: { userId: UserId }, { rejectWithValue }) => {
    const { userId } = credentials;
    try {
      const data: GetBookingsApiResponse = await sendRequest({
        url: '/api/users/bookings/' + userId,
        method: 'GET',
      });
      console.warn(data);
      localStorageHandler.setInStorage(key.BOOKINGS_LIST, data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (
    credentials: { data: BookingFormData; dispatch: AppDispatch },
    { rejectWithValue }
  ) => {
    try {
      const data: Booking = await sendRequest(
        {
          url: '/api/protected/booking',
          method: 'POST',
          body: { ...credentials.data },
          protected: true,
        },
        credentials.dispatch
      );

      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);

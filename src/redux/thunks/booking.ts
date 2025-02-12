import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Booking } from '@/models/interfaces/booking';
import { BookingFormData } from '@/models/interfaces/booking';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { AppDispatch } from '../store';
import AppRoutes from '@/lib/routes';
type GetBookingsApiResponse = Booking[];
export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async (credentials: { dispatch: AppDispatch }, { rejectWithValue }) => {
    try {
      const data: GetBookingsApiResponse = await sendRequest(
        {
          url: AppRoutes.USER.BOOKINGS,
          method: 'GET',
          protected: true,
        },
        credentials.dispatch
      );
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
          url: AppRoutes.GENERAL_PROTECTED.BOOKINGS,
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
export const userCancelBooking = createAsyncThunk(
  'bookings/userCancelBookings',
  async (
    credentials: { bookingId: string; dispatch: AppDispatch },
    { rejectWithValue }
  ) => {
    try {
      const data: Booking = await sendRequest(
        {
          url: AppRoutes.GENERAL_PROTECTED.BOOKING_BY_ID,
          method: 'DELETE',
          protected: true,
          id: credentials.bookingId,
        },
        credentials.dispatch
      );

      localStorageHandler.replaceItemInStorageById(key.BOOKINGS_LIST, data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);

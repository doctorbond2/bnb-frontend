import { createSlice } from '@reduxjs/toolkit';
import { bookingExtraReducers } from '../extraReducers/booking';
import { Booking } from '@/models/interfaces/booking';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
export interface BookingsState {
  isLoading: boolean;
  error: string | null;
  list: Booking[];
}

const initialState: BookingsState = {
  isLoading: false,
  error: null,
  list: [],
};

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    checkBookingLocalStorage: (state) => {
      const bookings = localStorageHandler.getfromStorage(
        LocalStorageKeys.BOOKINGS_LIST
      );
      if (bookings) {
        state.list = bookings as Booking[];
      }
    },
  },
  extraReducers: (builder) => bookingExtraReducers(builder),
});
export const { checkBookingLocalStorage } = bookingSlice.actions;
export default bookingSlice.reducer;

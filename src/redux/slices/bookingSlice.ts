import { createSlice } from '@reduxjs/toolkit';
import { bookingExtraReducers } from '../extraReducers/booking';
import { Booking } from '@/models/interfaces/booking';
export interface BookingsState {
  isLoading?: boolean;
  error?: string | null;
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
  reducers: {},
  extraReducers: (builder) => bookingExtraReducers(builder),
});
export default bookingSlice.reducer;

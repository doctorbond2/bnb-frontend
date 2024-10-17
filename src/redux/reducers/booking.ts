import { BookingsState } from '../slices/bookingSlice';
import { Booking } from '@/models/interfaces/booking';
import { PayloadAction } from '@reduxjs/toolkit';
export const reducer_updateBookingsList = (
  state: BookingsState,
  action: PayloadAction<Booking>
) => {
  const updatedList = [...state.list, action.payload];
  return {
    ...state,
    list: updatedList,
  };
};

import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BookingsState } from '../slices/bookingSlice';
import { getBookings, userCancelBooking } from '../thunks/booking';
import { handlePending, handleRejected } from '@/lib/handlers/thunk';
import { createBooking } from '../thunks/booking';
export function bookingExtraReducers(
  builder: ActionReducerMapBuilder<BookingsState>
) {
  builder
    .addCase(getBookings.pending, handlePending)
    .addCase(getBookings.rejected, handleRejected)
    .addCase(getBookings.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = action.payload || [];
      } else {
        return;
      }
    })
    .addCase(createBooking.pending, handlePending)
    .addCase(createBooking.rejected, handleRejected)
    .addCase(createBooking.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = [...state.list, action.payload];
      }
    })
    .addCase(userCancelBooking.rejected, handleRejected)
    .addCase(userCancelBooking.pending, handlePending)
    .addCase(userCancelBooking.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = state.list.map((booking) =>
          action.payload && booking.id === action.payload.id
            ? { ...booking, ...action.payload }
            : booking
        );
      }
    });
}

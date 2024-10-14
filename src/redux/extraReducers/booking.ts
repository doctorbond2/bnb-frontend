import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BookingsState } from '../slices/bookingSlice';
import { getBookings } from '../thunks/booking';
import { handlePending, handleRejected } from '@/lib/handlers/thunk';
export function bookingExtraReducers(
  builder: ActionReducerMapBuilder<BookingsState>
) {
  builder
    .addCase(getBookings.pending, handlePending)
    .addCase(getBookings.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = action.payload || [];
      } else {
        return;
      }
    })
    .addCase(getBookings.rejected, handleRejected);
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BookingsState } from '../slices/bookingSlice';
import { getBookings } from '../thunks/booking';
export function bookingExtraReducers(
  builder: ActionReducerMapBuilder<BookingsState>
) {
  builder
    .addCase(getBookings.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getBookings.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = action.payload || [];
      } else {
        return;
      }
    })
    .addCase(getBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BookingsState } from '../slices/bookingSlice';
import { getBookings } from '../thunks/booking';
import { handlePending, handleRejected } from '@/lib/handlers/thunk';
import { createBooking } from '../thunks/booking';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
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
    .addCase(getBookings.rejected, handleRejected)
    .addCase(createBooking.pending, handlePending)
    .addCase(createBooking.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = [...state.list, action.payload];
        localStorageHandler.setInStorage(
          LocalStorageKeys.BOOKINGS_LIST,
          state.list
        );
      }
    })
    .addCase(createBooking.rejected, handleRejected);
}

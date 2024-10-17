import { createSlice } from '@reduxjs/toolkit';
import { bookingExtraReducers } from '../extraReducers/booking';
import { Booking } from '@/models/interfaces/booking';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => bookingExtraReducers(builder),
});
export const { setLoading, setBookings, setError } = bookingSlice.actions;
export const checkBookingLocalStorage = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const bookings = localStorageHandler.getfromStorage(
      LocalStorageKeys.BOOKINGS_LIST
    );

    if (bookings) {
      dispatch(setBookings(bookings as Booking[]));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError('Failed to load bookings from localStorage'));
  } finally {
    dispatch(setLoading(false));
  }
};
export default bookingSlice.reducer;

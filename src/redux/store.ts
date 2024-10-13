import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import bookingsReducer from './slices/bookingSlice';
import hostedProperiesReducer from './slices/propertySlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      hostedProperties: hostedProperiesReducer,
      bookings: bookingsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

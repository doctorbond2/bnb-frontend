'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import { checkBookingLocalStorage } from './slices/bookingSlice';
import { checkPropertyLocalStorage } from './slices/propertySlice';
import { checkUserLocalStorage } from './slices/userSlice';
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    const store = storeRef.current!;
    store.dispatch(checkUserLocalStorage());
    store.dispatch(checkPropertyLocalStorage());
    store.dispatch(checkBookingLocalStorage());
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;

'use client';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getBookings } from '@/redux/thunks/booking';
const REFRESH_INTERVAL = 120000;
const LAST_FETCH_KEY = 'lastFetchTimestamp';
import useStore from '@/lib/hooks/useStore';
export default function BookingFetcher() {
  const { dispatch } = useStore();

  useEffect(() => {
    const lastFetchTimestamp = localStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (
      !lastFetchTimestamp ||
      now - parseInt(lastFetchTimestamp) > REFRESH_INTERVAL
    ) {
      alert('fetching bookings');
      dispatch(getBookings());
      localStorage.setItem(LAST_FETCH_KEY, now.toString());
    }

    const intervalId = setInterval(() => {
      dispatch(getBookings());
      localStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}

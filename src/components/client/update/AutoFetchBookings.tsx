'use client';
import { useEffect } from 'react';
import { getBookings } from '@/redux/thunks/booking';
import { getHostedProperties } from '@/redux/thunks/property';
const REFRESH_INTERVAL = 120000;
const LAST_FETCH_KEY = 'lastFetchTimestamp';
import useStore from '@/lib/hooks/useStore';
import useStoreData from '@/lib/hooks/useStoreData';
export default function BookingFetcher() {
  const { dispatch } = useStore();
  const { user } = useStoreData();

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }
    const lastFetchTimestamp = localStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (
      !lastFetchTimestamp ||
      now - parseInt(lastFetchTimestamp) > REFRESH_INTERVAL
    ) {
      dispatch(getBookings({ dispatch }));
      dispatch(getHostedProperties({ dispatch }));
      localStorage.setItem(LAST_FETCH_KEY, now.toString());
    }

    const intervalId = setInterval(() => {
      dispatch(getBookings({ dispatch }));
      dispatch(getHostedProperties({ dispatch }));
      localStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch, user]);

  return null;
}

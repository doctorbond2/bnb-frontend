import { useAppSelector } from '@/redux/hooks';
import { User } from '@/models/interfaces/user';
import { Property } from '@/models/interfaces/property';
import { Booking } from '@/models/interfaces/booking';

function useStoreData() {
  const user: User = useAppSelector((state) => state.user.user);
  const userLoading = useAppSelector((state) => state.user.isLoading);
  const userError = useAppSelector((state) => state.user.error);

  const properties: Property[] = useAppSelector(
    (state) => state.hostedProperties.list
  );
  const propertiesLoading = useAppSelector(
    (state) => state.hostedProperties.isLoading
  );
  const propertiesError = useAppSelector(
    (state) => state.hostedProperties.error
  );

  const bookings: Booking[] = useAppSelector((state) => state.bookings.list);
  const bookingsLoading = useAppSelector((state) => state.bookings.isLoading);
  const bookingsError = useAppSelector((state) => state.bookings.error);

  const getProperty = (id: string): Property | null => {
    return properties.find((p) => p.id === id) || null;
  };
  const getBooking = (id: string): Booking | null => {
    return bookings.find((b) => b.id === id) || null;
  };
  return {
    user,
    userLoading,
    userError,
    properties,
    propertiesLoading,
    propertiesError,
    bookings,
    bookingsLoading,
    bookingsError,
    getProperty,
    getBooking,
  };
}
export default useStoreData;

import { sendServerRequest } from '@/lib/helpers/severFetch';
import { Booking } from '@/models/interfaces/booking';
import AllBookingsList from '@/components/client/admin/AllBookingsList';

const getData = async () => {
  const response: Booking[] | undefined = await sendServerRequest({
    url: '/api/admin/bookings',
    method: 'GET',
  });
  return response || [];
};
export default async function Page() {
  try {
    const response = await getData();
    if (!response || response.length < 1) {
      return <div>No bookings found</div>;
    }
    return <AllBookingsList bookingList={response} />;
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

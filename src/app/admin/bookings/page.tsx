import { sendServerRequest } from '@/lib/helpers/severFetch';
import { Booking } from '@/models/interfaces/booking';
import ActiveBookingsList from '@/components/client/admin/ActiveBookings';
import InactiveBookingsList from '@/components/client/admin/InactiveBookingsList';
import { BookingStatus } from '@/models/enum/booking';

export const dynamic = 'force-dynamic';

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
    const activeBookings = response.filter(
      (booking: Booking) =>
        booking.status === BookingStatus.ACCEPTED ||
        booking.status === BookingStatus.PENDING
    );
    const inActiveBookings = response.filter(
      (booking: Booking) =>
        booking.status === BookingStatus.REJECTED ||
        booking.status === BookingStatus.CANCELLED
    );
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <ActiveBookingsList activeBookings={activeBookings} />
        <InactiveBookingsList inActiveBookings={inActiveBookings} />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

import BookingDetails from '@/components/client/pagesize/BookingDetails';
export default function Page({
  params,
}: {
  params: { bookingId: string; userId: string };
}) {
  return (
    <div>
      <BookingDetails bookingId={params.bookingId} userId={params.userId} />
    </div>
  );
}

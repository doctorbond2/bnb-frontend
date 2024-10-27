export default function Page({ params }: { params: { bookingId: string } }) {
  return (
    <div>
      <h1>Page for booking {params.bookingId}</h1>
    </div>
  );
}

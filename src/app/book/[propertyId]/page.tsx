import { Property } from '@/models/interfaces/property';
import { sendRequest } from '@/lib/helpers/fetch';
import NewBookingForm from '@/components/client/booking/NewBookingForm';
export default async function Page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params;
  try {
    const propertyToBook: Property = await sendRequest({
      url: process.env.NEXT_PUBLIC_GET_PROPERTY_BY_ID || '',
      method: 'GET',
      protected: false,
      id: propertyId,
      query: { populateBookings: true },
    });
    if (!propertyToBook) {
      console.error('Property not found:', propertyId);
      return <div>Property not found</div>;
    }
    console.log('Making booking for property:', propertyToBook);
    return <NewBookingForm propertyId={propertyId} property={propertyToBook} />;
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

import { Property } from '@/models/interfaces/property';
import { sendServerRequest } from '@/lib/helpers/severFetch';
import ROUTES from '@/lib/routes';
import NewBookingForm from '@/components/client/booking/NewBookingForm';
export default async function Page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params;
  try {
    const propertyToBook: Property = await sendServerRequest({
      url: ROUTES.PUBLIC.PROPERTY_BY_ID,
      method: 'GET',
      protected: false,
      id: propertyId,
      query: { populateBookings: true },
    });

    if (!propertyToBook) {
      console.error('Property not found:', propertyId);
      return <div>Property not found</div>;
    }

    return <NewBookingForm propertyId={propertyId} property={propertyToBook} />;
  } catch (error) {
    console.error('Error:', error);
    return <div>Error</div>;
  }
}

// import useStore from '@/lib/hooks/useStore';
// import useStoreData from '@/lib/hooks/useStoreData';

import NewBookingForm from '@/components/client/booking/NewBookingForm';
export default function Page({ params }: { params: { propertyId: string } }) {
  const { propertyId } = params;
  console.log('Making booking for property:', propertyId);
  return <NewBookingForm propertyId={propertyId} />;
}

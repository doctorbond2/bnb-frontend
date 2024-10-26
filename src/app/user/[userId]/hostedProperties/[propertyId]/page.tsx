import PropertyUpdateForm from '@/components/client/update/UpdatePropertyForm';
export default async function Page({
  params,
}: {
  params: { propertyId: string };
}) {
  return <PropertyUpdateForm propertyId={params.propertyId} />;
}

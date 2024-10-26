import UserUpdateForm from '@/components/client/update/UserUpdateForm';
export default async function Page({ params }: { params: { userId: string } }) {
  return <UserUpdateForm />;
}

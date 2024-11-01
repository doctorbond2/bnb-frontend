import ProfilePageLayout from '@/components/client/pagesize/ProfilePageLayout';
export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  if (!params.userId) return <div>User not found</div>;

  return <ProfilePageLayout />;
}

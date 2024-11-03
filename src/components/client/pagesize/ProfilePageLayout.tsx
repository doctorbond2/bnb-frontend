'use client';

import useStoreData from '@/lib/hooks/useStoreData';

import LoggedInUserProfile from './LoggedInUserProfile';
export default function ProfilePageLayout() {
  const { user } = useStoreData();
  console.log('user:', user);
  if (!user.id) return <div>User not found</div>;

  return (
    <div>
      {user ? (
        <>
          <LoggedInUserProfile />
          <div className="flex just">
            <button
              onClick={() => {
                console.log('asd');
              }}
            >
              Delete account
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

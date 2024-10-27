'use client';

import { useEffect, useState } from 'react';
import useStoreData from '@/lib/hooks/useStoreData';
import UserProfile from './UserProfile';
import LoggedInUserProfile from './LoggedInUserProfile';
export default function ProfilePageLayout({ userId }: { userId: string }) {
  const { user, bookings, properties } = useStoreData();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    if (user?.id && userId) {
      setIsLoggedInUser(user.id === userId);
    }
  }, [user, userId]);

  if (!userId) return <div>User not found</div>;

  return (
    <div>
      {isLoggedInUser ? (
        <LoggedInUserProfile user={user} />
      ) : (
        <UserProfile userId={userId} />
      )}
    </div>
  );
}

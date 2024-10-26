'use client';
import React from 'react';
import Link from 'next/link';
import useStoreData from '@/lib/hooks/useStoreData';

const ProfileLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) => {
  const { userId } = params;
  const { user } = useStoreData();

  const isMyProfile = user.id === userId;

  return (
    <div>
      {isMyProfile && (
        <nav>
          <ul>
            <li>
              <Link href={`/user/${userId}/profile`}>Profile Overview</Link>
            </li>
            <li>
              <Link href={`/user/${userId}/profile/update`}>
                Update Profile
              </Link>
            </li>
            <li>
              <Link href={`/user/${userId}/profile/settings`}>Settings</Link>
            </li>
          </ul>
        </nav>
      )}
      <main>{children}</main>
    </div>
  );
};

export default ProfileLayout;

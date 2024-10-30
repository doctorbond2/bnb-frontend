'use client';
import React from 'react';
import Link from 'next/link';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';

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
    <div className="max-w-4xl mx-auto p-6">
      {isMyProfile && (
        <nav className="bg-white shadow-md rounded-lg mb-6">
          <ul className="flex flex-wrap space-x-4 p-4">
            <li>
              <Link
                href={`/user/${userId}/profile`}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Profile Overview
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/update`}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Update Profile
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/bookings`}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/hostedProperties`}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Your Properties
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <main>{children}</main>
    </div>
  );
};

export default ProfileLayout;

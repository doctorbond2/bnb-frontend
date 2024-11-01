'use client';
import React from 'react';
import Link from 'next/link';

const ProfileLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) => {
  const { userId } = params;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="hidden md:block w-64 bg-white p-4 shadow-md rounded-md">
        <nav className="bg-white min-h-screen">
          <ul className="flex flex-col  p-8 space-y-4">
            <li>
              <Link
                href={`/user/${userId}/profile`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Profile Overview
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/update`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Update Profile
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/bookings`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/hostedProperties`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Your Properties
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="md:hidden bg-white shadow-md rounded-md mx-4">
        <nav className="flex space-x-4 p-4">
          <ul className="flex flex-wrap ustify-around">
            <li>
              <Link
                href={`/user/${userId}/profile`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Profile Overview
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/update`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Update Profile
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/bookings`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${userId}/profile/hostedProperties`}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
              >
                Your Properties
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="flex-1 px-4">
        <div className="bg-white p-4 rounded-md shadow-md min-h-full mt-4 md:mt-0">
          <div className=" bg-gray-100 rounded min-h-screen relative">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;

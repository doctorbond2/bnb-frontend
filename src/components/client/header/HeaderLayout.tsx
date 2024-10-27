'use client';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeaderLayout() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const { user } = useStoreData();
  const { handleLogout } = useStore();
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md md:px-8 h-20 md:h-16">
      <Link href={'/'} className="flex items-center space-x-2">
        <Image
          src="/images/spaceshare_icon.png"
          width={40}
          height={40}
          alt="SpaceShare Icon"
          className="object-cover"
        />
        <h1 className="hidden md:block text-xl font-bold text-gray-700">
          Spaceshare
        </h1>
      </Link>

      {/* Mobile Options */}
      <div className="flex md:hidden items-center">
        <Image
          src="/images/search_icon.png"
          width={24}
          height={24}
          alt="Search Icon"
          className="object-cover"
        />
        <button onClick={toggleDropdown} className="text-gray-700">
          <div className="text-2xl">|||</div>
        </button>

        <div
          className={`absolute top-20 left-0 w-full bg-white border-t border-gray-300 shadow-lg transition-transform transform ${
            isDropdownOpen ? 'scale-y-100' : 'scale-y-0'
          } origin-top z-10`}
        >
          <div className={`flex flex-col px-6 py-4 ${user.id ? 'hidden' : ''}`}>
            <span className="text-gray-600">Not logged in</span>
            <button
              onClick={() => {
                router.push('/login');
                toggleDropdown();
              }}
              className="text-left py-2 hover:text-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => {
                toggleDropdown();
                router.push('/login/register');
              }}
              className="text-left py-2 hover:text-blue-600"
            >
              Register
            </button>
          </div>
          <div
            className={`flex flex-col px-6 py-4 ${!user.id ? 'hidden' : ''}`}
          >
            <span className="text-gray-600">Logged in</span>
            <Link href={`/user/${user.id}/profile`} className="py-2">
              <button onClick={toggleDropdown} className="hover:text-blue-600">
                Profile
              </button>
            </Link>
            <button
              className="py-2 hover:text-blue-600"
              onClick={() => {
                toggleDropdown();
                handleLogout();
                router.push('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Options */}
      <div className="hidden md:flex items-center space-x-6">
        <Image
          src="/images/search_icon.png"
          width={24}
          height={24}
          alt="Search Icon"
          className="object-cover"
        />
        <Link
          href={`/user/${user.id}/profile`}
          className="text-gray-700 hover:text-blue-600"
        >
          Profile
        </Link>
        {!user.id ? (
          <button
            onClick={() => {
              router.push('/login');
            }}
            className="text-gray-700 border rounded-md px-3 py-1 hover:bg-gray-100"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              handleLogout();
              router.push('/login');
            }}
            className="text-gray-700 border rounded-md px-3 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        )}
        <Link
          href="login/register"
          className="text-gray-700 hover:text-blue-600"
        >
          Register
        </Link>
      </div>
    </header>
  );
}

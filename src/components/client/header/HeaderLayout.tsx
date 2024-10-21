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
    <header
      className="
      w-auto flex flex-row justify-between px-[2%] 
      md:mx-[3%] 
      h-20 md:h-12 items-center"
    >
      <div className="max-w-[80px] max-h-[80px]">
        <Image
          src="/images/spaceshare_icon.png"
          width={40}
          height={40}
          alt="SpaceShare Icon"
          style={{ objectFit: 'fill' }}
        />
        <h1 className="hidden md:inline-block">Spaceshare</h1>
      </div>

      <div className="flex flex-row md:hidden" id="header-mobile-options">
        <Image
          src="/images/search_icon.png"
          width={40}
          height={40}
          alt="SpaceShare Icon"
          style={{ objectFit: 'fill' }}
        />

        <button onClick={toggleDropdown} className="flex items-center">
          <div className="flex">|||</div>
        </button>

        <div
          className={`absolute top-20 left-0 w-full bg-white border-t border-gray-300 
            overflow-hidden transition-all duration-400 ease-in-out
              ${
                isDropdownOpen
                  ? 'opacity-100 max-h-[20rem] pointer-events-auto border-2'
                  : 'opacity-70 max-h-0 pointer-events-none'
              }
            `}
        >
          <div
            className={`flex flex-col p-[1%] ${
              !isDropdownOpen && 'opacity-40'
            }  max-w-fit ml-[5%]`}
          >
            <Link href="/profile" className="p-4">
              <div>Profile</div>
            </Link>
            <button className="max-w-fit p-4">|Login|</button>
            <div className="p-4">|Register|</div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-row" id="header-options">
        <div className="flex">
          <Image
            src="/images/search_icon.png"
            width={40}
            height={40}
            alt="SpaceShare Icon"
            style={{ objectFit: 'fill' }} // Proper CSS for fitting within bounds
          />
        </div>
        <Link href="/profile">|Profile|</Link>
        <button>|Login|</button>
        {user.id && (
          <button
            className="border-2 p-4"
            onClick={() => {
              handleLogout();
              router.push('/login');
            }}
          >
            Logout
          </button>
        )}
        <div>|Register|</div>
      </div>
    </header>
  );
}
// const headerStyle: string =
//   'w-auto flex flex-row justify-between md:justify-around md:mx-[3%] border-2';

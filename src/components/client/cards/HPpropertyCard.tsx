'use client';
import CustomImage from '@/components/server/PropertyHomeImage';
import { Property } from '@/models/interfaces/property';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useStoreData from '@/lib/hooks/useStoreData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HPpropertyCard({
  property: { name, images, price_per_night, address, id, host },
}: {
  property: Property;
}) {
  const router = useRouter();
  const image = images ? images[0] : null;
  const [isOwner, setIsOwner] = useState(false);
  const { user, getProperty } = useStoreData();
  useEffect(() => {
    setIsOwner(!!getProperty(id));
  }, [user, id, getProperty]);

  const bookNow = () => {
    if (!user.id) {
      router.push('/login');
      return;
    }
    router.push(`/book/${id}`);
  };

  if (!host) {
    return <div className="text-red-500 text-center">Property not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden max-w-full md:max-w-2xl md:h-64 transition-transform transform hover:scale-105 duration-200 my-2">
      <div
        className="w-full md:w-[50%] h-48 md:h-full bg-gray-100 flex items-center justify-center cursor-pointer relative group"
        onClick={() => router.push(`/properties/${id}`)}
      >
        {image ? (
          <CustomImage image={image} />
        ) : (
          <div className="w-full h-full border-2 border-gray-500 rounded-sm">
            <Image
              src="/images/No_Photo_Available.jpg"
              alt="No Photo Available"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
      </div>

      <div className="p-6 flex flex-col justify-between w-full md:w-[50%]">
        <div>
          <h2 className="text-xl font-bold text-gray-800 truncate">{name}</h2>
          <p className="text-gray-600 mt-2">{address}</p>
          <p className="text-gray-800 font-semibold mt-2">
            ${price_per_night}{' '}
            <span className="text-sm font-normal">/night</span>
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Owner:</span>{' '}
            <span className="font-bold">
              <Link
                href={`/profile/${host.id}`}
                className="text-blue-500 hover:underline"
              >
                {host.firstName} {host.lastName}
              </Link>
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link
            href={`/properties/${id}`}
            className="text-blue-500 hover:underline text-sm"
          >
            Details
          </Link>
          <button
            disabled={isOwner}
            onClick={bookNow}
            className={` text-white font-medium py-2 px-4 rounded-md ${
              isOwner
                ? 'bg-green-500 cursor-default'
                : 'hover:bg-blue-600 transition-colors bg-blue-500'
            }`}
          >
            {isOwner ? 'Yours' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

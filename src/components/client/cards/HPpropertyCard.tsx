'use client';
import CustomImage from '@/components/server/PropertyHomeImage';
import { Property } from '@/models/interfaces/property';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useStoreData from '@/lib/hooks/useStoreData';
import Link from 'next/link';

export default function HPpropertyCard({
  property: { name, images, price_per_night, address, id, host },
}: {
  property: Property;
}) {
  const router = useRouter();
  const image = images ? images[0] : null;
  const { user } = useStoreData();

  const bookNow = () => {
    if (!user.id) {
      router.push('/login');
      return;
    }
    router.push(`/book/${id}`);
  };
  if (!host) {
    return <div>property not found</div>;
  }
  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden max-w-sm md:max-w-full">
      <div className="w-full md:w-[30%] h-48 bg-gray-100 flex items-center justify-center">
        {image ? (
          <CustomImage image={image} />
        ) : (
          <div className="w-full h-full relative">
            <Image
              src="/images/No_Photo_Available.jpg"
              alt={'No Photo Available'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{address}</p>
        <p className="text-gray-800 font-bold mt-2">${price_per_night}/night</p>
        <p>
          {host.firstName} {host.lastName}
        </p>
      </div>
      <Link href={'/properties/' + id}>Details</Link>
      <div className="p-4">
        <button
          onClick={bookNow}
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

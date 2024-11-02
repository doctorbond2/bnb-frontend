import useStoreData from '@/lib/hooks/useStoreData';
import { Property } from '@/models/interfaces/property';
import Link from 'next/link';
export default function UserPropertyCard({
  property,
  index,
}: {
  property: Property;
  index: number;
}) {
  {
    const { user } = useStoreData();
    return (
      <div className="flex flex-row justify-between">
        <div>
          <p className="font-semibold">Property: {index + 1}</p>
          <p className="text-lg">Property Name: {property.name}</p>
          <p className="text-gray-600">Address: {property.address}</p>
          <Link
            href={`/properties/${property.id}`}
            className="text-md hover:text-blue-500 "
          >
            View now
          </Link>
        </div>
        <Link href={`/user/${user.id}/profile/hostedProperties/${property.id}`}>
          <div className="relative group flex flex-col">
            <button
              disabled={property.bookings.length > 0}
              className={`text-blue-500 hover:text-white mb-2 w-fit border-2 px-4 py-2 rounded-md ${
                property.bookings.length > 0
                  ? 'cursor-not-allowed hover:border-red-500 hover:bg-red-500'
                  : 'hover:border-blue-500 hover:bg-blue-500'
              }`}
              onClick={(e) => {
                if (property.bookings.length > 0) {
                  e.preventDefault();
                  alert('Property has bookings');
                  return;
                }
              }}
            >
              Edit
            </button>
            {property.bookings.length > 0 && (
              <div className="absolute left-0 bottom-full mb-2 w-max bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Has active bookings
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
}

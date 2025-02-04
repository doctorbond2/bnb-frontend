import { Property } from '@/models/interfaces/property';
import Link from 'next/link';
export default function SearchPropertyResult({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-11/12 h-full bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center w-full p-4">
          <Link href={`properties/${property.id}`}>
            <h2 className="text-xl font-semibold">{property.name}</h2>{' '}
          </Link>
          {/* <p className="text-sm text-gray-500">{property.location}</p> */}
          <p className="text-sm text-gray-500">{property.price_per_night}</p>
        </div>
      </div>
    </div>
  );
}

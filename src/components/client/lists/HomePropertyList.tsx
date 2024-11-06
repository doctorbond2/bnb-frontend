'use client';
import { Property } from '@/models/interfaces/property';
import HPpropertyCard from '../cards/HPpropertyCard';

function HomePropertyList({ propertyList }: { propertyList: Property[] }) {
  return (
    <ul>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {propertyList.map((property) => (
          <li key={property.id}>
            <HPpropertyCard property={property} />
          </li>
        ))}
      </div>
    </ul>
  );
}

export default HomePropertyList;

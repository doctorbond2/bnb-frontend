'use client';
import { Property } from '@/models/interfaces/property';
import HPpropertyCard from '../cards/HPpropertyCard';

function HomePropertyList({ propertyList }: { propertyList: Property[] }) {
  return (
    <>
      <div>
        <ul>
          {propertyList.map((property) => (
            <li key={property.id}>
              <HPpropertyCard property={property} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default HomePropertyList;

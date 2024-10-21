'use client';
import { Property } from '@/models/interfaces/property';

function HomePropertyList({ propertyList }: { propertyList: Property[] }) {
  return (
    <>
      <div>
        <ul>
          {propertyList.map((property) => (
            <li key={property.id}>
              <h3>{property.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default HomePropertyList;

'use client';
import { Property } from '@/models/interfaces/property';

// export interface Property {
//     id: PropertyId;
//     name: string;
//     country: string;
//     address: string;
//     price_per_night: number;
//     availableFrom?: Date;
//     availableUntil?: Date;
//     available: boolean;
//     host: User;
//     bookings: Booking[];
//     Images: PropertyImage[];
//   }
function HomePropertyList({ propertyList }: { propertyList: Property[] }) {
  return <div>list</div>;
}
export default HomePropertyList;

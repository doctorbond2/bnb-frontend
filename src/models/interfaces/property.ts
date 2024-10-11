import { User } from './user';
import { Booking } from './booking';
import { PropertyImage } from './general';
export type PropertyId = string;
export interface Property {
  id: PropertyId;
  name: string;
  country: string;
  address: string;
  price_per_night: number;
  availableFrom?: Date;
  availableUntil?: Date;
  available: boolean;
  host: User;
  bookings: Booking[];
  Images: PropertyImage[];
}

// model Property {
//     id              String    @id @default(auto()) @map("_id") @db.ObjectId
//     name            String
//     country         String
//     city            String
//     address         String
//     price_per_night Int
//     availableFrom   DateTime?
//     availableUntil  DateTime?
//     available       Boolean   @default(true)
//     host            User      @relation(fields: [hostId], references: [id])
//     hostId          String    @db.ObjectId
//     bookings        Booking[]
//     createdAt       DateTime  @default(now())
//     updatedAt       DateTime  @updatedAt
//     Image           Image[]
//   }

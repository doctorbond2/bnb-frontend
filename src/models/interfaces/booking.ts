import { Property } from './property';
export type BookingId = string;
export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
}
export interface Booking {
  id: string;
  property: Property;
  customer: Customer;
  checkIn: string;
  checkOut: string;
  created_by: BookingId;
}

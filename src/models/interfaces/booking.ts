import { BookingId } from '../types/Booking';
import { UserId } from '../types/User';
import { PropertyId } from '../types/Property';
export interface Customer {
  id: UserId;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
}
export interface Booking {
  id: BookingId;
  property: PropertyId;
  customer: Customer;
  startDate: Date;
  endDate: Date;
  created_by: UserId;
}
export interface BookingFormData {
  property: PropertyId;
  customer: Customer;
  startDate: Date;
  endDate: Date;
}

import { BookingId } from '../types/Booking';
import { UserId } from '../types/User';
import { PropertyId } from '../types/Property';
import { Property } from './property';
import { BookingStatus } from '../enum/booking';
export interface Customer {
  id?: UserId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
}
export interface Booking {
  id: BookingId;
  userId: UserId;
  propertyId: PropertyId;
  property?: Property;
  customer: Customer;
  startDate: Date;
  endDate: Date;
  confirmationCode: string;
  status: BookingStatus;
  created_by: UserId;
  cancelled?: boolean;
}
export interface BookingFormData {
  propertyId: PropertyId;
  customer: Customer;
  startDate: Date;
  endDate: Date;
}

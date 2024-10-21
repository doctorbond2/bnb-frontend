import { User } from './user';
import { Booking } from './booking';
import { PropertyImage } from './general';
import { PropertyId } from '../types/Property';
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
export interface PropertyFormData {
  name: string;
  country: string;
  city: string;
  address: string;
  price_per_night: number;
  availableFrom?: string;
  availableUntil?: string;
  available: boolean;
  hostId: string;
  images?: PropertyImage[];
}

export interface GetManyResponse<T> {
  currentPage: number;
  totalPages: number;
  data: T[];
  status: number;
}

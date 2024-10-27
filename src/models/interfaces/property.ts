import { User } from './user';
import { Booking } from './booking';
import { PropertyId } from '../types/Property';
import { Image } from './general';
export interface Property {
  id: PropertyId;
  name: string;
  country: string;
  address: string;
  city: string;
  price_per_night: number;
  availableFrom?: Date;
  availableUntil?: Date;
  available: boolean;
  host: User;
  hostId: string;
  bookings: Booking[];
  images?: Image[];
}
export interface PropertyFormData {
  name: string;
  country: string;
  city: string;
  address: string;
  price_per_night: number | string;
  availableFrom: Date | null;
  availableUntil: Date | null;
  available: boolean;
  hostId: string;
  imageUrls?: string[];
}
export interface UpdatePropertyFormData {
  name?: string;
  country?: string;
  city?: string;
  address?: string;
  price_per_night?: number | string;
  availableFrom?: Date | null;
  availableUntil?: Date | null;
  available?: boolean;
  hostId?: string;
  imageUrls?: string[];
}

export interface GetManyResponse<T> {
  currentPage: number;
  totalPages: number;
  data: T[];
  status: number;
}

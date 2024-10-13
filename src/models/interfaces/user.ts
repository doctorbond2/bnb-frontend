import { Property } from './property';
import { Booking } from './booking';

import { UserId } from '../types/User';
export interface User {
  id: UserId | null;
  firstName: string;
  lastName: string;
  fullName?: string;
  admin?: boolean;
  email: string;
  phone?: string;
  avatar?: string;
  properties?: Property[];
  bookings?: Booking[];
}
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface LoginFormData {
  email?: string;
  password: string;
  username?: string;
}
export interface UpdateUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
}

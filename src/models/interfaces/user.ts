import { Property } from './property';
import { Booking } from './booking';

import { UserId } from '../types/User';
export interface User {
  id: UserId;
  firstName: string;
  username: string;
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
  repeat_password: string;
  username: string;
  admin?: boolean;
  admin_password?: string;
}
export interface LoginFormData {
  email?: string;
  password: string;
  username?: string;
}
export interface UpdateUserFormData {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  existing_password: string;
  password?: string;
  avatar?: string;
}

import { emailRegex } from './regex';
import { Customer } from '@/models/interfaces/booking';
const Dates = (startDate: Date, endDate: Date): boolean =>
  !!(startDate && endDate && endDate > startDate);
const Email = (email: string): boolean => !!(emailRegex.test(email) && email);
const PhoneNumber = (phoneNumber: string): boolean =>
  !!(phoneNumber && phoneNumber.length > 8 && phoneNumber.length < 20);
const Firstname = (firstName: string): boolean =>
  !!(firstName && firstName.length > 2 && firstName.length < 40);
const Lastname = (lastName: string): boolean =>
  !!(lastName && lastName.length > 2 && lastName.length < 50);
const validateCustomerBooking = (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  startDate: Date,
  endDate: Date
): [boolean, { [key: string]: string }] => {
  const errors: { [key: string]: string } = {};
  if (!Dates(startDate, endDate)) {
    errors.dates = 'Invalid dates selected.';
  }
  if (!Email(email)) {
    errors.email = 'Invalid Email input';
  }
  if (!PhoneNumber(phoneNumber)) {
    errors.phoneNumber = 'Invalid length of phone number.';
  }
  if (!Firstname(firstName)) {
    errors.firstName = 'Invalid firstname input.';
  }
  if (!Lastname(lastName)) {
    errors.lastName = 'Invalid lastname input.';
  }
  return [Object.keys(errors).length > 0, errors];
};
export const validationHelper = {
  Dates,
  Email,
  PhoneNumber,
  Firstname,
  Lastname,
  validateCustomerBooking,
};

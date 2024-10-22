import { PropertyFormData } from '@/models/interfaces/property';
import { emailRegex } from './regex';

import { RegisterFormData } from '@/models/interfaces/user';
const Dates = (startDate: Date, endDate: Date): boolean =>
  !!(startDate && endDate && endDate > startDate);
const Email = (email: string): boolean => !!(emailRegex.test(email) && email);
const PhoneNumber = (phoneNumber: string): boolean =>
  !!(phoneNumber && phoneNumber.length > 8 && phoneNumber.length < 20);
const Firstname = (firstName: string): boolean =>
  !!(firstName && firstName.length > 2 && firstName.length < 40);
const Lastname = (lastName: string): boolean =>
  !!(lastName && lastName.length > 2 && lastName.length < 50);
const Password = (password: string, repeat_password: string): boolean => {
  if (!password || !repeat_password) {
    return false;
  }
  return !!(password === repeat_password);
};
const Address = (address: string): boolean => {
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  return !!(address && addressRegex.test(address));
};
const PasswordLength = (password: string): boolean =>
  !!(password && password.length > 6 && password.length < 40);
const validatePropertyForm = (data: PropertyFormData) => {
  const errors: { [key: string]: string } = {};
  if (!data.name || data.name.length < 2) {
    errors.name = 'Invalid property name input';
  }
  if (!data.country || data.country.length < 2) {
    errors.country = 'Invalid country input';
  }
  if (!data.city || data.city.length < 1) {
    errors.city = 'Invalid city input';
  }
  if (!Address(data.address)) {
    errors.address = 'Invalid address input';
  }
  if (!data.price_per_night) {
    errors.price_per_night = 'Invalid price input';
  }
  if (data.price_per_night < 0 || data.price_per_night > 9999) {
    errors.price_per_night = 'Price must be between 0 and 9999';
  }
  return [Object.keys(errors).length > 0, errors];
};
const Username = (username: string) =>
  !!(username && username.length > 2 && username.length < 40);
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
const validateRegisterForm = ({
  firstName,
  lastName,
  email,
  username,
  password,
  repeat_password,
}: RegisterFormData): [boolean, { [key: string]: string }] => {
  const errors: { [key: string]: string } = {};
  if (!Password(password, repeat_password)) {
    errors.password = 'Invalid password input';
  }
  if (!Firstname(firstName)) {
    errors.firstName = 'Invalid first name input';
  }
  if (!Lastname(lastName)) {
    errors.lastName = 'Invalid last name input';
  }
  console.log('email', email);
  console.log('last name', lastName);
  if (!Email(email)) {
    errors.email = 'Invalid email input';
  }
  if (!Username(username)) {
    errors.username = 'Invalid username';
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
  validateRegisterForm,
  validatePropertyForm,
};

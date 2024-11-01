import { Customer } from '@/models/interfaces/booking';

export const parseCustomerJson = (customer: string | Customer) => {
  if (typeof customer === 'string') {
    try {
      return JSON.parse(customer);
    } catch (e) {
      console.log(e);
      return customer;
    }
  }
  return customer;
};
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

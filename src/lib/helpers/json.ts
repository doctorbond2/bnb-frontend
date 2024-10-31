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

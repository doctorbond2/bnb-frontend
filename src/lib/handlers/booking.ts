import { AppDispatch } from '@/redux/store';
import { BookingFormData } from '@/models/interfaces/booking';
import { Customer } from '@/models/interfaces/booking';
import { createBooking } from '@/redux/thunks/booking';
import { BookingFormState } from '@/reducer/bookingFormReducer';
import { validationHelper } from '../helpers/validate';
import { BookingFormAction as Action } from '@/reducer/bookingFormReducer';
import { BookingFormActionType as ACTION } from '@/reducer/bookingFormReducer';
import { getHostedProperties } from '@/redux/thunks/property';
import { Dispatch } from 'react';
import { sendRequest } from '../helpers/fetch';
export async function bookProperty(
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch,
  updateForm: Dispatch<Action>,
  propertyId: string,
  state: BookingFormState
) {
  e.preventDefault();
  const { firstName, lastName, email, phoneNumber, startDate, endDate } = state;
  if (!startDate || !endDate) {
    throw new Error('Start date and end date must be provided');
  }
  const [hasErrors, errors] = validationHelper.validateCustomerBooking(
    firstName,
    lastName,
    email,
    phoneNumber,
    startDate,
    endDate
  );
  if (hasErrors) {
    updateForm({ type: ACTION.SET_ERRORS, payload: errors });
    console.log(errors);
    return;
  }
  const customerDetails: Customer = {
    firstName,
    lastName,
    email,
    phoneNumber,
  };

  const bookingDetails: BookingFormData = {
    propertyId,
    customer: customerDetails,
    startDate,
    endDate,
  };
  updateForm({ type: ACTION.SET_ISSUBMITTING, payload: true });
  try {
    await dispatch(createBooking({ data: bookingDetails, dispatch }));
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create booking');
  } finally {
    updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
  }
}

export const decideBooking = async (
  bookingId: string,
  decision: boolean,
  dispatch: AppDispatch
) => {
  try {
    await sendRequest(
      {
        url: `/api/protected/booking/decide/${bookingId}`,
        method: 'PUT',
        body: { decision },
        protected: true,
      },
      dispatch
    );
    await dispatch(getHostedProperties());
    console.log('Booking decision updated');
  } catch (err) {
    console.error(err);
    throw new Error('Failed to update booking');
  }
};

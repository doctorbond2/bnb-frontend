export interface BookingFormState {
  startDate: Date;
  endDate: Date;
  time?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  errors: { [key: string]: string };
  isSubmitting: boolean;
}

export const initialBookingFormState: BookingFormState = {
  startDate: new Date(),
  endDate: new Date(),
  time: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  errors: {},
  isSubmitting: false,
};
export enum BookingFormActionType {
  SET_STARTDATE = 'SET_STARTDATE',
  SET_ENDDATE = 'SET_ENDDATE',
  SET_TIME = 'SET_TIME',
  SET_FIRSTNAME = 'SET_FIRSTNAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PHONE = 'SET_PHONE',
  SET_LASTNAME = 'SET_LASTNAME',
  SET_ERRORS = 'SET_ERRORS',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
}
export interface BookingFormAction {
  type: BookingFormActionType;
  payload?: string | Date | { [key: string]: string } | boolean;
}

const bookingFormReducer = (
  state: BookingFormState,
  action: BookingFormAction
): BookingFormState => {
  const { type, payload } = action;
  switch (type) {
    case BookingFormActionType.SET_STARTDATE:
      return { ...state, startDate: payload as Date };
    case BookingFormActionType.SET_ENDDATE:
      return { ...state, endDate: payload as Date };
    case BookingFormActionType.SET_TIME:
      return { ...state, time: payload as string };
    case BookingFormActionType.SET_FIRSTNAME:
      return { ...state, firstName: payload as string };
    case BookingFormActionType.SET_LASTNAME:
      return { ...state, lastName: payload as string };
    case BookingFormActionType.SET_EMAIL:
      return { ...state, email: payload as string };
    case BookingFormActionType.SET_PHONE:
      return { ...state, phoneNumber: payload as string };
    case BookingFormActionType.SET_ERRORS:
      return { ...state, errors: payload as { [key: string]: string } };
    case BookingFormActionType.SET_ISSUBMITTING:
      return { ...state, isSubmitting: payload as boolean };
    default:
      return state;
  }
};
export default bookingFormReducer;

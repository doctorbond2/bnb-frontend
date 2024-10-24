export interface NewPropertyFormState {
  availableFrom: Date | null;
  availableUntil: Date | null;
  country: string;
  city: string;
  name: string;
  address: string;
  price_per_night: number;
  errors: { [key: string]: string };
  imageUrls: string[];
  isSubmitting: boolean;
}

export const initialNewPropertyFormState: NewPropertyFormState = {
  availableFrom: new Date(),
  availableUntil: new Date(),
  country: '',
  city: '',
  name: '',
  address: '',
  price_per_night: 0,
  imageUrls: [],
  errors: {},
  isSubmitting: false,
};
export enum NewPropertyActionType {
  SET_AVAILABLEFROM = 'SET_AVAILABLEFROM',
  SET_AVAILABLEUNTIL = 'SET_AVAILABLEUNTIL',
  SET_COUNTRY = 'SET_COUNTRY',
  SET_CITY = 'SET_CITY',
  SET_NAME = 'SET_NAME',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_ERRORS = 'SET_ERRORS',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
  SET_IMAGE_URLS = 'SET_IMAGEFILES',
  SET_PRICE_PER_NIGHT = 'SET_PRICE_PER_NIGHT',
  RESET_FORM = 'RESET_FORM',
  REMOVE_IMAGE_URL = 'REMOVE_IMAGE_URL',
}
export interface NewPropertyAction {
  type: NewPropertyActionType;
  payload?:
    | string
    | Date
    | { [key: string]: string }
    | boolean
    | string[]
    | number;
}

const newPropertyFormReducer = (
  state: NewPropertyFormState,
  action: NewPropertyAction
) => {
  const { type, payload } = action;
  switch (type) {
    case NewPropertyActionType.SET_AVAILABLEFROM:
      return { ...state, availableFrom: payload as Date };
    case NewPropertyActionType.SET_AVAILABLEUNTIL:
      return { ...state, availableUntil: payload as Date };
    case NewPropertyActionType.SET_IMAGE_URLS:
      return {
        ...state,
        imageUrls: [...state.imageUrls, ...(payload as string[])],
      };
    case NewPropertyActionType.REMOVE_IMAGE_URL:
      const index = payload as number;
      return {
        ...state,
        imageUrls: state.imageUrls.filter((_, i) => i !== index),
      };
    case NewPropertyActionType.SET_COUNTRY:
      return { ...state, country: payload as string };
    case NewPropertyActionType.SET_CITY:
      return { ...state, city: payload as string };
    case NewPropertyActionType.SET_PRICE_PER_NIGHT:
      return { ...state, price_per_night: payload as number };
    case NewPropertyActionType.SET_NAME:
      return { ...state, name: payload as string };
    case NewPropertyActionType.SET_ADDRESS:
      return { ...state, address: payload as string };
    case NewPropertyActionType.SET_ERRORS:
      return { ...state, errors: payload as { [key: string]: string } };
    case NewPropertyActionType.SET_ISSUBMITTING:
      return { ...state, isSubmitting: payload as boolean };
    case NewPropertyActionType.RESET_FORM:
      return initialNewPropertyFormState;
    default:
      return state;
  }
};
export default newPropertyFormReducer;

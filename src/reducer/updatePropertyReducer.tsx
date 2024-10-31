export interface UpdatePropertyFormState {
  name: string;
  country: string;
  city: string;
  address: string;
  price_per_night: number | string;
  availableFrom: Date;
  availableUntil: Date;
  available: boolean;
  imageUrls: string[];
  isSubmitting: boolean;
  errors: { [key: string]: string };
}

export const initialUpdatePropertyFormState: UpdatePropertyFormState = {
  name: '',
  country: '',
  city: '',
  address: '',
  price_per_night: 0,
  availableFrom: new Date(),
  availableUntil: new Date(),
  available: false,
  imageUrls: [],
  isSubmitting: false,
  errors: {},
};

export enum UpdatePropertyFormActionType {
  SET_NAME = 'SET_NAME',
  SET_COUNTRY = 'SET_COUNTRY',
  SET_CITY = 'SET_CITY',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_PRICE_PER_NIGHT = 'SET_PRICE_PER_NIGHT',
  SET_AVAILABLE_FROM = 'SET_AVAILABLE_FROM',
  SET_AVAILABLE_UNTIL = 'SET_AVAILABLE_UNTIL',
  SET_AVAILABLE = 'SET_AVAILABLE',

  SET_IMAGE_URLS = 'SET_IMAGE_URLS',
  REMOVE_IMAGE_URL = 'REMOVE_IMAGE_URL',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
  SET_ERRORS = 'SET_ERRORS',
}

export interface UpdatePropertyFormAction {
  type: UpdatePropertyFormActionType;
  payload?:
    | string
    | number
    | boolean
    | Date
    | string[]
    | { [key: string]: string };
}

const updatePropertyFormReducer = (
  state: UpdatePropertyFormState,
  action: UpdatePropertyFormAction
): UpdatePropertyFormState => {
  const { type, payload } = action;

  switch (type) {
    case UpdatePropertyFormActionType.SET_NAME:
      return { ...state, name: payload as string };
    case UpdatePropertyFormActionType.SET_COUNTRY:
      return { ...state, country: payload as string };
    case UpdatePropertyFormActionType.SET_CITY:
      return { ...state, city: payload as string };
    case UpdatePropertyFormActionType.SET_ADDRESS:
      return { ...state, address: payload as string };
    case UpdatePropertyFormActionType.SET_PRICE_PER_NIGHT:
      return { ...state, price_per_night: payload as number | string };
    case UpdatePropertyFormActionType.SET_AVAILABLE_FROM:
      return { ...state, availableFrom: payload as Date };
    case UpdatePropertyFormActionType.SET_AVAILABLE_UNTIL:
      return { ...state, availableUntil: payload as Date };
    case UpdatePropertyFormActionType.SET_AVAILABLE:
      return { ...state, available: payload as boolean };
    case UpdatePropertyFormActionType.REMOVE_IMAGE_URL:
      const index = payload as number;
      return {
        ...state,
        imageUrls: state.imageUrls.filter((_, i) => i !== index),
      };
    case UpdatePropertyFormActionType.SET_IMAGE_URLS:
      return { ...state, imageUrls: payload as string[] };
    case UpdatePropertyFormActionType.SET_ISSUBMITTING:
      return { ...state, isSubmitting: payload as boolean };

    case UpdatePropertyFormActionType.SET_ERRORS:
      return { ...state, errors: payload as { [key: string]: string } };
    default:
      return state;
  }
};

export default updatePropertyFormReducer;

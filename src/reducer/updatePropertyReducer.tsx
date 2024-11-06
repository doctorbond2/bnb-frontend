import {
  typeguard_isFile as isFile,
  typeguard_isString as isString,
} from '@/lib/helpers/typeGuards';
export interface UpdatePropertyFormState {
  name: string;
  country: string;
  city: string;
  address: string;
  price_per_night: number;
  availableFrom: Date;
  availableUntil: Date;
  available: boolean;
  description: string;
  imageDisplayList: (File | string)[];
  imageFiles: File[];
  imageUrls: string[];
  imageUrlsToDelete: string[];
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
  imageUrlsToDelete: [],
  imageDisplayList: [],
  imageUrls: [],
  imageFiles: [],
  available: false,
  isSubmitting: false,
  description: '',
  errors: {},
};

export enum UpdatePropertyFormActionType {
  SET_NAME = 'SET_NAME',
  SET_COUNTRY = 'SET_COUNTRY',
  SET_CITY = 'SET_CITY',
  SET_ADDRESS = 'SET_ADDRESS',
  PRESET_IMAGE_DISPLAY_LIST = 'PRESET_IMAGE_DISPLAY_LIST',
  SET_PRICE_PER_NIGHT = 'SET_PRICE_PER_NIGHT',
  SET_AVAILABLE_FROM = 'SET_AVAILABLE_FROM',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_AVAILABLE_UNTIL = 'SET_AVAILABLE_UNTIL',
  SET_IMAGEFILES = 'SET_IMAGEFILES',
  SET_AVAILABLE = 'SET_AVAILABLE',
  SET_IMAGE_URLS = 'SET_IMAGE_URLS',
  REMOVE_IMAGE_URL = 'REMOVE_IMAGE_URL',
  REMOVE_IMAGE_FILE = 'REMOVE_IMAGE_FILE',
  REMOVE_IMAGE = 'REMOVE_IMAGE',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
  SET_ERRORS = 'SET_ERRORS',
  SET_IMAGE_URLS_TO_DELETE = 'SET_IMAGE_URLS_TO_DELETE',
  RESTORE_IMAGE_URLS = 'RESTORE_IMAGE_URLS',
}

export interface UpdatePropertyFormAction {
  type: UpdatePropertyFormActionType;
  payload?:
    | string
    | number
    | boolean
    | Date
    | string[]
    | { [key: string]: string }
    | File[];
}

const updatePropertyFormReducer = (
  state: UpdatePropertyFormState,
  action: UpdatePropertyFormAction
): UpdatePropertyFormState => {
  const { type, payload } = action;

  switch (type) {
    case UpdatePropertyFormActionType.PRESET_IMAGE_DISPLAY_LIST:
      return {
        ...state,
        imageDisplayList: [...(payload as string[])],
        imageUrls: [...(payload as string[])],
      };

    case UpdatePropertyFormActionType.SET_NAME:
      return { ...state, name: payload as string };
    case UpdatePropertyFormActionType.SET_COUNTRY:
      return { ...state, country: payload as string };
    case UpdatePropertyFormActionType.SET_CITY:
      return { ...state, city: payload as string };
    case UpdatePropertyFormActionType.SET_ADDRESS:
      return { ...state, address: payload as string };
    case UpdatePropertyFormActionType.SET_PRICE_PER_NIGHT:
      return { ...state, price_per_night: payload as number };
    case UpdatePropertyFormActionType.SET_AVAILABLE_FROM:
      return { ...state, availableFrom: payload as Date };
    case UpdatePropertyFormActionType.SET_DESCRIPTION:
      return { ...state, description: payload as string };
    case UpdatePropertyFormActionType.SET_AVAILABLE_UNTIL:
      return { ...state, availableUntil: payload as Date };
    case UpdatePropertyFormActionType.SET_AVAILABLE:
      return { ...state, available: payload as boolean };
    case UpdatePropertyFormActionType.SET_IMAGEFILES:
      return {
        ...state,
        imageFiles: [...state.imageFiles, ...(payload as File[])],
        imageDisplayList: [...state.imageDisplayList, ...(payload as File[])],
      };

    case UpdatePropertyFormActionType.SET_IMAGE_URLS:
      return {
        ...state,
        imageUrls: [...state.imageUrls, ...(payload as string[])],
      };

    case UpdatePropertyFormActionType.SET_ISSUBMITTING:
      return { ...state, isSubmitting: payload as boolean };
    case UpdatePropertyFormActionType.SET_IMAGE_URLS_TO_DELETE:
      return {
        ...state,
        imageUrlsToDelete: [
          ...state.imageUrlsToDelete,
          ...(payload as string[]),
        ],
      };

    case UpdatePropertyFormActionType.REMOVE_IMAGE: {
      const imageIndex = payload as number;
      const updatedImageDisplayList: (string | File)[] = [];
      const updatedImageUrls: string[] = [];
      const updatedImageFiles: File[] = [];
      const urlsToDelete: string[] = [];

      state.imageDisplayList.forEach((item, index) => {
        if (index !== imageIndex) {
          updatedImageDisplayList.push(item);
          if (isString(item)) {
            updatedImageUrls.push(item);
          } else if (isFile(item)) {
            updatedImageFiles.push(item);
          }
        } else if (isString(item)) {
          urlsToDelete.push(item);
        }
      });

      return {
        ...state,
        imageDisplayList: updatedImageDisplayList,
        imageUrls: updatedImageUrls,
        imageFiles: updatedImageFiles,
        imageUrlsToDelete: [...state.imageUrlsToDelete, ...urlsToDelete],
      };
    }

    case UpdatePropertyFormActionType.SET_ERRORS:
      return { ...state, errors: payload as { [key: string]: string } };
    default:
      return state;
  }
};

export default updatePropertyFormReducer;

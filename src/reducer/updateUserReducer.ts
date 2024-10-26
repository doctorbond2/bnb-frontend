export interface UpdateUserFormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  existing_password?: string;
  isSubmitting: boolean;
  errors: { [key: string]: string };
}
export const initialUpdateUserFormState: UpdateUserFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  existing_password: '',
  isSubmitting: false,
  errors: {},
};
export enum UpdateUserFormActionType {
  SET_FIRSTNAME = 'SET_FIRSTNAME',
  SET_LASTNAME = 'SET_LASTNAME',
  SET_USERNAME = 'SET_USERNAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_EXISTING_PASSWORD = 'SET_EXISTING_PASSWORD',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
  SET_ERRORS = 'SET_ERRORS',
}

export interface UpdateUserFormAction {
  type: UpdateUserFormActionType;
  payload?: string | boolean | { [key: string]: string };
}

const updateUserFormReducer = (
  state: UpdateUserFormState,
  action: UpdateUserFormAction
) => {
  const { type, payload } = action;

  switch (type) {
    case UpdateUserFormActionType.SET_FIRSTNAME:
      return { ...state, firstName: payload as string };
    case UpdateUserFormActionType.SET_LASTNAME:
      return { ...state, lastName: payload as string };
    case UpdateUserFormActionType.SET_EMAIL:
      return { ...state, email: payload as string };
    case UpdateUserFormActionType.SET_USERNAME:
      return { ...state, username: payload as string };
    case UpdateUserFormActionType.SET_PASSWORD:
      return { ...state, password: payload as string };
    case UpdateUserFormActionType.SET_EXISTING_PASSWORD:
      return { ...state, existing_password: payload as string };
    case UpdateUserFormActionType.SET_ISSUBMITTING:
      return { ...state, isSubmitting: payload as boolean };
    case UpdateUserFormActionType.SET_ERRORS:
      return { ...state, errors: payload as { [key: string]: string } };
    default:
      return state;
  }
};
export default updateUserFormReducer;

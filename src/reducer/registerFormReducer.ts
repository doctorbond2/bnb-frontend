export interface RegisterFormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  repeat_password: string;
  isSubmitting: boolean;
  errors: { [key: string]: string };
}
export const initialRegisterFormState: RegisterFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeat_password: '',
  isSubmitting: false,
  errors: {},
};
export enum RegisterFormActionType {
  SET_FIRSTNAME = 'SET_FIRSTNAME',
  SET_LASTNAME = 'SET_LASTNAME',
  SET_USERNAME = 'SET_USERNAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_REPEAT_PASSWORD = 'SET_REPEAT_PASSWORD',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
  SET_ERRORS = 'SET_ERRORS',
}

export interface RegisterFormAction {
  type: RegisterFormActionType;
  payload?: string | boolean | { [key: string]: string };
}

const registerFormReducer = (
  state: RegisterFormState,
  action: RegisterFormAction
) => {
  const { type, payload } = action;

  switch (type) {
    case RegisterFormActionType.SET_FIRSTNAME:
      return { ...state, firstName: payload as string };
    case RegisterFormActionType.SET_LASTNAME:
      return { ...state, lastName: payload as string };
    case RegisterFormActionType.SET_EMAIL:
      return { ...state, email: payload as string };
    case RegisterFormActionType.SET_USERNAME:
      return { ...state, username: payload as string };
    case RegisterFormActionType.SET_PASSWORD:
      return { ...state, password: payload as string };
    case RegisterFormActionType.SET_REPEAT_PASSWORD:
      return { ...state, repeat_password: payload as string };
    case RegisterFormActionType.SET_ISSUBMITTING:
      return { ...state, isSubmitting: payload as boolean };
    case RegisterFormActionType.SET_ERRORS:
      return { ...state, errors: payload as { [key: string]: string } };
    default:
      return state;
  }
};
export default registerFormReducer;

import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from '../extraReducers/user';
import { User } from '@/models/interfaces/user';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { sendRequest } from '@/lib/helpers/fetch';
export interface UserState {
  user: User;
  loggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}
export const user_initialState: UserState = {
  user: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    admin: false,
  },
  loggedIn: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: user_initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.loggedIn = true;
      state.isLoading = false;

      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => userExtraReducers(builder),
});

export const { setUser, setLoading, setError } = userSlice.actions;

export const checkUserLocalStorage = () => (dispatch: AppDispatch) => {
  const user = localStorageHandler.getfromStorage(LocalStorageKeys.USER_STATE);
  if (user) {
    dispatch(setUser(user as User));
  } else {
    dispatch(setLoading(false));
  }
};
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await sendRequest({
      url: '/api/auth/logout',
      method: 'POST',
    });

    dispatch(setLoading(false));
    dispatch(setUser(user_initialState.user));
    dispatch(setError(null));
    localStorageHandler.clearMultipleFromStorage([
      LocalStorageKeys.USER_STATE,
      LocalStorageKeys.BOOKINGS_LIST,
      LocalStorageKeys.PROPERTY_LIST,
      LocalStorageKeys.REFRESHTOKEN_EXPIRY,
      LocalStorageKeys.TOKEN_EXPIRY,
    ]);
  } catch (error) {
    console.error('Failed to log out:', error);
  }
};
export default userSlice.reducer;

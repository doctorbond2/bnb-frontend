import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from '../extraReducers/user';
import { User } from '@/models/interfaces/user';
import { reducer_logout } from '../reducers/user';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
export interface UserState {
  user: User;
  loggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}
export const user_initialState: UserState = {
  user: {
    id: null,
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
    logout: reducer_logout,
    checkUserLocalStorage: (state) => {
      const user = localStorageHandler.getfromStorage(
        LocalStorageKeys.USER_STATE
      );
      if (user) {
        state.loggedIn = true;
        state.isLoading = false;
        state.user = user as User;
      }
    },
  },
  extraReducers: (builder) => userExtraReducers(builder),
});
export const { logout, checkUserLocalStorage } = userSlice.actions;

export default userSlice.reducer;

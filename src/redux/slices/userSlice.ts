import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from '../extraReducers/user';
import { User } from '@/models/interfaces/user';
import { reducer_logout } from '../reducers/user';
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
  },
  extraReducers: (builder) => userExtraReducers(builder),
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;

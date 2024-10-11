import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/user';
export interface UserState {
  id: string | null;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  admin: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  error: string | null;
}
const initialState: UserState = {
  id: null,
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  admin: false,
  loggedIn: false,
  isLoading: false,
  token: null,
  error: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.user.id;
        state.firstName = action.payload.user.firstName;
        state.lastName = action.payload.user.lastName;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;

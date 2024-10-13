import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserState } from '../slices/userSlice';
import { loginUser } from '../thunks/user';
export async function userExtraReducers(
  builder: ActionReducerMapBuilder<UserState>
) {
  builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user.id = action.payload.user.id;
        state.user.firstName = action.payload.user.firstName;
        state.user.lastName = action.payload.user.lastName;
        state.user.email = action.payload.user.email;
      } else {
        return;
      }
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
}

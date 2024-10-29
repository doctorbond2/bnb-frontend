import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserState } from '../slices/userSlice';
import { loginUser, refreshToken, updateUser } from '../thunks/user';

import { handlePending, handleRejected } from '@/lib/handlers/thunk';
export async function userExtraReducers(
  builder: ActionReducerMapBuilder<UserState>
) {
  builder
    .addCase(loginUser.pending, handlePending)
    .addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user.id = action.payload.user.id;
        state.user.username = action.payload.user.username;
        state.user.firstName = action.payload.user.firstName;
        state.user.lastName = action.payload.user.lastName;
        state.user.email = action.payload.user.email;
        state.user.admin = action.payload.user.admin;
      } else {
        return;
      }
    })
    .addCase(loginUser.rejected, handleRejected)
    .addCase(refreshToken.pending, handlePending)
    .addCase(refreshToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
      }
    })
    .addCase(refreshToken.rejected, handleRejected)
    .addCase(updateUser.pending, handlePending)
    .addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user.id = action.payload.user.id;
        state.user.username = action.payload.user.username;
        state.user.firstName = action.payload.user.firstName;
        state.user.lastName = action.payload.user.lastName;
        state.user.email = action.payload.user.email;
        state.user.admin = action.payload.user.admin;
      } else {
        return;
      }
    })
    .addCase(updateUser.rejected, handleRejected);
}

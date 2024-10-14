import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserState } from '../slices/userSlice';
import { loginUser } from '../thunks/user';
import { refreshToken } from '../thunks/user';
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
        state.user.firstName = action.payload.user.firstName;
        state.user.lastName = action.payload.user.lastName;
        state.user.email = action.payload.user.email;
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
    .addCase(refreshToken.rejected, handleRejected);
}

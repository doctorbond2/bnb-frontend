import { PayloadAction } from '@reduxjs/toolkit';
interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export const handlePending = (state: LoadingState) => {
  state.isLoading = true;
  state.error = null;
};

// export const handleFulfilled = <T>(
//   state: LoadingState,
//   // action: PayloadAction<T>
// ) => {
//   state.isLoading = false;
// };

export const handleRejected = <T>(
  state: LoadingState,
  action: PayloadAction<T>
) => {
  state.isLoading = false;
  state.error = action.payload as string;
};

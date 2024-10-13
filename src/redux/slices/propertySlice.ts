import { createSlice } from '@reduxjs/toolkit';
import { getHostedProperties } from '../thunks/property';
import { Property } from '@/models/interfaces/property';
export interface HostedPropertiesState {
  // id: string;
  // name: string;
  // description: string;
  // address: string;
  // city: string;
  // price: number;
  // images?: string[];
  isLoading?: boolean;
  error?: string | null;
  list: Property[];
  //   rating: number;
  //   zip: string;
  //   state: string;
}

const initialState: HostedPropertiesState = {
  isLoading: false,
  error: null,
  list: [],
};

export const propertySlice = createSlice({
  name: 'hostedProperties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHostedProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHostedProperties.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(getHostedProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export default propertySlice.reducer;

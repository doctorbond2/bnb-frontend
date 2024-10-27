import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { HostedPropertiesState } from '../slices/propertySlice';
import { getHostedProperties } from '../thunks/property';
import { handlePending, handleRejected } from '@/lib/handlers/thunk';
import { createProperty, updateProperty } from '../thunks/property';
export function extraHPReducers(
  builder: ActionReducerMapBuilder<HostedPropertiesState>
) {
  builder
    .addCase(getHostedProperties.pending, handlePending)
    .addCase(getHostedProperties.fulfilled, (state, action) => {
      state.list = action.payload || [];
    })
    .addCase(getHostedProperties.rejected, handleRejected)
    .addCase(createProperty.pending, handlePending)
    .addCase(createProperty.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = [...state.list, action.payload];
      }
    })
    .addCase(createProperty.rejected, handleRejected)
    .addCase(updateProperty.pending, handlePending)
    .addCase(updateProperty.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        state.list[index] = action.payload;
      }
    })
    .addCase(updateProperty.rejected, handleRejected);
}

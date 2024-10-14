import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { HostedPropertiesState } from '../slices/propertySlice';
import { getHostedProperties } from '../thunks/property';
import { handlePending, handleRejected } from '@/lib/handlers/thunk';
export function extraHPReducers(
  builder: ActionReducerMapBuilder<HostedPropertiesState>
) {
  builder
    .addCase(getHostedProperties.pending, handlePending)
    .addCase(getHostedProperties.fulfilled, (state, action) => {
      state.list = action.payload || [];
    })
    .addCase(getHostedProperties.rejected, handleRejected);
}

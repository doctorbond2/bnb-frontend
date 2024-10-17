import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { HostedPropertiesState } from '../slices/propertySlice';
import { getHostedProperties } from '../thunks/property';
import { handlePending, handleRejected } from '@/lib/handlers/thunk';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
import { createProperty } from '../thunks/property';
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
        localStorageHandler.setInStorage(
          LocalStorageKeys.PROPERTY_LIST,
          state.list
        );
      }
    })
    .addCase(createProperty.rejected, handleRejected);
}

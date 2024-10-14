import { createSlice } from '@reduxjs/toolkit';
import { Property } from '@/models/interfaces/property';
import { extraHPReducers } from '../extraReducers/property';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import localStorageHandler from '@/lib/helpers/localStorage';
export interface HostedPropertiesState {
  isLoading: boolean;
  error: string | null;
  list: Property[];
}

const initialState: HostedPropertiesState = {
  isLoading: false,
  error: null,
  list: [],
};

export const propertySlice = createSlice({
  name: 'hostedProperties',
  initialState,
  reducers: {
    checkPropertyLocalStorage: (state) => {
      const properties = localStorageHandler.getfromStorage(key.PROPERTY_LIST);
      if (properties) {
        state.list = properties as Property[];
      }
    },
  },
  extraReducers: (builder) => extraHPReducers(builder),
});
export const { checkPropertyLocalStorage } = propertySlice.actions;
export default propertySlice.reducer;

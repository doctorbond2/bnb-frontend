import { createSlice } from '@reduxjs/toolkit';
import { Property } from '@/models/interfaces/property';
import { extraHPReducers } from '../extraReducers/property';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import localStorageHandler from '@/lib/helpers/localStorage';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => extraHPReducers(builder),
});
export const { setLoading, setProperties, setError } = propertySlice.actions;
export const checkPropertyLocalStorage = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const properties = localStorageHandler.getfromStorage(key.PROPERTY_LIST);
    if (properties) {
      dispatch(setProperties(properties as Property[]));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError('Failed to load properties from localStorage'));
  } finally {
    dispatch(setLoading(false));
  }
};
export default propertySlice.reducer;

import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { PropertyFormData } from '@/models/interfaces/property';
import { Property } from '@/models/interfaces/property';
import { AppDispatch } from '../store';
type GetPropertiesApiResponse = Property[];
export const getHostedProperties = createAsyncThunk(
  'property/getHostedProperties',
  async (credentials: { hostId: string }, { rejectWithValue }) => {
    const { hostId } = credentials;
    try {
      const data: GetPropertiesApiResponse = await sendRequest({
        url: '/api/protected/property/host/' + hostId,
        method: 'GET',
        protected: true,
      });
      console.warn(data);
      localStorageHandler.setInStorage(key.PROPERTY_LIST, data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);
export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (
    credentials: { data: PropertyFormData; dispatch: AppDispatch },
    { rejectWithValue }
  ) => {
    try {
      const data: Property = await sendRequest(
        {
          url: '/api/protected/property',
          method: 'POST',
          body: { ...credentials.data },
          protected: true,
        },
        credentials.dispatch
      );

      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);

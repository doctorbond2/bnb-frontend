import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import {
  PropertyFormData,
  UpdatePropertyFormData,
} from '@/models/interfaces/property';
import { Property } from '@/models/interfaces/property';

import { AppDispatch } from '../store';
type GetPropertiesApiResponse = Property[];
export interface UpdatePropertyResponse {
  updatedProperty: Property;
  message?: string;
  status?: number;
}
export const getHostedProperties = createAsyncThunk(
  'property/getHostedProperties',
  async (_, { rejectWithValue }) => {
    try {
      const data: GetPropertiesApiResponse = await sendRequest({
        url: '/api/users/properties',
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
      credentials.dispatch(getHostedProperties());

      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);
export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async (
    credentials: {
      data: UpdatePropertyFormData;
      propertyId: string;
      dispatch: AppDispatch;
    },
    { rejectWithValue }
  ) => {
    try {
      const response: UpdatePropertyResponse = await sendRequest(
        {
          url: '/api/protected/property/' + credentials.propertyId,
          method: 'PUT',
          body: { ...credentials.data },
          protected: true,
        },
        credentials.dispatch
      );

      credentials.dispatch(getHostedProperties());
      console.log('response:', response);
      return response.updatedProperty;
    } catch (err: unknown) {
      return rejectWithValue(thunkError(err));
    }
  }
);

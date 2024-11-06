import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import ROUTES from '@/lib/routes';
import {
  PropertyFormData,
  UpdatePropertyFormData,
} from '@/models/interfaces/property';
import { Property } from '@/models/interfaces/property';
import { AppDispatch } from '../store';
type GetPropertiesApiResponse = Property[];
export const getHostedProperties = createAsyncThunk(
  'property/getHostedProperties',
  async (credentials: { dispatch: AppDispatch }, { rejectWithValue }) => {
    try {
      const data: GetPropertiesApiResponse = await sendRequest(
        {
          url: ROUTES.USER.PROPERTIES,
          method: 'GET',
          protected: true,
        },
        credentials.dispatch
      );
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
          url: ROUTES.GENERAL_PROTECTED.PROPERTIES,
          method: 'POST',
          body: { ...credentials.data },
          protected: true,
        },
        credentials.dispatch
      );
      console.log('data:', data);
      localStorageHandler.addItemToListInStorage(key.PROPERTY_LIST, data);
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
      const data: Property = await sendRequest(
        {
          url: ROUTES.GENERAL_PROTECTED.PROPERTY_BY_ID,
          method: 'PUT',
          body: { ...credentials.data },
          protected: true,
          id: credentials.propertyId,
        },
        credentials.dispatch
      );
      localStorageHandler.replaceItemInStorageById(key.PROPERTY_LIST, data);
      return data;
    } catch (err: unknown) {
      return rejectWithValue(thunkError(err));
    }
  }
);
export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (
    credentials: { dispatch: AppDispatch; propertyId: string },
    { rejectWithValue }
  ) => {
    try {
      await sendRequest(
        {
          url: '/api/protected/property/:id',
          method: 'DELETE',
          protected: true,
          id: credentials.propertyId,
        },
        credentials.dispatch
      );
      return credentials.propertyId;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);

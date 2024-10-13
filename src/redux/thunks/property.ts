import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { Property } from '@/models/interfaces/property';
type GetPropertiesApiResponse = Property[];
export const getHostedProperties = createAsyncThunk(
  'property/getHostedProperties',
  async (
    credentials: { hostId: string; token: string },
    { rejectWithValue }
  ) => {
    const { hostId, token } = credentials;
    try {
      const data: GetPropertiesApiResponse = await sendRequest(
        '/api/protected/property/host/' + hostId,
        'GET',
        undefined,
        token
      );
      console.warn(data);
      localStorageHandler.setInStorage(key.PROPERTY_LIST, data);
      return data;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);
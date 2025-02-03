import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserFormData } from '@/models/interfaces/user';
import { thunkError } from '../error';
import { sendRequest } from '@/lib/helpers/fetch';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import localStorageHandler from '@/lib/helpers/localStorage';
import { AppDispatch } from '../store';
import { User } from '@/models/interfaces/user';
import AppRoutes from '@/lib/routes';

export interface LoginApiResponse {
  user: User;
  message?: string;
  status?: number;
  tokenExpiry: number;
  refreshTokenExpiry: number;
  auth: {
    token: string;
    refreshToken: string;
    xApiKey: string;
  };
}
export interface UpdateUserResponse {
  user: User;
  message?: string;
  status?: number;
}
export interface RefreshTokenResponse {
  status: number;
  tokenExpiry: number;
  refreshTokenExpiry: number;
  token: string;
  refreshToken: string;
}
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    credentials: { email?: string; username?: string; password: string },
    { rejectWithValue }
  ): Promise<LoginApiResponse | ReturnType<typeof rejectWithValue>> => {
    try {
      const data: LoginApiResponse = await sendRequest({
        url: AppRoutes.PUBLIC.LOGIN,
        method: 'POST',
        body: credentials,
      });
      localStorageHandler.setInStorage(key.USER_STATE, data.user);
      localStorageHandler.setInStorage(key.TOKEN_EXPIRY, data.tokenExpiry);
      localStorageHandler.setAuth(
        data.auth.token,
        data.auth.refreshToken,
        data.auth.xApiKey,
        data.user.admin
      );
      localStorageHandler.setInStorage(
        key.REFRESHTOKEN_EXPIRY,
        data.refreshTokenExpiry
      );
      return data;
    } catch (err: unknown) {
      return rejectWithValue(thunkError(err));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    credentials: { data: UpdateUserFormData; dispatch: AppDispatch },
    { rejectWithValue }
  ) => {
    try {
      const response: UpdateUserResponse = await sendRequest(
        {
          url: AppRoutes.USER.MAIN,
          method: 'PUT',
          body: { ...credentials.data },
          protected: true,
        },
        credentials.dispatch
      );
      localStorageHandler.setInStorage(key.USER_STATE, response.user);
      return response;
    } catch (err: unknown) {
      rejectWithValue(thunkError(err));
    }
  }
);
export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response: RefreshTokenResponse = await sendRequest({
        url: '/api/auth/refreshToken',
        method: 'POST',
      });
      localStorageHandler.setToken(response.token);
      localStorageHandler.setRefreshToken(response.refreshToken);
      localStorageHandler.setInStorage(
        key.REFRESHTOKEN_EXPIRY,
        response.refreshTokenExpiry
      );
      localStorageHandler.setInStorage(key.TOKEN_EXPIRY, response.tokenExpiry);
      return response;
    } catch (error) {
      return rejectWithValue(thunkError(error));
    }
  }
);

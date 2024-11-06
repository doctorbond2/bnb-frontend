import localStorageHandler from './localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
import { RefreshTokenResponse } from '@/redux/thunks/user';
import { sendRequest } from './fetch';
import { AppDispatch } from '@/redux/store';
import { refreshToken } from '@/redux/thunks/user';
import * as jose from 'jose';
import ROUTES from '@/lib/routes';
const SECRET_KEY = process.env.JWT_SECRET || 'secret';
export interface TokenPayload {
  id: string;
  username: string;
  email: string;
  admin: boolean;
}

export function isTokenExpired(expiry: number): boolean {
  return Date.now() >= expiry;
}
export const authenicateUserTokensExpiry = async (
  dispatch: AppDispatch
): Promise<boolean> => {
  console.warn('authenicateUserTokensExpiry');
  const tokenExpiry = localStorageHandler.getfromStorage<number>(
    LocalStorageKeys.TOKEN_EXPIRY
  );
  const refreshTokenExpiry = localStorageHandler.getfromStorage<number>(
    LocalStorageKeys.REFRESHTOKEN_EXPIRY
  );

  if (!tokenExpiry || !refreshTokenExpiry) {
    return false;
  }

  if (!isTokenExpired(tokenExpiry)) {
    return true;
  }

  if (isTokenExpired(refreshTokenExpiry)) {
    return false;
  } else {
    try {
      const response = await dispatch(refreshToken()).unwrap();
      return !!response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
};
export const verifyToken = async (
  token: string
): Promise<TokenPayload | null> => {
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(SECRET_KEY);

    const { payload }: { payload: TokenPayload } = await jose.jwtVerify(
      token,
      secret,
      {
        algorithms: ['HS256'],
      }
    );

    if (typeof payload !== 'object' || !payload.id) {
      return null;
    }

    return payload;
  } catch (err) {
    if (err instanceof jose.errors.JWTExpired) {
      console.log('Token has expired:');
    } else {
      console.log('JWT verification error:');
    }
    return null;
  }
};
export const refreshTokenRequest = async () => {
  try {
    const response: RefreshTokenResponse = await sendRequest({
      url: ROUTES.PUBLIC.REFRESHTOKEN,
      method: 'POST',
    });
    localStorageHandler.setInStorage(
      LocalStorageKeys.REFRESHTOKEN_EXPIRY,
      response.refreshTokenExpiry
    );
    localStorageHandler.setInStorage(
      LocalStorageKeys.TOKEN_EXPIRY,
      response.tokenExpiry
    );
    return response;
  } catch {
    throw new Error('Failed to refresh token');
  }
};

import localStorageHandler from './localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
import { logout } from '@/redux/slices/userSlice';
import { cookies } from 'next/headers';
import { AppDispatch } from '@/redux/store';
import { refreshToken } from '@/redux/thunks/user';

import * as jose from 'jose';
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
// export const verifyToken = async (): Promise<TokenPayload | null> => {
//   const cookieStore = cookies();
//   const token = cookieStore.get('token')?.value;

//   if (!token) {
//     return null;
//   }

//   try {
//     const secret = new TextEncoder().encode(SECRET_KEY);

//     const { payload }: { payload: TokenPayload } = await jose.jwtVerify(
//       token,
//       secret,
//       {
//         algorithms: ['HS256'],
//       }
//     );

//     if (typeof payload !== 'object' || !payload.id) {
//       return null;
//     }

//     return payload;
//   } catch (err) {
//     if (err instanceof jose.errors.JWTExpired) {
//       console.log('Token has expired:');
//     } else {
//       console.log('JWT verification error:');
//     }
//     return null;
//   }
// };

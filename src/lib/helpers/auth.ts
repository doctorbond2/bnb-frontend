import localStorageHandler from './localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';
import { logout } from '@/redux/slices/userSlice';
export function isTokenExpired(expiry: number): boolean {
  return Date.now() >= expiry;
}

export const authenicateUserTokensExpiry = (): void => {
  const tokenExpiry = localStorageHandler.getfromStorage<number>(
    LocalStorageKeys.TOKEN_EXPIRY
  );
  const refreshTokenExpiry = localStorageHandler.getfromStorage<number>(
    LocalStorageKeys.REFRESHTOKEN_EXPIRY
  );
  if (!tokenExpiry || !refreshTokenExpiry) {
    logout();
    return;
  }
  if (!isTokenExpired(tokenExpiry)) {
    if (isTokenExpired(refreshTokenExpiry)) {
      logout();
    } else {
      //refresh token.
      //return new token.
    }
  }
};

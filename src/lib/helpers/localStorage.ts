import { LocalStorageKeys } from '@/models/enum/localstorage';
const tokenExpiryTime = 3600000 - 60000;
const refreshTokenExpiryTime = tokenExpiryTime * 100;
const setInStorage = <T>(key: LocalStorageKeys, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};
const getfromStorage = <T>(key: LocalStorageKeys): T | null => {
  const storedItem = localStorage.getItem(key);
  if (!storedItem) {
    return null;
  }
  const parsedItem: T = JSON.parse(storedItem);
  return parsedItem;
};
function logStoredValue(key: LocalStorageKeys): void {
  console.log(getfromStorage(key));
}
function deleteFromStorage(key: LocalStorageKeys): void {
  localStorage.removeItem(key);
}
function clearMultipleFromStorage(keys: LocalStorageKeys[]): void {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
}
function setToken(token: string): void {
  setInStorage(LocalStorageKeys.TOKEN, token);
  setInStorage(LocalStorageKeys.TOKEN_EXPIRY, Date.now() + tokenExpiryTime);
}
function setRefreshToken(token: string): void {
  setInStorage(LocalStorageKeys.REFRESHTOKEN, token);
  setInStorage(
    LocalStorageKeys.REFRESHTOKEN_EXPIRY,
    Date.now() + refreshTokenExpiryTime
  );
}
function clearToken(): void {
  localStorage.removeItem(LocalStorageKeys.TOKEN);
  localStorage.removeItem(LocalStorageKeys.TOKEN_EXPIRY);
}
function clearRefreshToken(): void {
  localStorage.removeItem(LocalStorageKeys.REFRESHTOKEN);
  localStorage.removeItem(LocalStorageKeys.REFRESHTOKEN_EXPIRY);
}
function clearBothTokens(): void {
  clearToken();
  clearRefreshToken();
}
const localStorageHandler = {
  setInStorage,
  getfromStorage,
  logStoredValue,
  deleteFromStorage,
  clearMultipleFromStorage,
  setToken,
  setRefreshToken,
  clearToken,
  clearRefreshToken,
  clearBothTokens,
};
export default localStorageHandler;

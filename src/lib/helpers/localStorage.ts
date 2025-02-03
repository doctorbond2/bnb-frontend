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
function replaceItemInStorageById<T extends { id: string }>(
  key: LocalStorageKeys,
  newItem: T
): void {
  console.log('Received key:', key);
  console.log('Received newItem:', newItem);
  console.log('newItem.id:', newItem?.id);
  console.log('Replacing item in storage', newItem);
  const item = localStorage.getItem(key);
  console.log('old item:', JSON.parse(item as string));
  const oldArray: T[] = item ? JSON.parse(item) : [];
  console.log('old array:', oldArray);
  const newArray = oldArray.map((item: T) =>
    item.id === newItem.id ? newItem : item
  );

  localStorage.setItem(key, JSON.stringify(newArray));
}
function addItemToListInStorage<T>(key: LocalStorageKeys, item: T): void {
  const storedItem = localStorage.getItem(key);
  if (!storedItem) {
    return;
  }
  const parsedItem: T[] = JSON.parse(storedItem);
  parsedItem.push(item);
  localStorage.setItem(key, JSON.stringify(parsedItem));
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
function setAdminAccess(): void {
  localStorage.setItem(LocalStorageKeys.ADMIN_ACCESS, 'true');
}
function getToken(): string | null {
  const token = getfromStorage<string>(LocalStorageKeys.TOKEN);
  return token;
}
function getRefreshToken(): string | null {
  const refreshToken = getfromStorage<string>(LocalStorageKeys.REFRESHTOKEN);
  return refreshToken;
}
function getApiKey(): string | null {
  const apiKey = getfromStorage<string>(LocalStorageKeys.API_KEY);
  return apiKey;
}
function setApiKey(apiKey: string): void {
  setInStorage(LocalStorageKeys.API_KEY, apiKey);
}
function setAuth(
  token: string,
  refreshToken: string,
  apiKey: string,
  admin?: boolean
): void {
  console.log('Setting auth', token, refreshToken, apiKey);
  setToken(token);
  setRefreshToken(refreshToken);
  setApiKey(apiKey);
  if (admin) {
    setAdminAccess();
  }
}
const localStorageHandler = {
  setInStorage,
  getfromStorage,
  logStoredValue,
  deleteFromStorage,
  clearMultipleFromStorage,
  replaceItemInStorageById,
  addItemToListInStorage,
  setToken,
  setRefreshToken,
  clearToken,
  clearRefreshToken,
  clearBothTokens,
  getToken,
  getRefreshToken,
  getApiKey,
  setApiKey,
  setAuth,
  setAdminAccess,
};
export default localStorageHandler;

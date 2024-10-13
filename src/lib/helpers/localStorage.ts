import { LocalStorageKeys } from '@/models/enum/localstorage';

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

const localStorageHandler = {
  setInStorage,
  getfromStorage,
  logStoredValue,
  deleteFromStorage,
  clearMultipleFromStorage,
};
export default localStorageHandler;

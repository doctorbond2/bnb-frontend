export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const removeNumbers = (str: string) => str.replace(/[0-9]/g, '');
export const removeSpecialChars = (str: string) =>
  str.replace(/[^a-zA-ZåäöÅÄÖ]/g, '');
export const removeSpaces = (str: string) => str.replace(/\s/g, '');

export const removeSpaceSpecialNumbers = (str: string) => {
  const result = removeNumbers(removeSpecialChars(removeSpaces(str)));
  return result;
};

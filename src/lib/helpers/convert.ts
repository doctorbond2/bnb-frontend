export const convertFirstCharToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const formatSentence = (str: string) => {
  const spacedStr = str.replace(/\.([^\s])/g, '. $1');
  return spacedStr.replace(
    /(\.\s)([a-z])/g,
    (match, p1, p2) => p1 + p2.toUpperCase()
  );
};

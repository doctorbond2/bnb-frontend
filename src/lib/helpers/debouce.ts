export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number
) {
  let timeoutId: NodeJS.Timeout | number | undefined;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

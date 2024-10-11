export const thunkError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else {
    console.error('Unexpected error:', error);
    return 'An unexpected error occurred.';
  }
};

export async function handleApiError(response: Response): Promise<void> {
  try {
    const errorResponse = await response.json();
    console.log(errorResponse);
    console.error('Error message:', errorResponse.message);
    console.error('Detailed errors:', errorResponse.errors);

    alert(errorResponse.message || 'An unknown error occurred');
  } catch (parseError) {
    console.error('Failed to parse error response', parseError);
  }
}
export async function handleServerApiError(response: Response): Promise<void> {
  try {
    const errorResponse = await response.json();
    console.log(errorResponse);
    console.error('Error message:', errorResponse.message);
    console.error('Detailed errors:', errorResponse.errors);
  } catch (parseError) {
    console.error('Failed to parse error response', parseError);
  }
}

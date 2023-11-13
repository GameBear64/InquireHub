/**
 * Gets the current user's ID from a stored token.
 */
export const getCurrentUserId = () => {
  try {
    const token = window.localStorage.getItem('hub-token');
    return JSON.parse(atob(token.split('.')[1]))?.id;
  } catch (e) {
    return null;
  }
};
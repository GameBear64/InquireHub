/**
 * Gets the current user's ID from a stored token.
 */
export const getCurrentUserId = () => {
  try {
    const token = window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
    return JSON.parse(atob(token.split('.')[1]))?.id;
  } catch (e) {
    return null;
  }
};

/**
 * @param {File} file - The file to be read.
 * @returns {Promise} A promise that resolves with the file data or rejects with an error message.
 */
export async function readFile(file) {
  if (!file) return Promise.reject('No file provided');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => resolve(event.target.result.split(';base64,').pop())

    reader.onerror = (error) => reject(error);
  });
}

/**
 * @param {Object} object - The input object to be cleaned.
 * @param {string[]} desiredFields - An array of field names to include in the cleaned object.
 */
export const cleanObject = (object, desiredFields) => {
  return Object.assign({}, ...desiredFields.map((field) => ([field] in object ? { [field]: object[field] } : {})));
};
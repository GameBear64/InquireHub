import { errorSnackBar } from "./snackbars";

export function useFetch({ url, requireAuth = true, method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      jwt: requireAuth ? window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME) : '',
    },
  };

  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/${url}`, options)
  .then(async (res) => {
    // ugly but prevent "Unexpected end of JSON input"
    let data = await res.text(); 
    data = data ? JSON.parse(data) : ''
    // ==============================================

    if (res.status === 403) localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME)
    if (!res.ok) return Promise.reject(data || res.status);
    
    return data;
  }).catch(error => {
    errorSnackBar(error);
    return Promise.reject(error)
  })
}
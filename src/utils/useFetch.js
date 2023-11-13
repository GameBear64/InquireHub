import { errorSnackBar } from "./snackbars";

export function useFetch({ url, requireAuth = true, method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      jwt: requireAuth ? window.localStorage.getItem('hub-token') : '',
    },
  };

  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/${url}`, options).then(async (res) => {
    const data = await res.json();

    if (!res.ok) return Promise.reject(data || res.status);
    return data;

  }).catch(error => {
    errorSnackBar(error);
  })
}
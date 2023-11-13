import { errorSnackBar } from "./snackbars";

export function useFetch({ url, requireAuth = true, method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  };
  if (requireAuth) {
    options = {
      headers: {
        jwt: window.localStorage.getItem('hub-token'),
        'content-type': 'application/json',
      },
      ...options,
    };
  }

  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/${url}`, options).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      const error = (data && data.message) || res.status;
      return Promise.reject(error);
    }

    return data;
  }).catch(error => {
    errorSnackBar(error);
  })
}
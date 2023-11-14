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

  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/${url}`, options)
  .then(async (res) => {
    // ugly but prevent "Unexpected end of JSON input"
    let data = await res.text(); 
    data = data ? JSON.parse(data) : ''
    // ==============================================

    if (!res.ok) return Promise.reject({status: res.status, message: data});
    return data;
  }).catch(error => {
    errorSnackBar(error.message);
    // letting the next .then know there has been an error
    return error; 
  })
}
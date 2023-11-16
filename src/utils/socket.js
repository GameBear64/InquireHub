import { io } from 'socket.io-client';

import { errorSnackBar } from './snackbars'

export const socket = io(`http://${window.location.hostname}:3030`, {
  auth: {
    jwt: window.localStorage.getItem(`${import.meta.env.VITE_LOCAL_STORAGE_NAME}`),
  },
});

socket.on('error', (data) => {
  errorSnackBar(data)
});
import axios from 'axios';
import { refreshTokenRoute, host } from './APIRoutes';


const instance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem(import.meta.env.REACT_APP_NAME_RF_KEY);
  if (!refreshToken) {
    window.location.href='/login';
  }
  else{
  try {
    const response = await axios.post(refreshTokenRoute, { refreshToken });
    const newAccessToken = response.data.accessToken;
    console.log('rf new:',newAccessToken)
    localStorage.setItem(import.meta.env.REACT_APP_NAME_AT_KEY, newAccessToken);

    return true;
  } catch (refreshError) {
    throw refreshError;
  }
  }
};

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {

      const refreshed = await refreshToken();
      if (refreshed) {
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)}`;
        return instance.request(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

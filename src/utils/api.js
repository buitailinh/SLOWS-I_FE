import axios from 'axios';
import { refreshTokenRoute, host } from './APIRoutes';


const instance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    window.location.href='/login';
  }

  try {
    const response = await axios.post(refreshTokenRoute, { refreshToken });
    const newAccessToken = response.data.accessToken;
    console.log('rf new:',newAccessToken)
    localStorage.setItem('access_token', newAccessToken);

    return true;
  } catch (refreshError) {
    throw refreshError;
  }
};

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token');
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
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return instance.request(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

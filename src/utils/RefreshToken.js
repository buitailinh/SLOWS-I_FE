import axios from 'axios';
import { host } from './APIRoutes';

const api = axios.create({
  baseURL: `${host}/data`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)}`,
  },
});



export default api;

import axios from 'axios';
import cookie from 'js-cookie';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL_BE}/`,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': cookie.get('csrftoken') ? cookie.get('csrftoken') : ''
  },
  withCredentials: true
});

if (cookie.get('personalization-token')) {
  api.defaults.headers.Authorization = `Bearer ${cookie.get('personalization-token')}`;
}

export default api;

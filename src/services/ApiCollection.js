import axios from 'axios';
import useSWR from 'swr';
// import cookie from 'js-cookie';

import api from './ApiConfig';
import { removeAllCookies } from '../utils/helper';

export async function Login(credientials) {
  try {
    const { data: response } = await api.post(`/auth/login`, credientials);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}

export async function Logout(credientials) {
  try {
    const { data: response } = await api.post(`/auth/logout`);
    removeAllCookies();
    return response;
  } catch (error) {
    removeAllCookies();
    if (error.response) {
      return error.response.data;
    }
  }
}

export async function Signup(credientials) {
  try {
    const { data: response } = await api.post(`/auth/signup`, credientials);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}

export async function SendContact(data) {
  try {
    const { data: response } = await api.post(`/contact_us`, data);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}

/* *********************************** SWR-API's *************************************** */
// get all cv

export async function LoadUserProfiles() {
  const response = await axios.get('http://localhost:9192/api/v5/user/profiles', {
    headers: {
      Authorization: 'bearer 436a81f8-29bb-4f89-b586-7539f9b496d2'
    }
  });
  return response.data;
}
export async function AddNewCustomer(customerRegistrationDTO) {
  fetch('http://localhost:9192/api/v5/user/customer-save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerRegistrationDTO)
  })
    .then((response) => console.log(response, 'OKKKKK'))
    .then(() => {
      console.log('New Customer added');
    });
}

import axios from 'axios';
import { apiBase } from './api';

export function LoginUser(value: any) {
  return axios
    .post(`${apiBase}identity/User/signin`, value)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function RegisterUser(value: any) {
  return axios
    .post(`${apiBase}identity/User/signup`, value)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function LoginViaGoogle(value: any) {
  return axios
    .post(`${apiBase}identity/User/signin_with_google`, value)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function RegisterViaGoogle(value: any) {
  return axios
    .post(`${apiBase}identity/User/signup_with_google`, value)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function ResetPasswordLink(value: any) {
  return axios
    .post(`${apiBase}identity/User/reset_password_link`, value)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function RegisterAgentUser(value: any) {
  return axios
    .post(`${apiBase}identity/Agent/Register`, value)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function RegisterShippingAgentUser(value: any) {
  return axios
    .post(`${apiBase}identity/ShippingAgent/Register`, value)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function VerifyEmail(value: any) {
  return axios
    .post(`${apiBase}identity/User/confirm_email`, value)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

import axios from 'axios';
import { apiBase } from './api';

export function getAllAutoMakers() {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .get(`${apiBase}ordering/Settings/Auto/Makers`, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function getAllAutoMakersModel(autoMakerId: any) {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .get(`${apiBase}ordering/Settings/Auto/Models/${autoMakerId}`, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function getAllTransmissionTypes() {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .get(`${apiBase}ordering/Settings/Transmission/Types`, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function getShippingMethod() {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .get(`${apiBase}ordering/Settings/Shipping/Methods`, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function getAllCountries() {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .get(`${apiBase}ordering/Settings/Countries`, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function getCountryProvince(CountryId: any) {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .get(`${apiBase}ordering/Settings/Country/Provinces/${CountryId}`, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function uploadImageToCloudinary(formData: any) {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return fetch('https://api.cloudinary.com/v1_1/adeyemicloud/image/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => {
    return res.json();
  });
}

export function ShippingOrder(data: any) {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .post(`${apiBase}ordering/ShippingOrder/Auto`, data, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function UpdateShippingOrder(body: any) {
  const test = localStorage.getItem('token');
  const bearer = `Bearer ${test}`;
  return axios
    .patch(`${apiBase}ordering/ShippingOrder/Auto/Update`, body, {
      headers: {
        Authorization: bearer,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

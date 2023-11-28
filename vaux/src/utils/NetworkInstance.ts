import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '../environment/environment';
import { VAUX_LOGIN } from './APITypes';

const { baseURL } = environment || {};
const commonConfig = {
  timeout: 60 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
export const vauxAPI = (token:any = '') => {
    const vauxInstance = axios.create({
      ...commonConfig,
      baseURL: baseURL,
    });
  
    vauxInstance.interceptors.request.use(
      (config) => {
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}` || '';
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    vauxInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const { response, request } = error || {};
        if (response?.status === 401 && response.config.url !== VAUX_LOGIN ) {
          window.localStorage.removeItem('vaux-staff-token');
          window.localStorage.removeItem('userId');
          window.localStorage.removeItem('userDetails');
          window.location.href = '/';
        }
        return Promise.reject(response || request);
      }
    );
    return vauxInstance;
  };